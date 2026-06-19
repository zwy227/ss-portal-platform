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

type DemoOrderRow = {
  id: string;
  orderNo: string;
  subLabel: string;
  status: string;
  statusTone: "neutral" | "info";
  routePickup: string;
  routeDelivery: string;
  orderTime: string;
};

const DEMO_ROWS: DemoOrderRow[] = [
  {
    id: "1",
    orderNo: "ORD-2025009-001",
    subLabel: "加拿大港口拖柜",
    status: "待提交订单",
    statusTone: "info",
    routePickup: "Port of Montreal - Termont Termin…",
    routeDelivery: "Ottawa",
    orderTime: "2026.05.27 15:44",
  },
  {
    id: "2",
    orderNo: "ORD-2025008-014",
    subLabel: "加拿大港口拖柜",
    status: "已报价",
    statusTone: "neutral",
    routePickup: "Port of Vancouver - DP World",
    routeDelivery: "Calgary",
    orderTime: "2026.05.26 09:12",
  },
  {
    id: "3",
    orderNo: "ORD-2025007-003",
    subLabel: "加拿大港口拖柜",
    status: "已失效",
    statusTone: "neutral",
    routePickup: "",
    routeDelivery: "",
    orderTime: "2026.05.20 18:30",
  },
];

function StatusBadge({ label, tone }: { label: string; tone: "neutral" | "info" }) {
  return (
    <span
      className={
        tone === "info"
          ? "portal-badge portal-badge--info"
          : "portal-badge portal-badge--neutral"
      }
    >
      {label}
    </span>
  );
}

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
                <StatusBadge label={row.status} tone={row.statusTone} />
              </PortalTableCell>
              <PortalTableCell>
                <PortalTableEmptyCell />
              </PortalTableCell>
              <PortalTableCell className={portalTableListCellTextClass}>
                {row.routePickup ? (
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
                ) : (
                  <PortalTableEmptyCell />
                )}
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
