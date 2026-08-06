# SS Portal Design System

> **权威实现**：[`packages/tokens/theme.css`](../packages/tokens/theme.css)（CSS 变量 + `portal-*` 组合类）  
> **Tailwind 映射**：[`packages/tokens/tailwind.preset.js`](../packages/tokens/tailwind.preset.js)  
> **视觉验收**：`apps/shell-demo` 本地 `pnpm dev` 后访问 `/tokens`、`/icons`、`/radius`、`/typography`、`/blank`  
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
   - `@ss/portal-ui` — Button、Input、Dialog、表格等基础组件
5. **图标统一 Lucide**：全部 UI 图标来自 `lucide-react`，见 §4 与画廊 `/icons`。

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
| `--gray-fill-panel` | `bg-gray-fill-panel` | 详情路线卡、只读确认块浅底 |

### 2.5 背景色

| CSS 变量 | Tailwind | 用途 |
|----------|----------|------|
| `--page-bg` | `bg-page-bg` | 主容器背景色（介于 fill-light 与 fill-normal 之间，勿与 fill 混用） |
| `--card-bg-glass` | `bg-card-bg-glass` + `backdrop-blur-card` | 页面内导航及辅助卡片背景色（白 `#FFFFFF` 40% 叠在 page-bg 上，blur 2px）；组合类 `portal-card-bg-glass` |

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
| `text-11` | 11px | 16px | 角标、极紧凑 meta |
| `text-12` | 12px | 16px | Badge、顶栏用户、集装箱 meta、时间戳 |
| `text-13-compact` | 13px | 16px | 表格、按钮、文件名、右侧卡标题、Tooltip |
| `text-13-reading` | 13px | 20px | 详情默认正文：字段、待办、进展、侧栏二级 |
| `text-14` | 14px | 20px | 里程碑节点、模块标题；筛选 / 分页 / 下拉 |
| `text-15` | 15px | 20px | 侧栏一级导航 |
| `text-16` | 16px | 24px | 列表 Tab、详情 Section 标题（`portal-detail-section-title`） |
| `text-18` | 18px | 28px | 页面标题（`portal-page-title` / `portal-page-detail-title`） |
| `text-20` | 20px | 28px | 已定义于 token，画廊暂未收录 |
| `text-22` | 22px | 28px | 详情页强调大标题 |
| `text-24` | 24px | 32px | 已定义于 token，画廊暂未收录 |
| `text-32` | 32px | 40px | Hero 级标题 |

**13px 选用**：单行高密度（表格、按钮、卡标题）→ `text-13-compact`；详情字段与可读正文 → `text-13-reading`。

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

## 4. Icon（Lucide）

