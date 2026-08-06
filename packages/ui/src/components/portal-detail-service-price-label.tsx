import { useMemo } from "react";
import { cn } from "../lib/utils";

export type PortalDetailServicePriceVariant = "free" | "surcharge";

export type PortalDetailServicePriceSegment = {
  text: string;
  variant: PortalDetailServicePriceVariant;
};

export const portalDetailServicePriceBaseClass = "text-12 font-bold";
export const portalDetailServicePriceFreeClass = `${portalDetailServicePriceBaseClass} text-brand`;
export const portalDetailServicePriceSurchargeClass = `${portalDetailServicePriceBaseClass} text-accent-orange`;

/** 将表单价格文案拆为「免费 / 加价」片段，用于分色展示 */
export function parsePortalDetailServicePriceSegments(
  text: string,
): PortalDetailServicePriceSegment[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  if (trimmed === "免费" || trimmed === "Free") {
    return [{ text: trimmed, variant: "free" }];
  }

  const mixedMatch = trimmed.match(/^(.+?免费[，,])(.+)$/);
  if (mixedMatch && /\+|按[实时]|超出|超期|\$[\d]/.test(mixedMatch[2])) {
    return [
      { text: mixedMatch[1], variant: "free" },
      { text: mixedMatch[2], variant: "surcharge" },
    ];
  }

  if (
    trimmed.includes("免费") &&
    !/\+|按[实时]|待人工|超出|超期|\$[\d]/.test(trimmed.replace(/免费/g, ""))
  ) {
    return [{ text: trimmed, variant: "free" }];
  }

  return [{ text: trimmed, variant: "surcharge" }];
}

export type PortalDetailServicePriceLabelProps = {
  text: string;
  className?: string;
};

/**
 * 完善需求页服务价签：免费 → brand 绿；加价 / 按实收取 → accent-orange。
 * 支持「1小时免费，超期 +$80/小时…」混合文案分色。
 */
export function PortalDetailServicePriceLabel({
  text,
  className,
}: PortalDetailServicePriceLabelProps) {
  const segments = useMemo(() => parsePortalDetailServicePriceSegments(text), [text]);

  if (segments.length === 0) return null;

  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center",
        portalDetailServicePriceBaseClass,
        className,
      )}
    >
      {segments.map((segment, index) => (
        <span
          key={`${segment.variant}-${index}`}
          className={
            segment.variant === "free"
              ? portalDetailServicePriceFreeClass
              : portalDetailServicePriceSurchargeClass
          }
        >
          {segment.text}
        </span>
      ))}
    </span>
  );
}
