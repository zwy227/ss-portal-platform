# SS Portal Design System

> **权威实现**：[`packages/tokens/theme.css`](../packages/tokens/theme.css)（CSS 变量 + `portal-*` 组合类）  
> **Tailwind 映射**：[`packages/tokens/tailwind.preset.js`](../packages/tokens/tailwind.preset.js)  
> **视觉验收**：`apps/shell-demo` 本地 `pnpm dev` 后访问 `/tokens`、`/radius`、`/typography`、`/components`、`/ui`  
> **画廊元数据**：[`apps/shell-demo/src/style-guide/tokenCatalog.ts`](../apps/shell-demo/src/style-guide/tokenCatalog.ts)（须与 `theme.css` 同步）

本文档是上述代码的**人类可读索引**，不单独发明色值或字号。改 token 的顺序：**`theme.css` → 画廊 → 本文档**。

---

## 1. 设计原则

1. **Token 优先**：业务 `className` 只用 `gray-text-*`、`text-11`…`text-32`、`portal-*` 等已定义 token，禁止随意 hex 或 Tailwind 默认灰阶/字号。
2. **组合类优先**：页面壳、筛选、Badge、分页、侧栏等复用 `theme.css` 中的 `portal-*` 类，不在业务里重复拼样式。
3. **页面框架分离**：App Shell、列表页、详情页的 DOM 结构与布局规则见 [`docs/frameworks/`](frameworks/)，本文档不重复。
4. **组件包分工**：
   - `@ss/portal-tokens` — CSS 变量与 `portal-*` 类
   - `@ss/portal-shell` — AppShell、侧栏、顶栏、筛选重置按钮
   - `@ss/portal-ui` — Button、Input、Dialog、表格、Ant 筛选封装等

---

## 2. 颜色 Token

色值定义见 `theme.css` `:root`；下表为变量名、Tailwind 类与用途。

### 2.1 品牌色 Brand

| CSS 变量 | Tailwind | 用途 |
|----------|----------|------|
| `--brand` | `bg-brand` / `text-brand` | CTA、侧栏背景、主按钮 |
| `--brand-dark` | `bg-brand-dark` / `text-brand-dark` | hover 深色、成功 Badge 文字 |
| `--brand-disabled` | `bg-brand-disabled` | 禁用主按钮 |
| `--brand-light` | `bg-brand-light` | 标签浅底、成功 Badge 底 |
| `--brand-xlight` | `bg-brand-xlight` | 极浅品牌底 |

### 2.2 文字灰阶 Gray Text

6 档（无 `gray-text-6`，由 5 直接到 7）：

| CSS 变量 | Tailwind | 用途 |
|----------|----------|------|
| `--gray-text-1` | `text-gray-text-1` | 页面主标题、Tab 激活、字段壳 focus 边框 |
| `--gray-text-2` | `text-gray-text-2` | 正文锚点、输入文字 |
| `--gray-text-3` | `text-gray-text-3` | 表单 label |
| `--gray-text-4` | `text-gray-text-4` | 表头、次要正文、分页说明 |
| `--gray-text-5` | `text-gray-text-5` | 说明、caption、中性 Badge 文字 |
| `--gray-text-7` | `text-gray-text-7` | placeholder、图标、空值、分隔符 |

### 2.3 边框 Gray Border

| CSS 变量 | Tailwind | 用途 |
|----------|----------|------|
| `--gray-border-black` | `border-gray-border-black` | 字段壳 `focus-within`（= gray-text-1） |
| `--gray-border-strong` | `border-gray-border-strong` | 输入框、筛选框默认边 |
| `--gray-border-normal` | `border-gray-border-normal` | 卡片、表头、Tab 底边 |
| `--gray-border-light` | `border-gray-border-light` | 行分割、分页顶边 |
| `--gray-border-exlight` | `border-gray-border-exlight` | 子表最淡线 |
| `--gray-border-emphasis` | `border-gray-border-emphasis` | hover 强调边（= gray-text-7） |

### 2.4 填充 Gray Fill

| CSS 变量 | Tailwind | 用途 |
|----------|----------|------|
| `--gray-fill-disabled` | `bg-gray-fill-disabled` | 禁用填充 |
| `--gray-fill-strong` | `bg-gray-fill-strong` | icon hover |
| `--gray-fill-normal` | `bg-gray-fill-normal` | pill、菜单高亮、focus 外圈底色 |
| `--gray-fill-light` | `bg-gray-fill-light` | 行 hover |

### 2.5 页面背景

| CSS 变量 | Tailwind | 用途 |
|----------|----------|------|
| `--page-bg` | `bg-page-bg` | 主内容区画布（介于 fill-light 与 fill-normal 之间，勿与 fill 混用） |

### 2.6 语义色 Semantic