**唯一图标源**：[`lucide-react`](https://lucide.dev/icons)。壳层、`@ss/portal-ui`、业务 App 与 shell-demo 画廊（`/icons`）均按此约定。禁止 Font Awesome / Heroicons / Ant Icons / iconfont / 随意内联 SVG / emoji 充当 UI 图标。

| 约定 | 说明 |
|------|------|
| 导入 | `import { Search } from "lucide-react"` |
| 尺寸 | 控件内常用 `size-4`（16px）；侧栏 / 顶栏 / 返回常用 `size-[18px]`；表格辅助可用 `size-3.5` |
| 描边 | `strokeWidth={1.5}`～`1.75`，与同区域已有图标一致 |
| 颜色 | 继承父级 `text-*`，或 `text-gray-text-7` / `text-gray-text-4` / `text-brand`；筛选区可用 `portal-filter-icon` |
| 无障碍 | 装饰性加 `aria-hidden`；仅图标表达含义时给控件写 `aria-label` |

画廊验收：`/icons`。

---

## 5. 圆角 Radius

组件优先使用**标准阶梯**；语义别名指向某一档，便于语义化阅读。

### 5.1 标准阶梯

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

### 5.2 语义别名

| 别名 | 指向 | 绑定组件 |
|------|------|----------|
| `radius-checkbox` / `radius-badge` | `radius-xs` | 复选框、Badge |
| `radius-input` / `radius-nav` | `radius-md` | `portal-filter-input`、`portal-nav-row` |
| `radius-button` (`rounded-btn`) | `radius-md` | `portal-brand-btn` |
| `radius-card` | `radius-lg` | `portal-list-card`、`portal-dropdown-menu` |
| `radius-modal` | `radius-xl` | `@ss/portal-ui` Dialog |
| `radius-cta` | `radius-lg` | 大号主按钮语义名 |

### 5.3 Button 尺寸 ↔ 圆角

| Button size | 高度 | 字号 | Icon size | 圆角 |
|-------------|------|------|-----------|------|
| xs | 24px (`h-6`) | 12px | `icon-xs`（24×24） | `rounded-button-xs` (4px) |
| sm | 32px (`h-8`) | 13px | `icon-sm`（32×32） | `rounded-button-sm` (6px) |
| default | 36px (`h-9`) | 14px | `icon`（36×36） | `rounded-md` / `rounded-btn` (8px) |
| lg | 40px (`h-10`) | 14px | `icon-lg`（40×40） | `rounded-button-lg` (10px) |

---

## 6. `portal-*` 组合类索引

定义于 `theme.css` `@layer components`。完整交互示例见 shell-demo `/blank`。

### 6.1 页面壳

| Class | 用途 |
|-------|------|
| `portal-page-main` | 列表页主滚动区，`bg-page-bg` |
| `portal-page-main--detail` | 详情页主区（flex 列、overflow hidden） |
| `portal-page-content` | 内容区内边距 `px-5 py-7` |

### 6.2 列表与 Tab

| Class | 用途 |
|-------|------|
| `portal-list-card` | 白卡容器：`rounded-card` + 浅阴影 |
| `portal-scrollbar` | 细滚动条（6px；thumb `gray-border-strong`，hover `gray-text-7`）；`PortalTableRoot` 默认挂载 |
| `portal-card-bg-glass` | 半透明卡片底：`--card-bg-glass` + `blur(var(--blur-card))` |
| `portal-tab-bar` | Tab 栏底边（`flex` + `gap-6`）；窄屏自适应示例用 `!flex-nowrap` |
| `portal-tab-bar__divider` | 待办与状态 Tab 之间的竖线分隔 |
| `portal-tab-item` / `portal-tab-item--active` | Tab 项与激活态 |

报价记录列表在栏宽不足时，用 `ResizeObserver` 按可用宽度将放不下的末尾状态 Tab 收入「更多」下拉（对齐 SSLTLDemo `QuoteOrderListTabBar`）；交互示例见 shell-demo `/blank/tab`。

### 6.3 筛选与表单

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
| `portal-black-btn` | 黑色实心按钮（`--gray-text-1`）；次级强调 CTA |

**Ant Design 筛选**（`packages/tokens/portal-ant-filter.css`）：`portal-ant-select--filter`、`portal-ant-select--form`、`portal-ant-cascader--filter`、`portal-ant-picker--filter/form` 及对应 dropdown 类；由 `@ss/portal-ui` 的 `PortalAntSelect` / `PortalAntCascader` / `PortalAntDateRangePicker` 挂载。

### 6.3.1 客户端详情表单

对齐 SSLTLDemo 询价详情「完善需求 / 确认」页。完整示例与使用说明见 shell-demo `/blank/form`。

| Class / 组件 | 用途 |
|--------------|------|
| `portal-detail-card` / `PortalDetailCard` | 详情白卡（shadow + padding） |
| `portal-detail-section-title` / `PortalDetailSectionTitle` | Section 主标题：`text-16 font-semibold`，无底部分割线 |
| `portal-detail-section-body` | Section 内容区 `space-y-6` |
| `portal-detail-section-stack` / `PortalDetailSectionStack` | 同卡多 Section 分割线（`border-light`） |
| `PortalDetailSection` | `<section>` + Title + Body 组合 |
| `portal-detail-block-title` / `PortalDetailBlockTitle` | 卡内小标题：`text-14 font-semibold`（对齐 Proposal「服务信息」） |
| `portal-detail-divided-stack` / `PortalDetailDividedStack` | 卡内分块：非首块顶部分割线（`border-strong`） |
| `portal-detail-card-footer` / `PortalDetailCardFooter` | 白卡底部操作区（顶部分割线 + 右对齐按钮） |
| `portalDetailInfoFieldsClass` | 履约只读信息字段网格（父级须 `@container`；列宽/列数自适应见 [`detail-page.md` §4](frameworks/detail-page.md)） |
| `portalDetailInfoFieldItemClass` / `portalDetailGroupHeadingClass` | 字段单项 / 卡内分组小标题（送货信息等） |
| `portal-detail-panel-surface` / `PortalDetailPanelSurface` | 路线卡 / 只读块浅灰表面 |
| `portal-detail-form-label` / `PortalDetailFormLabel` | 字段 label（13px · gray-text-4） |
| `portal-detail-form-legend` | Fieldset legend：`text-13 font-medium text-gray-text-4`（`PortalSelectionFieldset` 共用） |
| `portal-detail-form-hint` / `PortalDetailFormHint` | 表单提示：置于表单项下方；一行（图标 + 小标题 + 正文）`items-center`；正文 `text-13` · 小标题 `text-12` |
| `portal-detail-form-hint--warning` | 告警变体：无底色 · `text-semantic-warning-text` · 默认 TriangleAlert |
| `portal-detail-form-hint--error` | 错误变体：无底色 · `text-semantic-error-text` · 默认 CircleX · `role="alert"` |
| `portal-detail-form-input` / `portal-detail-form-textarea` | 详情页可编辑输入（42px / min-h 88px；focus = normal ring） |
| `portal-detail-form-input--error` / `portal-detail-form-textarea--error` | 校验失败边框（亦可用 `aria-invalid="true"`） |
| `portal-detail-form-value` | 只读单行（无边框 · medium） |
| `portal-detail-form-readonly` | 只读多行（浅底 + light 边线） |
| `PortalFormSearchSelect` | 可搜索下拉（客户账号等） |
| `portal-detail-subsection-heading` / `PortalDetailSubsectionHeading` | 模块内带图标小标题 |
| `PortalDetailServicePriceLabel` | 服务价签分色（免费 / 加价） |
| `PortalIncludedServiceItem` | 已包含服务行（✓ 标题 ⓘ 价签，无边框） |

**Focus**：详情表单 input / textarea / SearchSelect、`portal-field-shell`，以及选择卡（`PortalCheckboxCard` / `PortalRadioCard` 的 `focus-within`，类名 `portalSelectionCardInteractionClass`）一致，使用 `--focus-border-normal` + `--focus-ring-normal`（非品牌 ring）。列表筛选见 §6.3。

表单项 Checkbox/Radio 复用 `PortalCheckboxCard` / `PortalRadioCard` / `PortalSelectionFieldset`（§6.8）。选中态为 `bg-gray-fill-light`（非品牌 tint）；圆角 `rounded`（6px）；价格标签用 `PortalDetailServicePriceLabel`（免费 → `text-brand`，加价 → `text-accent-orange`）。已包含只读项用 `PortalIncludedServiceItem`（✓ + 标题 + ⓘ + 价签，无边框卡片）。紧凑属性多选（危险品等）复用同一 interaction class。演示：shell-demo 组件预览 →「表单组件」。

### 6.4 Badge

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

参考实现：`apps/shell-demo/src/style-guide/OrderListStatusTodoCell.tsx`、`UiTableExamples.tsx`（组件预览 `/blank/table`）。

### 6.5 Dropdown 与分页

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

### 6.6 侧栏与顶栏

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

### 6.7 链接

| Class | 用途 |
|-------|------|
| `portal-document-link` | 文档名链接：默认 `text-13` + `text-gray-text-2`、truncate；hover / focus-visible 下划线 + `--portal-text-link` |
| `portal-document-action-link` | 操作链接（下载等）；hover / focus-visible 同上 |

详情右侧「文件单证」摘要卡（见 shell-demo `/blank/document-link`）：白卡 + 标题 + `portal-document-link` 列表；点击 toast 演示打开文件（非真实下载）。

hover 色为 `--portal-text-link`（→ semantic-info-text）。

### 6.8 `@ss/portal-ui` 补充（非 `theme.css` 组合类）

以下由 `@ss/portal-ui` 导出，样式仍依赖 token，详见 shell-demo 组件预览 `/blank`：

| 导出 | 说明 |
|------|------|
| `Button` / `ButtonGroup` / `Input` / `Dialog` / `DropdownMenu` | Radix + shadcn 命名；Button 含 `default` / `black` / `outline` / `ghost`；`ButtonGroup` 含 Separator / Text；focus-visible 用 `--focus-ring-brand` |
| `PortalAntSelect` / `PortalAntCascader` | 挂载 `portal-ant-*` 类（见 §6.3） |
| `PortalRadioCard` / `PortalCheckboxCard` / `PortalSelectionFieldset` | 单选/多选卡片（选中灰底、6px 圆角；可编辑 `focus-within` = normal ring） |
| `PortalIncludedServiceItem` | 已包含服务行（✓ / 标题 / ⓘ / 价签） |
| `PortalDetailServicePriceLabel` | 服务价签（免费 brand / 加价 orange，支持混合文案） |
| `PortalDetailSection` / `PortalDetailCard` / `PortalDetailSectionStack` / `PortalDetailBlockTitle` / `PortalDetailDividedStack` / `PortalDetailCardFooter` 等 | 客户端详情表单 Section 壳层；另导出 `portalDetailInfoFieldsClass` 等履约只读字段网格常量 |
| `PortalFormSearchSelect` | 详情表单可搜索下拉 |
| `portalTable*` 样式常量 | 表格 th/td、sticky 操作列（`portal-table-styles.ts`） |

---

## 7. 页面框架（另见 frameworks）

| 场景 | 文档 | 参考实现 |
|------|------|----------|
| App Shell | [`frameworks/app-shell.md`](frameworks/app-shell.md) | `apps/shell-demo/src/DemoListPage.tsx` |
| 列表页 | [`frameworks/list-page.md`](frameworks/list-page.md) | 同上 |
| 详情页 | [`frameworks/detail-page.md`](frameworks/detail-page.md) | — |
| 表单页 | [`frameworks/form-page.md`](frameworks/form-page.md) | shell-demo `/blank/form-page` |

---

## 8. 禁止事项与豁免

与 [`.cursor/rules/ss-portal-design-tokens.mdc`](../.cursor/rules/ss-portal-design-tokens.mdc) 一致。

**禁止**（业务 `src/**` 未经用户确认不得新增）：

- hex / rgb / rgba 字面量：`text-[#…]`、`bg-[#…]`、`style={{ color: '#…' }}`
- Tailwind 默认灰阶：`text-slate-*`、`text-gray-500` 等
- Tailwind 默认字号：`text-xs`、`text-sm`、`text-base`、`text-lg` 等
- 任意像素字号：`text-[12px]`
- 非 Lucide 图标源（Font Awesome、Heroicons、Ant Icons、iconfont、随意内联 SVG、emoji 充当 UI 图标）

**应使用**：`gray-text-*`、`text-11`…`text-32`、`portal-*`、`font-normal|medium|semibold`、`lucide-react`。

**豁免**：在 `packages/tokens/` 内定义 token 时可用 hex；设计系统画廊与本文档可引用变量名。

**新增 token 流程**：停止写入 → 向用户说明用途与拟用值 → 用户同意后同时改 `theme.css` 与 `tailwind.preset.js` → 更新画廊与本文档。

---

## 9. 正确性校验

改 token 或本文档后建议执行：

```bash
# 1. 业务代码无新增违规色/字号（monorepo 各 app/package）
rg 'text-\[#|text-\[[0-9]+px\]|text-slate-|text-emerald-|bg-\[#|border-\[#' apps packages --glob '*.{tsx,ts}'

# 2. tokenCatalog 中的 cssVar 均存在于 theme.css
rg --only-matching 'cssVar: "--[^"]+"' apps/shell-demo/src/style-guide/tokenCatalog.ts -o \
  | sed 's/cssVar: "//;s/"$//' \
  | while read v; do rg -F -q -- "$v" packages/tokens/theme.css || echo "MISSING: $v"; done
```

**视觉验收**：`pnpm dev` → 并排查看 `/tokens`、`/icons`、`/radius`、`/typography`、`/blank` 与业务页；改 `theme.css` 后刷新应一致。

---

## 10. 文档状态

| 章节 | 状态 |
|------|------|
| §2–§6 Token / Icon / 组合类 | 已与 `theme.css` + 画廊对齐（含 `/icons` Lucide 约定） |
| §7 页面框架 | 见 `docs/frameworks/`，持续随业务页归纳 |
| 源仓 `client-portal.md` 迁入 | 未完成；剩余业务细则按需 portal 化后补充 |
