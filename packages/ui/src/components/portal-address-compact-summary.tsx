import type { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

export type PortalAddressCompactSummarySegment = {
  text: string;
  emphasized?: boolean;
};

/** 选中 / 结果行单行摘要：主标题 + 尾部分段（城市加粗等） */
export type PortalAddressCompactSummaryParts = {
  primary: string;
  tail?: string;
  tailSegments?: PortalAddressCompactSummarySegment[];
  fullTitle: string;
};

export type PortalAddressCompactSummaryProps = HTMLAttributes<HTMLDivElement> & {
  parts: PortalAddressCompactSummaryParts;
};

export function PortalAddressCompactSummary({
  parts,
  className,
  ...props
}: PortalAddressCompactSummaryProps) {
  const segments = parts.tailSegments ?? [];

  return (
    <div
      className={cn("min-w-0 truncate text-13 leading-snug", className)}
      title={parts.fullTitle}
      {...props}
    >
      <span className="font-semibold text-gray-text-2">{parts.primary}</span>
      {segments.length > 0 ? (
        <>
          <span className="font-normal text-gray-text-7" aria-hidden>
            {" · "}
          </span>
          {segments.map((segment, index) => (
            <span
              key={`${index}-${segment.text}`}
              className={
                segment.emphasized
                  ? "font-semibold text-gray-text-2"
                  : "font-normal text-gray-text-7"
              }
            >
              {segment.text}
            </span>
          ))}
        </>
      ) : null}
    </div>
  );
}
