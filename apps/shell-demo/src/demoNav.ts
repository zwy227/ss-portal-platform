import { Container, Home } from "lucide-react";
import type { PortalNavNode } from "@ss/portal-shell";

export const DEMO_NAV: PortalNavNode[] = [
  { id: "home", label: "首页", to: "/" },
  {
    id: "drayage",
    label: "拖柜运输",
    children: [
      { id: "drayage-quick-quote", label: "发起询价", to: "/drayage/quick-quote" },
      { id: "drayage-quote-order", label: "报价记录", to: "/drayage/quote-order" },
      { id: "drayage-orders", label: "订单管理", to: "/drayage/orders" },
      { id: "drayage-fulfill", label: "履约跟踪", to: "/drayage/fulfillment" },
    ],
  },
];

export const DEMO_ICONS = {
  home: Home,
  drayage: Container,
};
