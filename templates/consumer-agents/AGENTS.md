# SS Portal 业务 App — Agent 指南

> 从设计系统仓 `templates/consumer-agents/AGENTS.md` 复制而来。请改下方「设计系统仓路径」。

## 设计系统仓路径（必改）

- 本地路径或 submodule：`{{SS_PORTAL_PLATFORM_PATH}}`（例：`../ss-portal-platform`）
- 人类总表：`{{SS_PORTAL_PLATFORM_PATH}}/docs/design-system.md`
- 框架文档：`{{SS_PORTAL_PLATFORM_PATH}}/docs/frameworks/`
- AI 接入说明：`{{SS_PORTAL_PLATFORM_PATH}}/docs/agent-setup.md`
- 活文档：设计系统仓 `pnpm dev` → `/guide` `/tokens` `/layout` `/blank`

## 读文档顺序（改 UI 前）

1. 本文件 + `.cursor/rules/ss-portal-design-tokens.mdc`
2. `design-system.md`（色 / 字 / Spacing / Icon / `portal-*`）
3. `docs/frameworks/app-shell.md`
4. 按页面类型：`list-page.md` / `detail-page.md` / `form-page.md`

## 改 UI 约束

- 只用 `@ss/portal-tokens` 的 token 与 `portal-*` 组合类；字号 `text-11` … `text-32`
- 禁止新增 hex、`text-sm`、`text-slate-*` 等（见 `.cursor/rules/ss-portal-design-tokens.mdc`）
- 壳层用 `@ss/portal-shell` 的 `AppShell`；业务只注入 Nav，不重造侧栏 / 顶栏
- 基础组件优先 `@ss/portal-ui`；图标统一 `lucide-react`

## 包职责

| 包 | 职责 |
|----|------|
| `@ss/portal-tokens` | CSS 变量 + `portal-*` 类 |
| `@ss/portal-shell` | AppShell、侧栏、顶栏、详情返回链接 |
| `@ss/portal-ui` | Button、Input、Dialog、表格等 |

## 需要新 token 时

停手 → 在对话里说明用途与拟用值 → 用户同意后优先在**设计系统仓** `theme.css` + preset 增补，再升业务仓依赖；不要在业务仓散落私有色板。
