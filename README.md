# SS Portal Platform

StraightShip Portal 设计系统 monorepo：`@ss/portal-tokens`、`@ss/portal-shell`、`@ss/portal-ui`。

## 结构

```text
packages/tokens   # portal-* CSS token 与 Tailwind preset
packages/shell    # AppShell、PortalSidebarNav、PortalTopNav 等
packages/ui       # Button、Input、Dialog、表格等基础组件
apps/shell-demo   # 设计系统画廊（本地验证）
docs/             # 设计规范、页面框架、AI 接入说明
templates/        # 业务仓可复制的 Agent 约束模板
```

## 快速开始

```bash
pnpm install
pnpm dev          # 启动 shell-demo → http://localhost:5174
```

### 设计系统画廊路由

| 路径 | 内容 |
|------|------|
| `/` | OnePage 首页（壳层外） |
| `/guide` | 如何使用（新项目接入与规范） |
| `/tokens` | 色板（brand、gray、semantic） |
| `/layout` | 布局说明（Spacing / App Shell / 栅格） |
| `/icons` | 图标规范（Lucide） |
| `/radius` | 圆角规范 |
| `/typography` | 字号 text-11 … text-32 |
| `/blank` | 组件预览（portal-* / @ss/portal-ui） |
| `/orders` | 典型列表页（详情为履约三栏） |

## 消费方接入

仓库：[https://github.com/zwy227/ss-portal-platform](https://github.com/zwy227/ss-portal-platform)

默认 **clone → `pnpm install` → `pnpm link`** 接到业务 App（详见画廊 `/guide`）。

```bash
git clone https://github.com/zwy227/ss-portal-platform.git
cd ss-portal-platform && pnpm install
# 再按 /guide「①」把 tokens / shell / ui link 到业务仓
```

```tsx
import { AppShell } from "@ss/portal-shell";
import { Button } from "@ss/portal-ui";
```

同属本 monorepo 时可用 `"workspace:*"`。

文档索引：

- [`docs/design-system.md`](docs/design-system.md) — Token / Spacing / Icon / `portal-*`
- [`docs/frameworks/`](docs/frameworks/) — App Shell、列表 / 详情 / 表单
- [`docs/agent-setup.md`](docs/agent-setup.md) — 业务仓 AI 约束（模板见 `templates/consumer-agents/`）
