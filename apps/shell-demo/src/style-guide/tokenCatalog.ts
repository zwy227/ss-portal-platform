/** Token 画廊元数据 — 值以 packages/tokens/theme.css 为准 */

export type TokenSwatch = {
  name: string;
  cssVar: string;
  tailwind?: string;
  usage?: string;
};

export const BRAND_TOKENS: TokenSwatch[] = [
  { name: "brand", cssVar: "--brand", tailwind: "bg-brand", usage: "CTA、侧栏、brand focus 边框" },
  { name: "brand-dark", cssVar: "--brand-dark", tailwind: "bg-brand-dark", usage: "hover 深色" },
  { name: "brand-disabled", cssVar: "--brand-disabled", tailwind: "bg-brand-disabled", usage: "禁用主按钮" },
  { name: "brand-light", cssVar: "--brand-light", tailwind: "bg-brand-light", usage: "标签浅底" },
  { name: "brand-xlight", cssVar: "--brand-xlight", tailwind: "bg-brand-xlight", usage: "极浅品牌底" },
];

export const FOCUS_TOKENS: TokenSwatch[] = [
  {
    name: "focus-ring-normal",
    cssVar: "--focus-ring-normal",
    tailwind: "shadow-focus-normal",
    usage: "字段壳 focus-within 外圈 4px（→ gray-fill-normal / slate-100）；边框见 gray-border-black",
  },
  {
    name: "focus-ring-brand",
    cssVar: "--focus-ring-brand",
    tailwind: "shadow-focus-brand",
    usage: "筛选 input :focus 外圈 · portal-filter-input",
  },
];

export const GRAY_TEXT_TOKENS: TokenSwatch[] = [
  { name: "gray-text-1", cssVar: "--gray-text-1", tailwind: "text-gray-text-1", usage: "页面主标题" },
  { name: "gray-text-2", cssVar: "--gray-text-2", tailwind: "text-gray-text-2", usage: "正文锚点" },
  { name: "gray-text-3", cssVar: "--gray-text-3", tailwind: "text-gray-text-3", usage: "表单 label" },
  { name: "gray-text-4", cssVar: "--gray-text-4", tailwind: "text-gray-text-4", usage: "表头、次要正文" },
  { name: "gray-text-5", cssVar: "--gray-text-5", tailwind: "text-gray-text-5", usage: "说明、caption" },
  { name: "gray-text-7", cssVar: "--gray-text-7", tailwind: "text-gray-text-7", usage: "placeholder、图标" },
];

export const GRAY_BORDER_TOKENS: TokenSwatch[] = [
  {
    name: "gray-border-black",
    cssVar: "--gray-border-black",
    tailwind: "border-gray-border-black",
    usage: "字段壳 focus-within（slate-900 / gray-text-1）",
  },
  { name: "gray-border-strong", cssVar: "--gray-border-strong", tailwind: "border-gray-border-strong", usage: "输入框" },
  { name: "gray-border-normal", cssVar: "--gray-border-normal", tailwind: "border-gray-border-normal", usage: "卡片、表头" },
  { name: "gray-border-light", cssVar: "--gray-border-light", tailwind: "border-gray-border-light", usage: "行分割" },
  { name: "gray-border-exlight", cssVar: "--gray-border-exlight", tailwind: "border-gray-border-exlight", usage: "子表最淡线" },
];

export const GRAY_FILL_TOKENS: TokenSwatch[] = [
  { name: "gray-fill-disabled", cssVar: "--gray-fill-disabled", tailwind: "bg-gray-fill-disabled", usage: "禁用填充" },
  { name: "gray-fill-strong", cssVar: "--gray-fill-strong", tailwind: "bg-gray-fill-strong", usage: "icon hover" },
  { name: "gray-fill-normal", cssVar: "--gray-fill-normal", tailwind: "bg-gray-fill-normal", usage: "pill、菜单高亮" },
  { name: "gray-fill-light", cssVar: "--gray-fill-light", tailwind: "bg-gray-fill-light", usage: "行 hover" },
];

