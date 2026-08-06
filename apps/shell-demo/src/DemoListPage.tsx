import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PortalListFilterResetButton } from "@ss/portal-shell";
import {
  PortalAntSelect,
  PortalFilterSelect,
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
import { DEMO_ORDERS } from "./demo-orders";
import { OrderListStatusTodoCell } from "./style-guide/OrderListStatusTodoCell";
import { OrderRowActions } from "./style-guide/OrderRowActions";
import { StyleGuideShell } from "./style-guide/StyleGuideShell";

const STATUS_OPTIONS = [
  { value: "pending", label: "平台确认中" },
  { value: "done", label: "已完成" },
  { value: "cancelled", label: "已取消" },
];

const TABS = [
  { id: "all", label: "全部", count: 12 },
  { id: "todo", label: "待处理", count: 3 },
  { id: "done", label: "已完成", count: 7 },
] as const;

/**
 * 典型列表页 — 对齐 docs/frameworks/list-page.md
 * 标题 / Tab / 筛选 / 表格 / 分页 一体示例。
 */
export function DemoListPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState("");
  const { scrollRef, hasHorizontalOverflow } = useStickyActionColumn([DEMO_ORDERS.length]);
  const stickyThClass = portalTableStickyActionThClass(hasHorizontalOverflow);
  const stickyTdClass = portalTableStickyActionTdClass(hasHorizontalOverflow);

  const resetFilters = () => {
    setStatus(undefined);
    setKeyword("");
  };

  return (
    <StyleGuideShell>
      <main className="portal-page-main">
        <div className="portal-page-content">
          <h1 className="portal-page-title">
            <span className="portal-page-title-prefix">拖柜运输:</span>
            订单管理
          </h1>

          <div className="portal-tab-bar" role="tablist" aria-label="订单状态">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                className={
                  tab === item.id ? "portal-tab-item portal-tab-item--active" : "portal-tab-item"
                }
                onClick={() => setTab(item.id)}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>

          <div className="portal-list-card flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[200px] flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 portal-filter-icon"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  type="search"
                  className="portal-filter-input"
                  placeholder="搜索订单号…"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  aria-label="搜索订单号"
                />
              </div>
              <div className="relative min-w-[140px]">
                <PortalFilterSelect defaultValue="30" aria-label="时间范围">
                  <option value="7">最近 7 天</option>
                  <option value="30">最近 30 天</option>
                  <option value="90">最近 90 天</option>
                </PortalFilterSelect>
              </div>
              <div className="min-w-[140px]">
                <PortalAntSelect
                  placeholder="状态"
                  allowClear
                  value={status}
                  onChange={setStatus}
                  options={STATUS_OPTIONS}
                  aria-label="状态筛选"
                />
              </div>
              <PortalListFilterResetButton onReset={resetFilters} />
            </div>

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
                    <PortalTableHeadCell>
                      <PortalTableSortHeader label="报价金额" />
                    </PortalTableHeadCell>
                    <PortalTableHeadCell className={stickyThClass}>操作</PortalTableHeadCell>
                  </PortalTableRow>
                </PortalTableHead>
                <PortalTableBody>
                  {DEMO_ORDERS.map((row) => (
                    <PortalTableRow key={row.id}>
                      <PortalTableCell columnAlign="first" className={portalTableListCellTextClass}>
                        <Link
                          to={`/orders/${row.id}`}
                          className="flex flex-col gap-0.5 no-underline transition hover:opacity-80"
                        >
                          <span className="font-semibold text-gray-text-2">{row.orderNo}</span>
                          <span className="text-12 text-gray-text-7">{row.subLabel}</span>
                        </Link>
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
                            <span className="min-w-0 truncate text-gray-text-2">
                              {row.routeDelivery}
                            </span>
                          </p>
                        </div>
                      </PortalTableCell>
                      <PortalTableCell className={portalTableListCellTextClass}>
                        {row.orderTime}
                      </PortalTableCell>
                      <PortalTableCell
                        className={`${portalTableListCellTextClass} whitespace-nowrap tabular-nums`}
                      >
                        {row.quoteAmount ?? <PortalTableEmptyCell />}
                      </PortalTableCell>
                      <PortalTableCell className={stickyTdClass} withDivider={false}>
                        <OrderRowActions row={row} />
                      </PortalTableCell>
                    </PortalTableRow>
                  ))}
                </PortalTableBody>
              </PortalTable>
            </PortalTableRoot>

            <div className="portal-pagination portal-pagination--spacious">
              <p className="portal-pagination-summary">显示 1 - 4 / 12 条</p>
              <div className="flex flex-wrap items-center gap-4">
                <label className="portal-pagination-label">
                  每页
                  <select className="portal-pagination-size-select" defaultValue="10">
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                  条
                </label>
                <div className="flex items-center gap-1">
                  <button type="button" className="portal-pagination-nav-btn" disabled aria-label="上一页">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button type="button" className="portal-pagination-page portal-pagination-page--active">
                    1
                  </button>
                  <button type="button" className="portal-pagination-page">
                    2
                  </button>
                  <button type="button" className="portal-pagination-nav-btn" aria-label="下一页">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </StyleGuideShell>
  );
}
