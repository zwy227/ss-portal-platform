import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/utils";

/** 浅橙待办提示条外壳（对齐履约 RiskCollaboration banner） */
export const portalTodoMessageClass =
  "rounded-card border border-solid border-semantic-warning-light bg-semantic-warning-bg px-3 py-2.5";

export const portalTodoMessageTitleClass =
  "m-0 text-13 font-semibold leading-5 text-semantic-warning-text";

export const portalTodoMessageDescriptionClass =
  "m-0 mt-2 text-13 leading-5 text-semantic-warning-text";

export const portalTodoMessageListClass =
  "m-0 mt-2 flex list-none flex-col gap-1 p-0";

export const portalTodoMessageItemClass =
  "flex min-w-0 items-center justify-between gap-3";

export const portalTodoMessageItemLabelClass =
  "min-w-0 text-13 font-normal leading-5 text-gray-text-2";

export const portalTodoMessageDotClass =
  "mt-px size-1.5 shrink-0 rounded-full bg-semantic-warning-text";

export const portalTodoMessageActionClass =
  "inline-flex shrink-0 items-center gap-0.5 text-13 font-medium leading-5 text-semantic-warning-text transition hover:opacity-80 focus-visible:outline-none focus-visible:underline";

export type PortalTodoMessageItem = {
  key: string;
  label: ReactNode;
  /** 右侧操作文案；默认「去处理」；传 `null` 隐藏操作 */
  actionLabel?: string | null;
  onAction?: () => void;
};

export type PortalTodoMessageProps = Omit<ComponentPropsWithoutRef<"section">, "title"> & {
  /** 标题；有 items 时业务侧常写成「N项待办，请尽快处理」 */
  title: ReactNode;
  /** 标题右侧可选操作 */
  headerAction?: ReactNode;
  /** 标题下方补充说明（可选） */
  description?: ReactNode;
  items?: readonly PortalTodoMessageItem[];
  /** 列表区 aria-label */
  listAriaLabel?: string;
};

/**
 * 详情页待办 / 风险协作提示条：浅橙壳 + 标题 + 圆点列表 + 文案链接。
 * 对齐 Drayage `FulfillmentRiskCollaborationCard` 的 `variant="banner"`。
 */
export function PortalTodoMessage({
  title,
  headerAction,
  description,
  items,
  listAriaLabel = "待办事项列表",
  className,
  ...props
}: PortalTodoMessageProps) {
  const hasItems = Boolean(items && items.length > 0);

  return (
    <section
      className={cn(portalTodoMessageClass, className)}
      role="status"
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className={portalTodoMessageTitleClass}>{title}</h2>
        {headerAction}
      </div>

      {description != null ? (
        <p className={portalTodoMessageDescriptionClass}>{description}</p>
      ) : null}

      {hasItems ? (
        <ul className={portalTodoMessageListClass} aria-label={listAriaLabel}>
          {items!.map((item) => {
            const showAction = item.actionLabel !== null && Boolean(item.onAction);
            const actionLabel = item.actionLabel ?? "去处理";

            return (
              <li key={item.key} className={portalTodoMessageItemClass}>
                <div className="flex min-w-0 items-center gap-2">
                  <span className={portalTodoMessageDotClass} aria-hidden />
                  <span className={portalTodoMessageItemLabelClass}>{item.label}</span>
                </div>
                {showAction ? (
                  <button
                    type="button"
                    className={portalTodoMessageActionClass}
                    onClick={item.onAction}
                  >
                    {actionLabel}
                    <ChevronRight className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
