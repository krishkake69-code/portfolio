<div align="center">
  <a href="https://nitrostack.ai">
    <img src="logo.png" alt="NitroStack" width="120" />
  </a>

  <h1>NitroStack</h1>

  <p><strong>The enterprise-grade TypeScript framework for building production-ready MCP servers.</strong></p>
  <p>Decorators. Dependency Injection. Widgets. One framework to ship AI-native backends.</p>

  <br />

  <a href="https://www.npmjs.com/package/@nitrostack/core"><img src="https://img.shields.io/npm/v/@nitrostack/core?style=flat-square&label=%40nitrostack%2Fcore&color=cb0000" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@nitrostack/core"><img src="https://img.shields.io/npm/dm/@nitrostack/core?style=flat-square&color=cb0000" alt="npm downloads" /></a>
  <a href="https://github.com/nitrocloudofficial/nitrostack"><img src="https://img.shields.io/github/stars/nitrocloudofficial/nitrostack?style=flat-square&color=cb0000" alt="GitHub stars" /></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square" alt="License" /></a>
  <a href="https://discord.gg/uVWey6UhuD"><img src="https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord" /></a>
  <a href="https://x.com/nitrostackai"><img src="https://img.shields.io/badge/Follow-000000?style=flat-square&logo=x&logoColor=white" alt="X" /></a>
  <a href="https://www.youtube.com/@nitrostackai"><img src="https://img.shields.io/badge/YouTube-Subscribe-FF0000?style=flat-square&logo=youtube&logoColor=white" alt="YouTube" /></a>
  <a href="https://linkedin.com/company/nitrostack-ai/"><img src="https://img.shields.io/badge/LinkedIn-Follow-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://github.com/nitrostackai"><img src="https://img.shields.io/badge/GitHub-Organization-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>

  <br />
  <br />

  <a href="https://docs.nitrostack.ai"><strong>Documentation</strong></a> &nbsp;&middot;&nbsp;
  <a href="https://docs.nitrostack.ai/quick-start"><strong>Quick Start</strong></a> &nbsp;&middot;&nbsp;
  <a href="https://blog.nitrostack.ai"><strong>Blog</strong></a> &nbsp;&middot;&nbsp;
  <a href="https://nitrostack.ai/studio"><strong>NitroStudio</strong></a> &nbsp;&middot;&nbsp;
  <a href="https://discord.gg/uVWey6UhuD"><strong>Discord</strong></a>

  <br />
  <br />
</div>

---

## Quick Start

### Prerequisites

- **Node.js** >= 20.18 ([download](https://nodejs.org/))
- **npm** >= 9

### 1. Scaffold a new project

```bash
npx @nitrostack/cli init my-server
```

![NitroStack CLI](assets/gif/nitrocli.gif)

### 2. Start developing

```bash
cd my-server
npm install
npm run dev
```

Your MCP server is running. Connect it to any MCP-compatible client.

### 3. Open in NitroStudio

Once your project is scaffolded, open the same folder in NitroStudio for visual testing and debugging.

- Download: <https://nitrostack.ai/studio>
- Open your `my-server` project folder
- Use NitroStudio to test tools, inspect payloads, and chat with your MCP server

## Why NitroStack?

Building MCP servers today means stitching together boilerplate, reinventing authentication, and hoping your tooling scales. NitroStack gives you an opinionated, batteries-included framework so you can focus on what your server actually does.

- **Decorator-driven** — Define tools, resources, and prompts with clean, declarative TypeScript decorators
- **Dependency injection** — First-class DI container with singleton, transient, and scoped lifecycles
- **Auth built in** — JWT, OAuth 2.1, and API key authentication out of the box
- **Middleware pipeline** — Guards, interceptors, pipes, and exception filters just like enterprise backends
- **UI Widgets** — Attach React components to tool outputs for rich, interactive responses
- **Zod validation** — End-to-end type safety from schema to runtime
