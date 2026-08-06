import { Link } from "react-router";
import {
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
import { DEMO_ORDERS } from "../demo-orders";
import { OrderListStatusTodoCell } from "./OrderListStatusTodoCell";
import { OrderRowActions } from "./OrderRowActions";

export function UiTableExamples() {
  const { scrollRef, hasHorizontalOverflow } = useStickyActionColumn([DEMO_ORDERS.length]);
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
                    <span className="min-w-0 truncate text-gray-text-2">{row.routeDelivery}</span>
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
  );
}
