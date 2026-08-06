import { Link } from "react-router";
import { MessageSquare, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ss/portal-ui";
import type { DemoOrder } from "../demo-orders";

/** 对齐 SSLTLDemo QuoteOrderRowActionsMenu：备注入口 + 更多下拉 */
export function OrderRowActions({ row }: { row: DemoOrder }) {
  const noteLabel =
    row.noteCount > 0
      ? `${row.orderNo} 备注（${row.noteCount}）`
      : `${row.orderNo} 备注`;

  return (
    <div className="flex items-center justify-start gap-0.5">
      <Link
        to={`/orders/${row.id}`}
        className="relative inline-flex size-8 items-center justify-center rounded-md text-gray-text-4 transition hover:bg-gray-fill-normal hover:text-gray-text-2"
        aria-label={noteLabel}
      >
        <MessageSquare className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
        {row.noteCount > 0 ? (
          <span
            className="absolute right-0.5 top-0.5 inline-flex h-3 min-w-3 origin-center scale-75 items-center justify-center rounded-full border border-gray-border-normal bg-gray-fill-normal px-0.5 text-11 font-semibold tabular-nums leading-none text-gray-text-3"
            aria-hidden
          >
            {row.noteCount > 99 ? "99+" : row.noteCount}
          </span>
        ) : null}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md text-gray-text-4 transition hover:bg-gray-fill-normal hover:text-gray-text-2"
            aria-label={`${row.orderNo} 更多操作`}
          >
            <MoreVertical className="size-4" strokeWidth={1.75} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={4}>
          <DropdownMenuItem asChild>
            <Link to={`/orders/${row.id}`}>查看详情</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>复制链接</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
