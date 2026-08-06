# SS Portal Platform — Agent 指南

## 读文档顺序

## 设计系统画廊（shell-demo）

本地 `pnpm dev` 后访问：

- `/guide` — 如何使用（新项目接入与规范）
- `/tokens` — 色板，对照 `theme.css` 变量
- `/icons` — 图标规范（统一 Lucide）
- `/radius` — 圆角规范
- `/typography` — 字号阶梯
- `/blank` — 组件预览（卡片入口；详情 `/blank/:id`；表单 `/blank/form`）
- `/orders` — 典型列表页（详情 `/orders/:id`）
- `/blank/detail-page` — 详情页框架（单栏 / 双栏 / 三栏；去内容）

定稿 token 后维护 `docs/design-system.md`（与 `theme.css`、shell-demo 画廊同步）。
2. [`docs/frameworks/app-shell.md`](docs/frameworks/app-shell.md)
3. [`docs/frameworks/list-page.md`](docs/frameworks/list-page.md)
4. [`docs/frameworks/detail-page.md`](docs/frameworks/detail-page.md)
5. [`docs/migration-checklist.md`](docs/migration-checklist.md)

## 改 UI 约束

- 只用 `portal-*` 组合类与 `gray-text-*` / `text-11`…`text-32` token
- 禁止新增 hex、`text-sm`、`text-slate-*`（见 `.cursor/rules/ss-portal-design-tokens.mdc`）
- 壳层在 `@ss/portal-shell`；业务 Nav 配置由各 App 注入

## 包职责

| 包 | 职责 |
|----|------|
| `@ss/portal-tokens` | CSS 变量 + `portal-*` 类 |
| `@ss/portal-shell` | AppShell、侧栏、顶栏、详情返回链接 |
| `@ss/portal-ui` | shadcn 命名基础组件（Button、Input、Dialog…） |
