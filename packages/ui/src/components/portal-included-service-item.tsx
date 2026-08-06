import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { PortalDetailServicePriceLabel } from "./portal-detail-service-price-label";

export type PortalIncludedServiceItemProps = {
  title: string;
  /** 价签文案；走 PortalDetailServicePriceLabel 分色 */
  price?: string;
  /** 自定义价签（优先于 price） */
  meta?: ReactNode;
  tipTitle?: string;
  tip?: string;
  className?: string;
};

/**
 * 已包含服务行：✓ 标题 ⓘ 价签（无边框卡片）。
 * 用于「其他」等只读已含项，对齐完善需求页附加服务列表。
 */
export function PortalIncludedServiceItem({
  title,
  price,
  meta,
  tipTitle,
  tip,
  className,
}: PortalIncludedServiceItemProps) {
  const tipLabel = tipTitle ?? title;
  const priceNode =
    meta ?? (price ? <PortalDetailServicePriceLabel text={price} /> : null);

  return (
    <div className={cn("flex min-w-0 flex-wrap items-center gap-1.5", className)}>
      <Check
        className="size-3.5 shrink-0 text-gray-text-2"
        strokeWidth={2.5}
        aria-hidden
      />
      <span className="text-14 font-medium text-gray-text-2">{title}</span>
      {tip ? (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className="inline-flex shrink-0 rounded-full p-0.5 text-gray-text-5 transition hover:text-gray-text-3 focus-visible:outline-none focus-visible:shadow-focus-normal"
                aria-label={`${tipLabel}说明`}
              >
                <Info className="size-3.5" strokeWidth={2} aria-hidden />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={6}
                className="z-50 max-w-[280px] rounded-md border border-gray-border-light bg-white px-3 py-2 text-12 leading-5 text-gray-text-2 shadow-lg"
              >
                <p className="m-0 text-13 font-medium text-gray-text-2">{tipLabel}</p>
                <p className="mt-1 m-0 text-12 leading-relaxed text-gray-text-5">{tip}</p>
                <Tooltip.Arrow className="fill-white" width={10} height={5} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : null}
      {priceNode}
    </div>
  );
}