export const PAGE_BG_TOKENS: TokenSwatch[] = [
  { name: "page-bg", cssVar: "--page-bg", tailwind: "bg-page-bg", usage: "主内容背景" },
];

export const SEMANTIC_TOKENS: TokenSwatch[] = [
  { name: "semantic-success-default", cssVar: "--semantic-success-default", usage: "成功 Badge（锚定 brand）" },
  { name: "semantic-info-default", cssVar: "--semantic-info-default", usage: "信息 Badge" },
  { name: "semantic-warning-default", cssVar: "--semantic-warning-default", usage: "警告 Badge" },
  { name: "semantic-error-default", cssVar: "--semantic-error-default", usage: "错误 Badge" },
  { name: "accent-orange", cssVar: "--accent-orange", usage: "取消菜单项文字" },
  { name: "portal-text-link", cssVar: "--portal-text-link", usage: "文档链接 hover" },
];

export const TYPOGRAPHY_SAMPLES = [
  { token: "text-11", size: "11px", leading: "16px", sample: "副标题 meta", className: "text-11" },
  { token: "text-12", size: "12px", leading: "16px", sample: "表单说明", className: "text-12" },
  {
    token: "text-13-compact",
    size: "13px",
    leading: "16px",
    sample: "表格、紧凑 UI（text-13 为别名）",
    className: "text-13-compact",
  },
  {
    token: "text-13-reading",
    size: "13px",
    leading: "20px",
    sample: "可读正文（与 text-14 同行高）",
    className: "text-13-reading",
  },
  { token: "text-14", size: "14px", leading: "20px", sample: "筛选、分页、下拉菜单", className: "text-14" },
  { token: "text-15", size: "15px", leading: "20px", sample: "侧栏菜单", className: "text-15" },
  { token: "text-16", size: "16px", leading: "24px", sample: "列表 Tab", className: "text-16" },
  { token: "text-18", size: "18px", leading: "28px", sample: "页面标题", className: "text-18" },
  { token: "text-22", size: "22px", leading: "28px", sample: "详情大标题", className: "text-22" },
  { token: "text-32", size: "32px", leading: "40px", sample: "询价 Hero", className: "text-32" },
] as const;

export type RadiusToken = {
  name: string;
  cssVar: string;
  tailwind: string;
  usage?: string;
  /** 规范文档：适用场景（中文） */
  suitableFor?: string;
  /** 规范文档：示例区块标题 */
  exampleTitle?: string;
  /** 规范文档：示例说明 */
  exampleDescription?: string;
  /** 语义别名：指向的标准阶梯 token 名 */
  pointsTo?: string;
};