每档通常含 `-bg`、`-light`、`-default`、`-text` 四件套；业务优先用组合类（如 `portal-badge--*`），少直接拼语义色。

**Badge 选用（info vs warning）**：存在**用户待办**（需下单、需补资料等）→ `portal-badge--warning`；普通进行中或纯信息态、无待办 → `portal-badge--info`。

| 语义 | 典型用途 | Badge / 其他 |
|------|----------|--------------|
| success | 已下单、已完成 | `portal-badge--success` |
| info | 普通进行中、纯信息态（**无用户待办**） | `portal-badge--info`；`--portal-text-link` → info-text |
| warning | **存在用户待办**时需关注的状态 | `portal-badge--warning`；取消菜单 `portal-dropdown-item--cancel`；`accent-orange` 为 warning-text 别名 |
| error | 校验失败、危险操作 | 无 Badge；`portal-field-shell--error`、`--danger-dot`（顶栏红点） |
| neutral | 已取消、已失效等终态 | `portal-badge--neutral` |

### 2.7 Focus Ring

| CSS 变量 | Tailwind | 场景 |
|----------|----------|------|
| `--focus-ring-normal` | `shadow-focus-normal` | 字段壳 `focus-within`（`portal-field-shell`）；筛选 input/select 自身 `:focus`（`portal-filter-input`、`portal-filter-select`） |
| `--focus-ring-brand` | `shadow-focus-brand` | 可交互控件 `focus-visible`：`@ss/portal-ui` Button、Dialog 关闭钮、`PortalTopNav` Logo |
| `--focus-border-normal` | — | normal focus 时边框色（= gray-border-black） |

---

## 3. 字号与字重 Typography

### 3.1 字号阶梯

行高均为 4px 倍数。`text-13` 为 `text-13-compact` 的兼容别名（deprecated）。

| Token | 字号 | 行高 | 典型场景 |
|-------|------|------|----------|
| `text-11` | 11px | 16px | 副标题 meta |
| `text-12` | 12px | 16px | 表单说明、Badge |
| `text-13-compact` | 13px | 16px | 表格、紧凑 UI、Tooltip |
| `text-13-reading` | 13px | 20px | 多行说明、文档链接 |
| `text-14` | 14px | 20px | 筛选、分页、下拉、默认正文 |
| `text-15` | 15px | 20px | 侧栏菜单 |
| `text-16` | 16px | 24px | 列表 Tab |
| `text-18` | 18px | 28px | 页面标题（`portal-page-title`） |
| `text-20` | 20px | 28px | 已定义于 token，画廊暂未收录 |
| `text-22` | 22px | 28px | 详情大标题 |
| `text-24` | 24px | 32px | 已定义于 token，画廊暂未收录 |
| `text-32` | 32px | 40px | Hero 级标题 |

**13px 选用**：单行高密度 → `text-13-compact`；多行可读 → `text-13-reading`。

### 3.2 字重

| Class | CSS 变量 | 值 | 典型场景 |
|-------|----------|-----|----------|
| `font-normal` | `--font-weight-normal` | 400 | 次要正文 |
| `font-medium` | `--font-weight-medium` | 500 | 侧栏、label、按钮 |
| `font-semibold` | `--font-weight-semibold` | 600 | 激活 Tab、详情标题 |

### 3.3 字体族

| Class | 用途 |
|-------|------|
| `font-sans` | 全局 UI（system-ui / SF / Segoe UI） |
| `font-mono` | 订单号、代码、token 名 |
| `portal-text-numeric` | 表格数字等宽对齐（仍用 sans，`tabular-nums`） |

### 3.4 页面标题组合类

| Class | 说明 |
|-------|------|
| `portal-page-title` | 列表页：`text-18 font-medium` |
| `portal-page-title-prefix` | 模块名前缀，如「拖柜运输:」 |
| `portal-page-detail-title` | 详情页长标题，`text-18 font-semibold` |

---

## 4. 圆角 Radius

组件优先使用**标准阶梯**；语义别名指向某一档，便于语义化阅读。

### 4.1 标准阶梯

| Token | Tailwind | 像素 | 典型场景 |
|-------|----------|------|----------|
| `radius-xs` | `rounded-xs` | 2px | 复选框、Badge、状态点 |
| `radius-sm` | `rounded-sm` | 4px | Button xs / icon-xs、Tag |
| `radius` | `rounded` | 6px | Button sm / icon-sm、分页页码 |
| `radius-md` | `rounded-md` | 8px | Button default、筛选框、导航行 |
| `radius-lg` | `rounded-lg` | 10px | Button lg、白卡、下拉面板 |
| `radius-xl` | `rounded-xl` | 12px | 弹窗 / 对话框 / 抽屉 |
| `radius-2xl` | `rounded-2xl` | 16px | 特大容器 |
| `radius-3xl` | `rounded-3xl` | 24px | Hero 级大面板 |
| `radius-full` | `rounded-full` | pill | 头像、圆点、胶囊 |

