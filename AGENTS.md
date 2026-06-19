# SS Portal Platform — Agent 指南

## 读文档顺序

## 设计系统画廊（shell-demo）

本地 `pnpm dev` 后访问：

- `/tokens` — 色板，对照 `theme.css` 变量
- `/typography` — 字号阶梯
- `/components` — `portal-*` 组合类

定稿 token 后再写 `docs/design-system.md`。
2. [`docs/frameworks/app-shell.md`](frameworks/app-shell.md)
3. [`docs/frameworks/list-page.md`](frameworks/list-page.md)
4. [`docs/frameworks/detail-page.md`](frameworks/detail-page.md)
5. [`docs/migration-checklist.md`](migration-checklist.md)

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
