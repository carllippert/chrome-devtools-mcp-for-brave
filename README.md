# Brave DevTools MCP

[![npm chrome-devtools-mcp-for-brave package](https://img.shields.io/npm/v/chrome-devtools-mcp-for-brave.svg)](https://npmjs.org/package/chrome-devtools-mcp-for-brave)

`chrome-devtools-mcp-for-brave` lets your coding agent (such as Gemini, Claude, Cursor or Copilot)
control and inspect a live Brave browser. It acts as a Model-Context-Protocol
(MCP) server, giving your AI coding assistant access to the full power of
Brave DevTools for reliable automation, in-depth debugging, and performance analysis.

## Recommended settings for vibe coding

1. Set Up Brave to open your default browser profile as the browser used for MCP to debug ( so you havea all your passwords and plugins and such )

- Close all Brave instanes
- Copy and run this in terminal / cli etc

```bash
/Applications/Brave\ Browser.app/Contents/MacOS/Brave\ Browser \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/Library/Application Support/BraveSoftware/Brave-Browser" \
  --profile-directory="Default"
```

2. Set up MCP with correct args for using this browser window

```json
{
  "mcpServers": {
    "brave-devtools": {
      "command": "npx",
      "args": [
        "chrome-devtools-mcp-for-brave@latest",
        "--browserUrl",
        "http://127.0.0.1:9222"
      ]
    }
  }
}
```

## Key features

- **Get performance insights**: Uses [Chrome
  DevTools](https://github.com/ChromeDevTools/devtools-frontend) to record
  traces and extract actionable performance insights.
- **Advanced browser debugging**: Analyze network requests, take screenshots and
  check the browser console.
- **Reliable automation**. Uses
  [puppeteer](https://github.com/puppeteer/puppeteer) to automate actions in
  Brave and automatically wait for action results.
- **Brave-optimized**: Designed specifically for Brave browser with automatic detection.

## Disclaimers

`chrome-devtools-mcp-for-brave` exposes content of the browser instance to the MCP clients
allowing them to inspect, debug, and modify any data in the browser or DevTools.
Avoid sharing sensitive or personal information that you don't want to share with
MCP clients.

## Requirements

- [Node.js 22.12.0](https://nodejs.org/) or newer.
- [Brave Browser](https://brave.com/) current stable version or newer.
- [npm](https://www.npmjs.com/).

## Getting started

Add the following config to your MCP client:

```json
{
  "mcpServers": {
    "brave-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp-for-brave@latest"]
    }
  }
}
```

> [!NOTE]  
> Using `chrome-devtools-mcp-for-brave@latest` ensures that your MCP client will always use the latest version of the Brave DevTools MCP server.

### MCP Client configuration

<details>
  <summary>Claude Code</summary>
    Use the Claude Code CLI to add the Chrome DevTools MCP server (<a href="https://docs.anthropic.com/en/docs/claude-code/mcp">guide</a>):

```bash
claude mcp add brave-devtools npx chrome-devtools-mcp-for-brave@latest
```

</details>

<details>
  <summary>Cline</summary>
  Follow https://docs.cline.bot/mcp/configuring-mcp-servers and use the config provided above.
</details>

<details>
  <summary>Codex</summary>
  Follow the <a href="https://github.com/openai/codex/blob/main/docs/advanced.md#model-context-protocol-mcp">configure MCP guide</a>
  using the standard config from above. You can also install the Chrome DevTools MCP server using the Codex CLI:

```bash
codex mcp add brave-devtools -- npx chrome-devtools-mcp-for-brave@latest
```

</details>

<details>
  <summary>Copilot / VS Code</summary>
  Follow the MCP install <a href="https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server">guide</a>,
  with the standard config from above. You can also install the Chrome DevTools MCP server using the VS Code CLI:
  
  ```bash
  code --add-mcp '{"name":"brave-devtools","command":"npx","args":["chrome-devtools-mcp-for-brave@latest"]}'
  ```
</details>

<details>
  <summary>Cursor</summary>

**Click the button to install:**

[<img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Install Brave DevTools in Cursor">](https://cursor.com/en/install-mcp?name=brave-devtools&config=eyJjb21tYW5kIjoibnB4IGNocm9tZS1kZXZ0b29scy1tY3AtZm9yLWJyYXZlQGxhdGVzdCJ9)

**Or install manually:**

Go to `Cursor Settings` -> `MCP` -> `New MCP Server`. Use the config provided above.

</details>

<details>
  <summary>Gemini CLI</summary>
Install the Chrome DevTools MCP server using the Gemini CLI.

**Project wide:**

```bash
gemini mcp add brave-devtools npx chrome-devtools-mcp-for-brave@latest
```

**Globally:**

```bash
gemini mcp add -s user brave-devtools npx chrome-devtools-mcp-for-brave@latest
```

Alternatively, follow the <a href="https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#how-to-set-up-your-mcp-server">MCP guide</a> and use the standard config from above.

</details>

<details>
  <summary>Gemini Code Assist</summary>
  Follow the <a href="https://cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer#configure-mcp-servers">configure MCP guide</a>
  using the standard config from above.
</details>

<details>
  <summary>JetBrains AI Assistant & Junie</summary>

Go to `Settings | Tools | AI Assistant | Model Context Protocol (MCP)` -> `Add`. Use the config provided above.
The same way chrome-devtools-mcp can be configured for JetBrains Junie in `Settings | Tools | Junie | MCP Settings` -> `Add`. Use the config provided above.

</details>

### Your first prompt

Enter the following prompt in your MCP Client to check if everything is working:

```
Check the performance of https://developers.chrome.com
```

Your MCP client should open the browser and record a performance trace.

> [!NOTE]  
> The MCP server will start the browser automatically once the MCP client uses a tool that requires a running browser instance. Connecting to the DevTools MCP server on its own will not automatically start the browser.

## Tools

<!-- BEGIN AUTO GENERATED TOOLS -->

- **Input automation** (7 tools)
  - [`click`](docs/tool-reference.md#click)
  - [`drag`](docs/tool-reference.md#drag)
  - [`fill`](docs/tool-reference.md#fill)
  - [`fill_form`](docs/tool-reference.md#fill_form)
  - [`handle_dialog`](docs/tool-reference.md#handle_dialog)
  - [`hover`](docs/tool-reference.md#hover)
  - [`upload_file`](docs/tool-reference.md#upload_file)
- **Navigation automation** (7 tools)
  - [`close_page`](docs/tool-reference.md#close_page)
  - [`list_pages`](docs/tool-reference.md#list_pages)
  - [`navigate_page`](docs/tool-reference.md#navigate_page)
  - [`navigate_page_history`](docs/tool-reference.md#navigate_page_history)
  - [`new_page`](docs/tool-reference.md#new_page)
  - [`select_page`](docs/tool-reference.md#select_page)
  - [`wait_for`](docs/tool-reference.md#wait_for)
- **Emulation** (3 tools)
  - [`emulate_cpu`](docs/tool-reference.md#emulate_cpu)
  - [`emulate_network`](docs/tool-reference.md#emulate_network)
  - [`resize_page`](docs/tool-reference.md#resize_page)
- **Performance** (3 tools)
  - [`performance_analyze_insight`](docs/tool-reference.md#performance_analyze_insight)
  - [`performance_start_trace`](docs/tool-reference.md#performance_start_trace)
  - [`performance_stop_trace`](docs/tool-reference.md#performance_stop_trace)
- **Network** (2 tools)
  - [`get_network_request`](docs/tool-reference.md#get_network_request)
  - [`list_network_requests`](docs/tool-reference.md#list_network_requests)
- **Debugging** (4 tools)
  - [`evaluate_script`](docs/tool-reference.md#evaluate_script)
  - [`list_console_messages`](docs/tool-reference.md#list_console_messages)
  - [`take_screenshot`](docs/tool-reference.md#take_screenshot)
  - [`take_snapshot`](docs/tool-reference.md#take_snapshot)

<!-- END AUTO GENERATED TOOLS -->

## Configuration

The DevTools MCP server supports the following configuration options:

<!-- BEGIN AUTO GENERATED OPTIONS -->

- **`--browserUrl`, `-u`**
  Connect to a running Brave instance using port forwarding. For more details see: https://developer.chrome.com/docs/devtools/remote-debugging/local-server.
  - **Type:** string

- **`--headless`**
  Whether to run in headless (no UI) mode.
  - **Type:** boolean
  - **Default:** `false`

- **`--executablePath`, `-e`**
  Path to custom Brave executable.
  - **Type:** string

- **`--isolated`**
  If specified, creates a temporary user-data-dir that is automatically cleaned up after the browser is closed.
  - **Type:** boolean
  - **Default:** `false`

- **`--logFile`**
  Path to a file to write debug logs to. Set the env variable `DEBUG` to `*` to enable verbose logs. Useful for submitting bug reports.
  - **Type:** string

<!-- END AUTO GENERATED OPTIONS -->

Pass them via the `args` property in the JSON configuration. For example:

```json
{
  "mcpServers": {
    "brave-devtools": {
      "command": "npx",
      "args": [
        "chrome-devtools-mcp-for-brave@latest",
        "--headless=true",
        "--isolated=true"
      ]
    }
  }
}
```

You can also run `npx chrome-devtools-mcp-for-brave@latest --help` to see all available configuration options.

## Concepts

### User data directory

The MCP server uses the following user data directory for Brave:

- Linux / MacOS: `$HOME/.cache/brave-devtools-mcp/brave-profile`
- Windows: `%HOMEPATH%/.cache/brave-devtools-mcp/brave-profile`

The user data directory is not cleared between runs and shared across
all instances of the MCP server. Set the `isolated` option to `true`
to use a temporary user data dir instead which will be cleared automatically after
the browser is closed.

## Known limitations

### Operating system sandboxes

Some MCP clients allow sandboxing the MCP server using macOS Seatbelt or Linux
containers. If sandboxes are enabled, the MCP server is not able to start
Brave as it requires permissions to create its own sandboxes. As a workaround,
either disable sandboxing for the MCP server in your MCP client or use
`--browserUrl` to connect to a Brave instance that you start manually outside
of the MCP client sandbox.