### 4.2 语义别名

| 别名 | 指向 | 绑定组件 |
|------|------|----------|
| `radius-checkbox` / `radius-badge` | `radius-xs` | 复选框、Badge |
| `radius-input` / `radius-nav` | `radius-md` | `portal-filter-input`、`portal-nav-row` |
| `radius-button` (`rounded-btn`) | `radius-md` | `portal-brand-btn` |
| `radius-card` | `radius-lg` | `portal-list-card`、`portal-dropdown-menu` |
| `radius-modal` | `radius-xl` | `@ss/portal-ui` Dialog |
| `radius-cta` | `radius-lg` | 大号主按钮语义名 |

### 4.3 Button 尺寸 ↔ 圆角

| Button size | Icon size | 圆角 |
|-------------|-----------|------|
| xs | icon-xs | `rounded-sm` (4px) |
| sm | icon-sm | `rounded` (6px) |
| default | icon | `rounded-md` (8px) |
| lg | icon-lg | `rounded-lg` (10px) |

---

## 5. `portal-*` 组合类索引

定义于 `theme.css` `@layer components`。完整交互示例见 shell-demo `/components`。

### 5.1 页面壳

| Class | 用途 |
|-------|------|
| `portal-page-main` | 列表页主滚动区，`bg-page-bg` |
| `portal-page-main--detail` | 详情页主区（flex 列、overflow hidden） |
| `portal-page-content` | 内容区内边距 `px-5 py-7` |

### 5.2 列表与 Tab

| Class | 用途 |
|-------|------|
| `portal-list-card` | 白卡容器：`rounded-card` + 浅阴影 |
| `portal-tab-bar` | Tab 栏底边 |
| `portal-tab-item` / `portal-tab-item--active` | Tab 项与激活态 |

### 5.3 筛选与表单

| Class | 用途 |
|-------|------|
| `portal-filter-input` | 搜索/筛选输入框 |
| `portal-filter-select` | 原生 select 筛选 |
| `portal-filter-select--with-icon` / `--plain` | 左图标 / 无图标变体 |
| `portal-filter-icon` | 筛选区图标色 |
| `portal-filter-reset-btn` | 重置筛选（`@ss/portal-shell` 导出组件） |
| `portal-field-shell` | 表单字段外壳（`focus-within` normal ring） |
| `portal-field-shell--static` | 静态展示，不响应 focus-within |
| `portal-field-shell--error` | 错误边框 |
| `portal-field-shell-input` | 壳内无边框 input |
| `portal-brand-btn` | 品牌主按钮 |

**Ant Design 筛选**（`packages/tokens/portal-ant-filter.css`）：`portal-ant-select--filter`、`portal-ant-select--form`、`portal-ant-cascader--filter` 及对应 dropdown 类；由 `@ss/portal-ui` 的 `PortalAntSelect` / `PortalAntCascader` 挂载。

### 5.4 Badge

四档 soft 标签。**info / warning 分工**：有待办 → `--warning`；普通态 → `--info`（见 §2.6）。

| Class | 用途 |
|-------|------|
| `portal-badge` | 基础：`text-12`、紧凑行高 |
| `portal-badge--neutral` | 灰 · 已取消、已失效 |
| `portal-badge--success` | 绿 · 已下单 |
| `portal-badge--warning` | 橙 · **有待办**（如待下单） |
| `portal-badge--info` | 蓝 · **普通进行中**（如人工报价中、无待办的平台确认中） |

**列表列「订单状态 / 待办」**（对齐 SSLTLDemo `FulfillmentOrderListStatusBadge`）：

```text
flex items-center gap-2
├── portal-badge--info | --warning   ← 有待办时用 warning，否则按状态用 info 等
└── [可选] 待办链接 · text-semantic-warning-text · TriangleAlert 图标
```

参考实现：`apps/shell-demo/src/style-guide/OrderListStatusTodoCell.tsx`、`UiTableExamples.tsx`（`/ui` → Table 原语）。

### 5.5 Dropdown 与分页

| Class | 用途 |
|-------|------|
| `portal-dropdown-menu` / `--wide` | 下拉面板 |
| `portal-dropdown-item` | 菜单项 |
| `portal-dropdown-item--cancel` | 取消类危险操作（warning 色） |
| `portal-pagination` / `--compact` / `--spacious` | 分页容器变体 |
| `portal-pagination-summary` / `-label` | 统计与每页条数 label |
| `portal-pagination-size-select` | 每页条数 select |
| `portal-pagination-nav-btn` | 上一页/下一页 |
| `portal-pagination-page` / `--active` | 页码 |
| `portal-pagination-ellipsis` | 省略号 |

