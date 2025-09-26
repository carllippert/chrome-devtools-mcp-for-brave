/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import type {
  Browser,
  ConnectOptions,
  LaunchOptions,
  Target,
} from 'puppeteer-core';
import puppeteer from 'puppeteer-core';

import {
  findBraveExecutable,
  isValidBraveExecutable,
} from './utils/braveDetection.js';

let browser: Browser | undefined;

const ignoredPrefixes = new Set([
  'brave://',
  'brave-extension://',
  'devtools://',
]);

function targetFilter(target: Target): boolean {
  const url = target.url();
  if (url === 'brave://newtab/') {
    return true;
  }
  for (const prefix of ignoredPrefixes) {
    if (url.startsWith(prefix)) {
      return false;
    }
  }
  return true;
}

const connectOptions: ConnectOptions = {
  targetFilter,
  // We do not expect any single CDP command to take more than 10sec.
  protocolTimeout: 10_000,
};

async function ensureBrowserConnected(browserURL: string) {
  if (browser?.connected) {
    return browser;
  }
  browser = await puppeteer.connect({
    ...connectOptions,
    browserURL,
    defaultViewport: null,
  });
  return browser;
}

interface McpLaunchOptions {
  executablePath?: string;
  customDevTools?: string;
  userDataDir?: string;
  headless: boolean;
  isolated: boolean;
  logFile?: fs.WriteStream;
}

export async function launch(options: McpLaunchOptions): Promise<Browser> {
  const {executablePath, customDevTools, headless, isolated} = options;
  const profileDirName = 'brave-profile';

  let userDataDir = options.userDataDir;
  if (!isolated && !userDataDir) {
    userDataDir = path.join(
      os.homedir(),
      '.cache',
      'brave-devtools-mcp',
      profileDirName,
    );
    await fs.promises.mkdir(userDataDir, {
      recursive: true,
    });
  }

  const args: LaunchOptions['args'] = ['--hide-crash-restore-bubble'];
  if (customDevTools) {
    args.push(`--custom-devtools-frontend=file://${customDevTools}`);
  }
  let resolvedExecutablePath = executablePath;

  if (!resolvedExecutablePath) {
    // Try to find Brave executable automatically
    resolvedExecutablePath = findBraveExecutable();
    if (!resolvedExecutablePath) {
      throw new Error(
        'Brave browser not found. Please install Brave or specify the executable path using --executablePath',
      );
    }
  } else if (!isValidBraveExecutable(resolvedExecutablePath)) {
    throw new Error(
      `The specified executable path does not appear to be a valid Brave browser: ${resolvedExecutablePath}`,
    );
  }

  try {
    const browser = await puppeteer.launch({
      ...connectOptions,
      executablePath: resolvedExecutablePath,
      defaultViewport: null,
      userDataDir,
      pipe: true,
      headless,
      args,
    });
    if (options.logFile) {
      // FIXME: we are probably subscribing too late to catch startup logs. We
      // should expose the process earlier or expose the getRecentLogs() getter.
      browser.process()?.stderr?.pipe(options.logFile);
      browser.process()?.stdout?.pipe(options.logFile);
    }
    return browser;
  } catch (error) {
    if (
      userDataDir &&
      ((error as Error).message.includes('The browser is already running') ||
        (error as Error).message.includes('Target closed') ||
        (error as Error).message.includes('Connection closed'))
    ) {
      throw new Error(
        `The browser is already running for ${userDataDir}. Use --isolated to run multiple browser instances.`,
        {
          cause: error,
        },
      );
    }
    throw error;
  }
}

async function ensureBrowserLaunched(
  options: McpLaunchOptions,
): Promise<Browser> {
  if (browser?.connected) {
    return browser;
  }
  browser = await launch(options);
  return browser;
}

export async function resolveBrowser(options: {
  browserUrl?: string;
  executablePath?: string;
  customDevTools?: string;
  headless: boolean;
  isolated: boolean;
  logFile?: fs.WriteStream;
}) {
  const browser = options.browserUrl
    ? await ensureBrowserConnected(options.browserUrl)
    : await ensureBrowserLaunched(options);

  return browser;
}

// Channel type removed - not applicable to Brave
