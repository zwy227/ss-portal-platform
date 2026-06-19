import { Container, Home, Layers, Package, Palette, SquareRoundCorner, Type, type LucideIcon } from "lucide-react";
import type { PortalNavNode } from "@ss/portal-shell";

/** 业务 demo 侧栏（拖柜） */
export const DEMO_NAV: PortalNavNode[] = [
  { id: "home", label: "首页", to: "/" },
  {
    id: "drayage",
    label: "拖柜运输",
    children: [
      { id: "drayage-list", label: "列表页框架", to: "/" },
      { id: "drayage-quick-quote", label: "发起询价", to: "/drayage/quick-quote" },
      { id: "drayage-quote-order", label: "报价记录", to: "/drayage/quote-order" },
    ],
  },
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
  home: Home,
  drayage: Container,
  "style-guide": Layers,
  "sg-tokens": Palette,
  "sg-radius": SquareRoundCorner,
  "sg-typography": Type,
  "sg-components": Layers,
  "sg-ui": Package,
};

export const STYLE_GUIDE_DEFAULT_OPEN = ["drayage", "style-guide"];
