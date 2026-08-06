import type { OrderListStatusBadgeTone } from "./style-guide/OrderListStatusTodoCell";

export type DemoOrder = {
  id: string;
  orderNo: string;
  subLabel: string;
  statusLabel: string;
  badgeTone?: OrderListStatusBadgeTone;
  todoText?: string | null;
  routePickup: string;
  routePickupSecondary: string;
  routeDelivery: string;
  routeDeliverySecondary: string;
  orderTime: string;
  /** 列表「报价金额」；无报价时为 null，展示 — */
  quoteAmount: string | null;
  /** 操作列备注角标；0 不展示角标 */
  noteCount: number;
  containerSize: string;
  containerCount: string;
  /** 履约跟踪左导航货柜号 */
  containerNo: string;
  customerId: string;
  billOfLadingNo: string;
};

/** 典型列表 / 详情共用 mock — 对齐拖柜订单场景 */
export const DEMO_ORDERS: DemoOrder[] = [
  {
    id: "1",
    orderNo: "ORD-20260901-016",
    subLabel: "美国港口拖柜",
    statusLabel: "平台确认中",
    badgeTone: "info",
    todoText: "待上传DO文件",
    routePickup: "Port of Los Angeles - APM Terminals",
    routePickupSecondary: "Los Angeles, CA · Terminal Island",
    routeDelivery: "Los Angeles, CA",
    routeDeliverySecondary: "Warehouse · 2500 S Santa Fe Ave",
    orderTime: "2026.09.01 10:22",
    quoteAmount: "1,285 USD",
    noteCount: 0,
    containerSize: "40HQ",
    containerCount: "1",
    containerNo: "TCLU100004",
    customerId: "CUS-000072",
    billOfLadingNo: "MOLU180012345",
  },
  {
    id: "2",
    orderNo: "ORD-20260901-015",
    subLabel: "美国港口拖柜",
    statusLabel: "平台确认中",
    badgeTone: "info",
    todoText: null,
    routePickup: "Port of Long Beach - LBCT",
    routePickupSecondary: "Long Beach, CA · Pier T",
    routeDelivery: "Ontario, CA",
    routeDeliverySecondary: "DC · 4500 E Airport Dr",
    orderTime: "2026.09.01 09:05",
    quoteAmount: "2,450 USD",
    noteCount: 3,
    containerSize: "40GP",
    containerCount: "2",
    containerNo: "MSKU100003",
    customerId: "CUS-000015",
    billOfLadingNo: "COSU690045678",
  },
  {
    id: "3",
    orderNo: "ORD-20260828-004",
    subLabel: "美国港口拖柜",
    statusLabel: "已取消",
    badgeTone: "neutral",
    todoText: null,
    routePickup: "Port of Oakland - SSA Marine",
    routePickupSecondary: "Oakland, CA · Berth 57",
    routeDelivery: "Sacramento, CA",
    routeDeliverySecondary: "Warehouse · 1200 Industrial Blvd",
    orderTime: "2026.08.28 16:40",
    quoteAmount: null,
    noteCount: 1,
    containerSize: "20GP",
    containerCount: "1",
    containerNo: "GLCU100001",
    customerId: "CUS-000004",
    billOfLadingNo: "OOLU210098765",
  },
  {
    id: "4",
    orderNo: "ORD-20260820-011",
    subLabel: "美国港口拖柜",
    statusLabel: "已完成",
    badgeTone: "success",
    todoText: null,
    routePickup: "Port of Seattle - Terminal 18",
    routePickupSecondary: "Seattle, WA · Harbor Island",
    routeDelivery: "Tacoma, WA",
    routeDeliverySecondary: "Warehouse · 3400 Port of Tacoma Rd",
    orderTime: "2026.08.20 14:18",
    quoteAmount: "980 CAD",
    noteCount: 0,
    containerSize: "40HQ",
    containerCount: "1",
    containerNo: "COSU100007",
    customerId: "CUS-000011",
    billOfLadingNo: "EGLV123456789",
  },
];

export function getDemoOrder(id: string | undefined): DemoOrder | undefined {
  if (!id) return undefined;
  return DEMO_ORDERS.find((row) => row.id === id);
}
