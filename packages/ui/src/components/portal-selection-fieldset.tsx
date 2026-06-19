import type { ReactNode } from "react";

const portalSelectionHintClass = "text-13 font-normal leading-relaxed text-gray-text-7";
const portalSelectionLegendClass = "mb-3 block text-14 font-semibold text-gray-text-2";

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

export { portalSelectionHintClass, portalSelectionLegendClass };
