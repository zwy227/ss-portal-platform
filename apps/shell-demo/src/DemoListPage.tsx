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
import { ListTabStatusGuidePopover } from "./style-guide/ListTabStatusGuidePopover";
import { OrderListStatusTodoCell } from "./style-guide/OrderListStatusTodoCell";
import { OrderRowActions } from "./style-guide/OrderRowActions";
import { StyleGuideShell } from "./style-guide/StyleGuideShell";

const STATUS_OPTIONS = [
  { value: "pending", label: "平台确认中" },
  { value: "done", label: "已完成" },
  { value: "cancelled", label: "已取消" },
];

/** 待办在前：待办 | 状态 Tab（对齐 TabStyleExamples / 履约列表） */
const TODO_TAB = { id: "todo", label: "待办", count: 3 } as const;

const STATUS_TABS = [
  { id: "all", label: "全部", count: 12 },
  { id: "done", label: "已完成", count: 7 },
] as const;

const STATUS_GUIDE_ITEMS = [
  {
    label: "待办",
    description:
      "汇总所有需要您处理的订单，包括待下单、确认中，以及执行中待补充材料、待上传文件等订单。",
  },
  {
    label: "全部",
    description: "展示当前筛选条件下的全部订单。",
  },
  {
    label: "已完成",
    description: "订单履约及必要文件回传已完成。",
  },
] as const;

type TabId = (typeof TODO_TAB)["id"] | (typeof STATUS_TABS)[number]["id"];

function TodoTabIcon() {
  return (
    <svg
      className="size-5 shrink-0"
      viewBox="0 0 1024 1024"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M575.32 890.5H268.68c-71.78 0-130.18-58.4-130.18-130.18V245.68c0-71.78 58.4-130.18 130.18-130.18h386.64c71.78 0 130.18 58.4 130.18 130.18v274.64a32.5 32.5 0 1 1-65 0V245.68a65.25 65.25 0 0 0-65.18-65.18H268.68a65.25 65.25 0 0 0-65.18 65.18v514.64a65.25 65.25 0 0 0 65.18 65.18h306.64a32.5 32.5 0 1 1 0 65z" />
      <path d="M611 322.41H315.93a32.5 32.5 0 0 1 0-65H611a32.5 32.5 0 0 1 0 65zM611 455.74H315.93a32.5 32.5 0 0 1 0-65H611a32.5 32.5 0 0 1 0 65zM437 589.08H315.93a32.5 32.5 0 1 1 0-65H437a32.5 32.5 0 0 1 0 65zM702.19 936.35a220.11 220.11 0 1 1 155.64-64.47 218.7 218.7 0 0 1-155.64 64.47z m0-375.22c-85.53 0-155.11 69.58-155.11 155.11s69.58 155.11 155.11 155.11S857.3 801.76 857.3 716.24s-69.59-155.11-155.11-155.11z" />
      <path d="M704.19 758.74h-56.44a32.5 32.5 0 0 1 0-65h23.94v-50.28a32.5 32.5 0 0 1 65 0v82.78a32.51 32.51 0 0 1-32.5 32.5z" />
    </svg>
  );
}

function tabItemClass(active: boolean, extra = "") {
  return `portal-tab-item shrink-0 ${active ? "portal-tab-item--active" : ""} ${extra}`.trim();
}

/**
 * 典型列表页 — 对齐 docs/frameworks/list-page.md
 * 标题 / Tab / 筛选 / 表格 / 分页 一体示例。
 */
export function DemoListPage() {
  const [tab, setTab] = useState<TabId>("todo");
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
            <button
              type="button"
              role="tab"
              aria-selected={tab === TODO_TAB.id}
              aria-current={tab === TODO_TAB.id ? "page" : undefined}
              className={tabItemClass(tab === TODO_TAB.id, "inline-flex items-center gap-1")}
              onClick={() => setTab(TODO_TAB.id)}
            >
              <TodoTabIcon />
              {TODO_TAB.label}
              <span className="ml-1 tabular-nums">({TODO_TAB.count})</span>
            </button>
            <span className="portal-tab-bar__divider" aria-hidden />
            {STATUS_TABS.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={tabItemClass(active)}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                  <span className="ml-1 tabular-nums">({item.count})</span>
                </button>
              );
            })}
            <div className="ml-auto shrink-0">
              <ListTabStatusGuidePopover items={STATUS_GUIDE_ITEMS} />
            </div>
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
                        <div className="flex flex-col gap-0.5">
                          <Link
                            to={`/orders/${row.id}`}
                            className="portal-table-id-link w-fit max-w-full"
                          >
                            {row.orderNo}
                          </Link>
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
                            <span className="min-w-0 truncate text-gray-text-2">
                              {row.routeDelivery}
                            </span>
                          </p>
                        </div>
                      </PortalTableCell>
                      <PortalTableCell
                        className={`${portalTableListCellTextClass} portal-text-numeric`}
                      >
                        {row.orderTime}
                      </PortalTableCell>
                      <PortalTableCell
                        className={`${portalTableListCellTextClass} portal-text-numeric whitespace-nowrap`}
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
