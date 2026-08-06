import type { ReactNode } from "react";

const portalSelectionHintClass = "text-13 font-normal leading-relaxed text-gray-text-7";
const portalSelectionLegendClass = "portal-detail-form-legend";

/** 对齐完善需求页：选项卡圆角 6px（`--radius`） */
const portalSelectionCardRadiusClass = "rounded";

/** 选中态：浅灰底（非品牌 tint） */
const portalSelectionCardSelectedClass = "border-gray-border-normal bg-gray-fill-light";

/**
 * 可编辑选择卡交互：hover 加深边线；focus-within 与字段壳一致（normal ring）。
 * 未选中 / 选中均可聚焦；disabled 勿挂此 class。
 */
const portalSelectionCardInteractionClass =
  "hover:border-gray-border-emphasis focus-within:border-gray-border-black focus-within:shadow-focus-normal";

export type PortalSelectionFieldsetProps = {
  legend: string;
  hint?: string;
  children: ReactNode;
  hideLegend?: boolean;
  contentClassName?: string;
  className?: string;
};

export function PortalSelectionFieldset({
  legend,
  hint,
  children,
  hideLegend = false,
  contentClassName = "flex flex-col gap-2",
  className,
}: PortalSelectionFieldsetProps) {
  return (
    <fieldset className={className ?? "min-w-0"}>
      {!hideLegend ? <legend className={portalSelectionLegendClass}>{legend}</legend> : null}
      {hint ? <p className={`mb-3 ${portalSelectionHintClass}`}>{hint}</p> : null}
      <div className={contentClassName}>{children}</div>
    </fieldset>
  );
}

export {
  portalSelectionCardInteractionClass,
  portalSelectionCardRadiusClass,
  portalSelectionCardSelectedClass,
  portalSelectionHintClass,
  portalSelectionLegendClass,
};