/** 标准圆角阶梯 — 组件请优先使用 */
export const RADIUS_LADDER_TOKENS: RadiusToken[] = [
  {
    name: "radius-xs",
    cssVar: "--radius-xs",
    tailwind: "rounded-xs",
    usage: "复选框、小控件、Badge",
    suitableFor: "微小细节元素：复选框、Badge、状态点、键盘快捷键角标",
    exampleTitle: "超小（Extra small）",
    exampleDescription:
      "将 radius-xs（rounded-xs）用于面积很小、仅作点缀的控件角。圆角过大时会显得「发圆」，削弱精细感。",
  },
  {
    name: "radius-sm",
    cssVar: "--radius-sm",
    tailwind: "rounded-sm",
    usage: "Button xs / icon-xs",
    suitableFor:
      "Button xs、icon-xs（4px）；辅助元素：Tag、时间戳、Tooltip 容器、表格内缩略图",
    exampleTitle: "小（Small · 4px）",
    exampleDescription:
      "与 Button 尺寸 xs / icon-xs 对齐。非按钮的紧凑辅助 UI（标签、时间戳等）也使用此档，避免与 sm 档按钮混淆。",
  },
  {
    name: "radius",
    cssVar: "--radius",
    tailwind: "rounded",
    usage: "Button sm / icon-sm",
    suitableFor: "Button sm、icon-sm（6px）；分页页码、分段控件",
    exampleTitle: "紧凑（Small · 6px）",
    exampleDescription:
      "与 Button 尺寸 sm / icon-sm 对齐。列表页分页页码、分段控件等同档，面积小于 default 按钮。",
  },
  {
    name: "radius-md",
    cssVar: "--radius-md",
    tailwind: "rounded-md",
    usage: "Button default / icon",
    suitableFor:
      "Button default、icon（8px）；输入框、筛选、下拉项、侧栏导航行、顶栏 icon 按钮、表单控件",
    exampleTitle: "默认（Default · 8px）",
    exampleDescription:
      "与 Button 尺寸 default / icon 对齐。portal-brand-btn、portal-filter-input、portal-topnav-icon-btn 等均映射到此档。",
  },
  {
    name: "radius-lg",
    cssVar: "--radius-lg",
    tailwind: "rounded-lg",
    usage: "Button lg / icon-lg",
    suitableFor: "Button lg、icon-lg（10px）；白卡、页内分区、下拉菜单面板",
    exampleTitle: "大（Large · 10px）",
    exampleDescription:
      "与 Button 尺寸 lg / icon-lg 对齐。语义别名 radius-cta 指向此档。容器类（白卡、下拉面板）与大号按钮同档。",
  },
  {
    name: "radius-xl",
    cssVar: "--radius-xl",
    tailwind: "rounded-xl",
    usage: "弹窗 / 对话框 / 抽屉",
    suitableFor: "弹窗、对话框、抽屉面板（12px）",
    exampleTitle: "浮层（Overlay · 12px）",
    exampleDescription:
      "与脱离页面流的模态容器对齐。语义别名 radius-modal 指向此档；@ss/portal-ui Dialog 外框使用 rounded-xl。",
  },
  {
    name: "radius-2xl",
    cssVar: "--radius-2xl",
    tailwind: "rounded-2xl",
    usage: "特大容器",
    suitableFor: "大型 onboarding 面板、宽屏独立分区、视频/媒体容器（16px）",
    exampleTitle: "特大（2XL · 16px）",
    exampleDescription:
      "用于比弹窗更大块的独立区域。不用于常规 Dialog / 抽屉外框（该场景用 radius-xl）。",
  },
  {
    name: "radius-3xl",
    cssVar: "--radius-3xl",
    tailwind: "rounded-3xl",
    usage: "大面板",
    suitableFor: "全屏级面板：大型 onboarding 面板、宽屏分区、Hero 级容器",
    exampleTitle: "极大（3XL）",
    exampleDescription:
      "将 radius-3xl（rounded-3xl）用于页面中最大块的独立区域。使用频率低于弹窗档，避免整页过度圆角。",
  },
  {
    name: "radius-full",
    cssVar: "--radius-full",
    tailwind: "rounded-full",
    usage: "头像、圆点、胶囊",
    suitableFor: "圆形/胶囊：头像、用户名胶囊、圆点指示、药丸形标签、分隔用 pill",
    exampleTitle: "全圆（Full）",
    exampleDescription:
      "将 radius-full（rounded-full）用于需要完全圆形或胶囊形的元素。宽高相等时为正圆，不等宽时为 pill。",
  },
];