### 5.6 侧栏与顶栏

| Class | 用途 |
|-------|------|
| `portal-nav-row` | 侧栏行基类（on brand 白字） |
| `portal-nav-row--primary` / `--sub` | 一级 / 二级 |
| `portal-nav-row--active` / `--idle` | 激活 / 可点击未激活 |
| `portal-sidebar-header` / `--collapsed` | 侧栏顶栏 |
| `portal-sidebar-brand` / `--expanded` / `--collapsed` | 品牌标题 |
| `portal-topnav` | 顶栏容器 |
| `portal-topnav-icon-btn` | 顶栏图标按钮 |
| `portal-topnav-divider` | 顶栏竖向分隔线 |
| `portal-topnav-user-name` / `-role` | 用户信息 |
| `portal-topnav-notif-dot` | 通知红点 |

侧栏交互状态依赖 `--sidebar-nav-hover`、`--sidebar-nav-active`、`--sidebar-nav-sub-active`。

### 5.7 链接

| Class | 用途 |
|-------|------|
| `portal-document-link` | 文档名链接（truncate） |
| `portal-document-action-link` | 操作链接（下载等） |

hover 色为 `--portal-text-link`（→ semantic-info-text）。

### 5.8 `@ss/portal-ui` 补充（非 `theme.css` 组合类）

以下由 `@ss/portal-ui` 导出，样式仍依赖 token，详见 shell-demo `/ui`：

| 导出 | 说明 |
|------|------|
| `Button` / `Input` / `Dialog` / `DropdownMenu` | Radix + shadcn 命名；focus-visible 用 `--focus-ring-brand` |
| `PortalAntSelect` / `PortalAntCascader` | 挂载 `portal-ant-*` 类（见 §5.3） |
| `PortalRadioCard` / `PortalCheckboxCard` / `PortalSelectionFieldset` | 单选/多选卡片 |
| `portalTable*` 样式常量 | 表格 th/td、sticky 操作列（`portal-table-styles.ts`） |

---

## 6. 页面框架（另见 frameworks）

| 场景 | 文档 | 参考实现 |
|------|------|----------|
| App Shell | [`frameworks/app-shell.md`](frameworks/app-shell.md) | `apps/shell-demo/src/DemoListPage.tsx` |
| 列表页 | [`frameworks/list-page.md`](frameworks/list-page.md) | 同上 |
| 详情页 | [`frameworks/detail-page.md`](frameworks/detail-page.md) | — |

---

## 7. 禁止事项与豁免

与 [`.cursor/rules/ss-portal-design-tokens.mdc`](../.cursor/rules/ss-portal-design-tokens.mdc) 一致。

**禁止**（业务 `src/**` 未经用户确认不得新增）：

- hex / rgb / rgba 字面量：`text-[#…]`、`bg-[#…]`、`style={{ color: '#…' }}`
- Tailwind 默认灰阶：`text-slate-*`、`text-gray-500` 等
- Tailwind 默认字号：`text-xs`、`text-sm`、`text-base`、`text-lg` 等
- 任意像素字号：`text-[12px]`

**应使用**：`gray-text-*`、`text-11`…`text-32`、`portal-*`、`font-normal|medium|semibold`。

**豁免**：在 `packages/tokens/` 内定义 token 时可用 hex；设计系统画廊与本文档可引用变量名。

**新增 token 流程**：停止写入 → 向用户说明用途与拟用值 → 用户同意后同时改 `theme.css` 与 `tailwind.preset.js` → 更新画廊与本文档。

---

## 8. 正确性校验

改 token 或本文档后建议执行：

```bash
# 1. 业务代码无新增违规色/字号（monorepo 各 app/package）
rg 'text-\[#|text-\[[0-9]+px\]|text-slate-|text-emerald-|bg-\[#|border-\[#' apps packages --glob '*.{tsx,ts}'

# 2. tokenCatalog 中的 cssVar 均存在于 theme.css
rg --only-matching 'cssVar: "--[^"]+"' apps/shell-demo/src/style-guide/tokenCatalog.ts -o \
  | sed 's/cssVar: "//;s/"$//' \
  | while read v; do rg -F -q -- "$v" packages/tokens/theme.css || echo "MISSING: $v"; done
```

**视觉验收**：`pnpm dev` → 并排查看 `/tokens`、`/radius`、`/typography`、`/components`、`/ui` 与业务页；改 `theme.css` 后刷新应一致。

---

## 9. 文档状态

| 章节 | 状态 |
|------|------|
| §2–§5 Token / 组合类 | 已与 `theme.css` + `tokenCatalog.ts` 对齐（2025-06） |
| §6 页面框架 | 见 `docs/frameworks/`，持续随业务页归纳 |
| 源仓 `client-portal.md` 迁入 | 未完成；剩余业务细则按需 portal 化后补充 |
