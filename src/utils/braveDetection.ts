/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/**
 * Default Brave browser executable paths for different operating systems
 */
const BRAVE_PATHS = {
  darwin: [
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    path.join(os.homedir(), 'Applications/Brave Browser.app/Contents/MacOS/Brave Browser'),
  ],
  win32: [
    'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    path.join(os.homedir(), 'AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'),
  ],
  linux: [
    '/usr/bin/brave-browser',
    '/usr/bin/brave',
    '/opt/brave.com/brave/brave-browser',
    '/snap/bin/brave',
    '/var/lib/flatpak/app/com.brave.Browser/current/active/export/bin/com.brave.Browser',
    path.join(os.homedir(), '.local/share/flatpak/app/com.brave.Browser/current/active/export/bin/com.brave.Browser'),
  ],
};

/**
 * Attempts to find the Brave browser executable on the current system
 * @returns The path to the Brave executable, or undefined if not found
 */
export function findBraveExecutable(): string | undefined {
  const platform = os.platform();
  const paths = BRAVE_PATHS[platform as keyof typeof BRAVE_PATHS] || [];

  for (const executablePath of paths) {
    try {
      if (fs.existsSync(executablePath)) {
        // Additional check to ensure it's executable on Unix-like systems
        if (platform !== 'win32') {
          const stats = fs.statSync(executablePath);
          if (stats.isFile() && (stats.mode & parseInt('111', 8)) !== 0) {
            return executablePath;
          }
        } else {
          return executablePath;
        }
      }
    } catch (error) {
      // Continue to next path if this one fails
      continue;
    }
  }

  return undefined;
}

/**
 * Checks if a given path is a valid Brave executable
 * @param executablePath Path to check
 * @returns True if the path exists and appears to be a Brave executable
 */
export function isValidBraveExecutable(executablePath: string): boolean {
  try {
    if (!fs.existsSync(executablePath)) {
      return false;
    }

    const stats = fs.statSync(executablePath);
    if (!stats.isFile()) {
      return false;
    }

    // On Unix-like systems, check if it's executable
    if (os.platform() !== 'win32' && (stats.mode & parseInt('111', 8)) === 0) {
      return false;
    }

    // Basic filename check - should contain 'brave' (case insensitive)
    const filename = path.basename(executablePath).toLowerCase();
    return filename.includes('brave');
  } catch (error) {
    return false;
  }
}