/** 语义别名 — 指向阶梯中的某一档 */
export const RADIUS_ALIAS_TOKENS: RadiusToken[] = [
  {
    name: "radius-checkbox",
    cssVar: "--radius-checkbox",
    tailwind: "rounded-checkbox",
    pointsTo: "radius-xs",
    usage: "2px",
    suitableFor: "复选框",
  },
  {
    name: "radius-input",
    cssVar: "--radius-input",
    tailwind: "rounded-input",
    pointsTo: "radius-md",
    usage: "8px",
    suitableFor: "文本输入、筛选框（portal-filter-input）",
  },
  {
    name: "radius-card",
    cssVar: "--radius-card",
    tailwind: "rounded-card",
    pointsTo: "radius-lg",
    usage: "10px",
    suitableFor: "列表白卡、页内卡片（portal-list-card）",
  },
  {
    name: "radius-nav",
    cssVar: "--radius-nav",
    tailwind: "rounded-nav",
    pointsTo: "radius-md",
    usage: "8px",
    suitableFor: "侧栏导航行、顶栏 icon 按钮（portal-nav-row、portal-topnav-icon-btn）",
  },
  {
    name: "radius-button-xs",
    cssVar: "--radius-button-xs",
    tailwind: "rounded-button-xs",
    pointsTo: "radius-sm",
    usage: "4px",
    suitableFor: "Button size xs / icon-xs",
  },
  {
    name: "radius-button-sm",
    cssVar: "--radius-button-sm",
    tailwind: "rounded-button-sm",
    pointsTo: "radius",
    usage: "6px",
    suitableFor: "Button size sm / icon-sm",
  },
  {
    name: "radius-button",
    cssVar: "--radius-button",
    tailwind: "rounded-btn",
    pointsTo: "radius-md",
    usage: "8px",
    suitableFor: "Button size default / icon（portal-brand-btn）",
  },
  {
    name: "radius-button-lg",
    cssVar: "--radius-button-lg",
    tailwind: "rounded-button-lg",
    pointsTo: "radius-lg",
    usage: "10px",
    suitableFor: "Button size lg / icon-lg",
  },
  {
    name: "radius-cta",
    cssVar: "--radius-cta",
    tailwind: "rounded-cta",
    pointsTo: "radius-lg",
    usage: "10px",
    suitableFor: "大号主按钮（与 radius-button-lg 同档，保留语义名）",
  },
  {
    name: "radius-modal",
    cssVar: "--radius-modal",
    tailwind: "rounded-modal",
    pointsTo: "radius-xl",
    usage: "12px",
    suitableFor: "弹窗、对话框、抽屉外框（@ss/portal-ui Dialog）",
  },
  {
    name: "radius-pill",
    cssVar: "--radius-pill",
    tailwind: "—",
    pointsTo: "radius-full",
    usage: "pill",
    suitableFor: "胶囊形标签、计数 pill",
  },
];

/** Button 尺寸 ↔ 圆角阶梯 — 与 @ss/portal-ui Button size 命名对齐 */
export const BUTTON_RADIUS_SIZE_MAP = [
  {
    buttonSize: "xs",
    iconSize: "icon-xs",
    radiusToken: "radius-sm",
    tailwind: "rounded-sm",
    cssVar: "--radius-sm",
    px: "4px",
  },
  {
    buttonSize: "sm",
    iconSize: "icon-sm",
    radiusToken: "radius",
    tailwind: "rounded",
    cssVar: "--radius",
    px: "6px",
  },
  {
    buttonSize: "default",
    iconSize: "icon",
    radiusToken: "radius-md",
    tailwind: "rounded-md",
    cssVar: "--radius-md",
    px: "8px",
  },
  {
    buttonSize: "lg",
    iconSize: "icon-lg",
    radiusToken: "radius-lg",
    tailwind: "rounded-lg",
    cssVar: "--radius-lg",
    px: "10px",
  },
] as const;

/** 模态浮层 ↔ 圆角 — 独立于 Button 尺寸阶梯 */
export const OVERLAY_RADIUS_MAP = [
  {
    surface: "弹窗 / 对话框 / 抽屉面板",
    radiusToken: "radius-xl",
    tailwind: "rounded-xl",
    cssVar: "--radius-modal",
    px: "12px",
  },
] as const;

export const PORTAL_RADIUS_USAGE = [
  { component: "Button xs / icon-xs", tailwind: "rounded-sm", cssVar: "--radius-sm" },
  { component: "Button sm / icon-sm、分页页码 / size select", tailwind: "rounded", cssVar: "--radius" },
  { component: "Button default / icon · portal-brand-btn", tailwind: "rounded-btn", cssVar: "--radius-button" },
  { component: "portal-filter-input / select、portal-nav-row、portal-topnav-icon-btn", tailwind: "rounded-input / rounded-nav", cssVar: "--radius-md" },
  { component: "Button lg / icon-lg · portal-list-card · portal-dropdown-menu", tailwind: "rounded-card", cssVar: "--radius-card" },
  { component: "portal-dropdown-item", tailwind: "rounded-md", cssVar: "--radius-md" },
  { component: "Dialog / 抽屉（radius-modal）", tailwind: "rounded-modal", cssVar: "--radius-modal" },
] as const;
