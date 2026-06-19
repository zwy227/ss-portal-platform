# SS Portal Platform

Phase 1 设计系统 monorepo：`@ss/portal-tokens` + `@ss/portal-shell`。

## 结构

```text
packages/tokens   # portal-* CSS token 与 Tailwind preset
packages/shell    # AppShell、PortalSidebarNav、PortalTopNav 等
apps/shell-demo   # 本地验证 demo
docs/             # 设计规范与迁移清单
```

## 快速开始

```bash
pnpm install
pnpm dev          # 启动 shell-demo → http://localhost:5174
```

## 消费方接入

```json
{
  "dependencies": {
    "@ss/portal-tokens": "workspace:*",
    "@ss/portal-shell": "workspace:*"
  }
}
```

```tsx
import "@ss/portal-tokens";
import { AppShell } from "@ss/portal-shell";
```

详见 [`docs/migration-checklist.md`](docs/migration-checklist.md)。
