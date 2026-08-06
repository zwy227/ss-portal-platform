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

### 设计系统画廊路由

| 路径 | 内容 |
|------|------|
| `/` | 重定向到 `/guide` |
| `/guide` | 如何使用（接入步骤与规范） |
| `/tokens` | 色板（brand、gray、semantic） |
| `/icons` | 图标规范（Lucide） |
| `/radius` | 圆角规范 |
| `/typography` | 字号 text-11 … text-32 |
| `/blank` | 组件预览（portal-* / @ss/portal-ui） |
| `/orders` | 典型列表页框架 |

与 SSLTLDemo (`localhost:5173`) 拖柜页并排打开，可视觉对比 token。

## 消费方接入

仓库公开：[https://github.com/zwy227/ss-portal-platform](https://github.com/zwy227/ss-portal-platform)

对方 **clone → `pnpm install` → `pnpm link`** 接到业务 App（详见画廊 `/guide`）。

```bash
git clone https://github.com/zwy227/ss-portal-platform.git
cd ss-portal-platform && pnpm install
# 再按 /guide「①」把 tokens / shell / ui link 到业务仓
```

```tsx
import { AppShell } from "@ss/portal-shell";
import { Button } from "@ss/portal-ui";
```

同属本 monorepo 时仍可用 `"workspace:*"`。细则见 [`docs/migration-checklist.md`](docs/migration-checklist.md)。
