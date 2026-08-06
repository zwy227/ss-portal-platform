import {
  BookOpen,
  Layers,
  LayoutList,
  Palette,
  Shapes,
  SquareRoundCorner,
  SquareStack,
  Type,
  type LucideIcon,
} from "lucide-react";
import type { PortalNavNode } from "@ss/portal-shell";

/** 典型列表页侧栏节点 id — 详情返回文案 / 高亮共用 */
export const DEMO_LIST_NAV_ID = "sg-typical";

/** 组件预览侧栏节点 id — 组件详情返回文案共用 */
export const COMPONENT_PREVIEW_NAV_ID = "sg-blank";

/** shell-demo 侧栏 — 设计系统画廊 */
export const DEMO_NAV: PortalNavNode[] = [
  {
    id: "style-guide",
    label: "基础样式",
    children: [
      { id: "sg-guide", label: "如何使用", to: "/guide" },
      { id: "sg-tokens", label: "Token 色板", to: "/tokens" },
      { id: "sg-icons", label: "Icon", to: "/icons" },
      { id: "sg-radius", label: "圆角规范", to: "/radius" },
      { id: "sg-typography", label: "字体", to: "/typography" },
      { id: COMPONENT_PREVIEW_NAV_ID, label: "组件预览", to: "/blank" },
      { id: DEMO_LIST_NAV_ID, label: "典型页面", to: "/orders" },
    ],
  },
];

export const DEMO_ICONS: Record<string, LucideIcon> = {
  "style-guide": Layers,
  "sg-guide": BookOpen,
  "sg-tokens": Palette,
  "sg-icons": Shapes,
  "sg-radius": SquareRoundCorner,
  "sg-typography": Type,
  [COMPONENT_PREVIEW_NAV_ID]: SquareStack,
  [DEMO_LIST_NAV_ID]: LayoutList,
};

export const STYLE_GUIDE_DEFAULT_OPEN = ["style-guide"];
