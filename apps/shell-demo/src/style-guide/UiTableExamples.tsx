import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  PortalTable,
  PortalTableBody,
  PortalTableCell,
  PortalTableEmptyCell,
  PortalTableHead,
  PortalTableHeadCell,
  PortalTableRoot,
  PortalTableRow,
  PortalTableSortHeader,
  portalTableListCellTextClass,
  portalTableStickyActionTdClass,
  portalTableStickyActionThClass,
  useStickyActionColumn,
} from "@ss/portal-ui";
import { OrderListStatusTodoCell, type OrderListStatusBadgeTone } from "./OrderListStatusTodoCell";

type DemoOrderRow = {
  id: string;
  orderNo: string;
  subLabel: string;
  statusLabel: string;
  badgeTone?: OrderListStatusBadgeTone;
  todoText?: string | null;
  routePickup: string;
  routeDelivery: string;
  orderTime: string;
};

/** 对齐 SSLTLDemo 订单管理列表 — 各 Badge 档位 + 待办列 */
const DEMO_ROWS: DemoOrderRow[] = [
  {
    id: "1",
    orderNo: "ORD-20260901-016",
    subLabel: "美国港口拖柜",
    statusLabel: "平台确认中",
    badgeTone: "info",
    todoText: "待上传DO文件",
    routePickup: "Port of Los Angeles - APM Terminals",
    routeDelivery: "Los Angeles, CA",
    orderTime: "2026.09.01 10:22",
  },
  {
    id: "2",
    orderNo: "ORD-20260901-015",
    subLabel: "美国港口拖柜",
    statusLabel: "平台确认中",
    badgeTone: "info",
    todoText: null,
    routePickup: "Port of Long Beach - LBCT",
    routeDelivery: "Ontario, CA",
    orderTime: "2026.09.01 09:05",
  },
  {
    id: "3",
    orderNo: "ORD-20260828-004",
    subLabel: "美国港口拖柜",
    statusLabel: "已取消",
    badgeTone: "neutral",
    todoText: null,
    routePickup: "Port of Oakland - SSA Marine",
    routeDelivery: "Sacramento, CA",
    orderTime: "2026.08.28 16:40",
  },
  {
    id: "4",
    orderNo: "ORD-20260820-011",
    subLabel: "美国港口拖柜",
    statusLabel: "已完成",
    badgeTone: "success",
    todoText: null,
    routePickup: "Port of Seattle - Terminal 18",
    routeDelivery: "Tacoma, WA",
    orderTime: "2026.08.20 14:18",
  },
];

export function UiTableExamples() {
  const { scrollRef, hasHorizontalOverflow } = useStickyActionColumn([DEMO_ROWS.length]);
  const stickyThClass = portalTableStickyActionThClass(hasHorizontalOverflow);
  const stickyTdClass = portalTableStickyActionTdClass(hasHorizontalOverflow);

  return (
    <PortalTableRoot ref={scrollRef}>
      <PortalTable>
        <PortalTableHead>
          <PortalTableRow className="hover:bg-transparent">
            <PortalTableHeadCell columnAlign="first">
              <PortalTableSortHeader label="订单号" />
            </PortalTableHeadCell>
            <PortalTableHeadCell>
              <PortalTableSortHeader label="订单状态 / 待办" />
            </PortalTableHeadCell>
            <PortalTableHeadCell>
              <PortalTableSortHeader label="提单号" />
            </PortalTableHeadCell>
            <PortalTableHeadCell>
              <PortalTableSortHeader label="路线信息" />
            </PortalTableHeadCell>
            <PortalTableHeadCell>
              <PortalTableSortHeader label="下单时间" />
            </PortalTableHeadCell>
            <PortalTableHeadCell className={stickyThClass}>操作</PortalTableHeadCell>
          </PortalTableRow>
        </PortalTableHead>
        <PortalTableBody>
          {DEMO_ROWS.map((row) => (
            <PortalTableRow key={row.id}>
              <PortalTableCell columnAlign="first" className={portalTableListCellTextClass}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-gray-text-2">{row.orderNo}</span>
                  <span className="text-12 text-gray-text-7">{row.subLabel}</span>
                </div>
              </PortalTableCell>
              <PortalTableCell>
                <OrderListStatusTodoCell
                  statusLabel={row.statusLabel}
                  badgeTone={row.badgeTone}
                  todoText={row.todoText}
                />
              </PortalTableCell>
              <PortalTableCell>
                <PortalTableEmptyCell />
              </PortalTableCell>
              <PortalTableCell className={portalTableListCellTextClass}>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="flex min-w-0 items-center gap-1 text-12 leading-4">
                    <span className="w-4 shrink-0 text-gray-text-7">提</span>
                    <span className="min-w-0 truncate text-gray-text-2">{row.routePickup}</span>
                  </p>
                  <p className="flex min-w-0 items-center gap-1 text-12 leading-4">
                    <span className="w-4 shrink-0 text-gray-text-7">派</span>
                    <span className="min-w-0 truncate text-gray-text-2">{row.routeDelivery}</span>
                  </p>
                </div>
              </PortalTableCell>
              <PortalTableCell className={portalTableListCellTextClass}>{row.orderTime}</PortalTableCell>
              <PortalTableCell className={stickyTdClass} withDivider={false}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex size-8 items-center justify-center rounded-md text-gray-text-4 transition hover:bg-gray-fill-normal"
                      aria-label={`${row.orderNo} 更多操作`}
                    >
                      <MoreVertical className="size-4" strokeWidth={1.75} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>查看详情</DropdownMenuItem>
                    <DropdownMenuItem>复制链接</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </PortalTableCell>
            </PortalTableRow>
          ))}
        </PortalTableBody>
      </PortalTable>
    </PortalTableRoot>
  );
}
