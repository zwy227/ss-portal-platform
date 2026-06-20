import { Layers, Package, Palette, SquareRoundCorner, Type, type LucideIcon } from "lucide-react";
import type { PortalNavNode } from "@ss/portal-shell";

/** shell-demo 侧栏 — 设计系统画廊 */
export const DEMO_NAV: PortalNavNode[] = [
  {
    id: "style-guide",
    label: "基础样式",
    children: [
      { id: "sg-tokens", label: "Token 色板", to: "/tokens" },
      { id: "sg-radius", label: "圆角规范", to: "/radius" },
      { id: "sg-typography", label: "Typography", to: "/typography" },
      { id: "sg-components", label: "Components", to: "/components" },
      { id: "sg-ui", label: "Portal UI", to: "/ui" },
    ],
  },
];

export const DEMO_ICONS: Record<string, LucideIcon> = {
  "style-guide": Layers,
  "sg-tokens": Palette,
  "sg-radius": SquareRoundCorner,
  "sg-typography": Type,
  "sg-components": Layers,
  "sg-ui": Package,
};

export const STYLE_GUIDE_DEFAULT_OPEN = ["style-guide"];
