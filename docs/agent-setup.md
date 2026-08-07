# 新业务仓：给 AI 的约束怎么接

业务 App 接入 `@ss/portal-*` 后，除了装包，还应在**业务仓根目录**放 Agent 入口，避免 Cursor / 其它 Agent 乱写 hex、`text-sm`、自造壳层。

权威视觉仍以本仓为准：`packages/tokens/theme.css`、`docs/design-system.md`、shell-demo 画廊。本文只说明 **AI 约束文件** 怎么拷。

## 最小集（必做）

从本仓复制到业务仓：

| 本仓模板 | 拷到业务仓 |
|----------|------------|
| [`templates/consumer-agents/AGENTS.md`](../templates/consumer-agents/AGENTS.md) | 根目录 `AGENTS.md` |
| [`templates/consumer-agents/.cursor/rules/ss-portal-design-tokens.mdc`](../templates/consumer-agents/.cursor/rules/ss-portal-design-tokens.mdc) | `.cursor/rules/ss-portal-design-tokens.mdc` |

然后按模板里的注释改两处路径：

1. **设计系统仓位置**（clone / submodule / monorepo 相对路径）
2. **自检 `rg` 的 `src` 目录**（你们业务代码根）

Cursor 会加载 `.cursor/rules/*.mdc`；`alwaysApply: true` 的 token 门禁会在每次对话生效。

## 推荐再加（改列表 / 详情 / 表单时）

| 本仓模板 | 拷到业务仓 |
|----------|------------|
| [`templates/consumer-agents/.cursor/rules/ss-portal-page-frameworks.mdc`](../templates/consumer-agents/.cursor/rules/ss-portal-page-frameworks.mdc) | `.cursor/rules/ss-portal-page-frameworks.mdc` |

该 rule 用 `globs` 限制在页面相关文件，避免无关会话也塞满框架文档。

## 不要做的事

- **不要**在业务仓复制整份 `design-system.md` 当第二份真理源（易过期）。应 link / submodule / 打开本仓文档。
- **不要**只放 `AGENTS.md`、不放 `.mdc`：短指南挡不住「随手写 `text-slate-500`」。
- **不要**指望文档章节号当 API：运行时只认 `@ss/portal-tokens` 等包。

## 与包接入的关系

| 步骤 | 文档 |
|------|------|
| 装包、globals、AppShell | shell-demo `/guide`、[`migration-checklist.md`](migration-checklist.md) |
| Token / 字号 / Spacing / Icon | [`design-system.md`](design-system.md)、画廊 `/tokens` `/layout` `/typography` `/icons` |
| 页面骨架 | [`frameworks/`](frameworks/) |
| **AI 不踩线** | 本文 + `templates/consumer-agents/` |

## 验收

在业务仓开 Cursor，改一个按钮文案类名：

1. Agent 应拒绝或先询问：`text-sm`、`text-[#…]`、`bg-slate-*`
2. Agent 应改用：`text-13` / `text-14`、`text-gray-text-*`、`text-brand`
3. 需要新色时：先停手确认，而不是直接改业务仓私有 CSS

画廊对照：本仓 `pnpm dev` → `/guide`。
