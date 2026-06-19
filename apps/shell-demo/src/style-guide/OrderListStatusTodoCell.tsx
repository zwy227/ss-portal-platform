import { TriangleAlert } from "lucide-react";

export type OrderListStatusBadgeTone = "info" | "warning" | "neutral" | "success";

type OrderListStatusTodoCellProps = {
  statusLabel: string;
  /** 无待办时使用的 Badge 档位；有待办时强制 warning */
  badgeTone?: OrderListStatusBadgeTone;
  todoText?: string | null;
  onTodoClick?: () => void;
};

const BADGE_CLASS: Record<OrderListStatusBadgeTone, string> = {
  info: "portal-badge portal-badge--info",
  warning: "portal-badge portal-badge--warning",
  neutral: "portal-badge portal-badge--neutral",
  success: "portal-badge portal-badge--success",
};

/**
 * 订单列表「订单状态 / 待办」列 — 对齐 SSLTLDemo FulfillmentOrderListStatusBadge：
 * 有待办 → warning + 待办链接；无待办 → info / neutral / success 等。
 */
export function OrderListStatusTodoCell({
  statusLabel,
  badgeTone = "info",
  todoText,
  onTodoClick,
}: OrderListStatusTodoCellProps) {
  const hasTodo = Boolean(todoText);
  const tone: OrderListStatusBadgeTone = hasTodo ? "warning" : badgeTone;

  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className={BADGE_CLASS[tone]}>{statusLabel}</span>
      {hasTodo && todoText ? (
        <button
          type="button"
          className="inline-flex min-w-0 max-w-full items-center gap-1 truncate border-0 bg-transparent p-0 text-12 font-medium leading-[18px] text-semantic-warning-text transition hover:underline"
          onClick={onTodoClick}
          title={todoText}
        >
          <TriangleAlert className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          <span className="truncate">{todoText}</span>
        </button>
      ) : null}
    </div>
  );
}
