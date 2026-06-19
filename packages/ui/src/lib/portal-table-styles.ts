import { portalUiText13Compact } from "./portal-typography";

export const STICKY_ACTION_TH_SHADOW = "shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.08)]";
export const STICKY_ACTION_TD_SHADOW = "shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.06)]";

const thBase = `py-3 text-left ${portalUiText13Compact} font-medium text-gray-text-4 border-b border-gray-border-normal`;
const tdRowDividerClass = "border-b border-gray-border-light";

export const portalTableThFirstClass = `${thBase} pl-1 pr-4`;
export const portalTableThMidClass = `${thBase} px-4`;
export const portalTableTdFirstClass = "pl-1 pr-4 py-3.5";
export const portalTableTdMidClass = "px-4 py-3.5";
export const portalTableTdRowDividerClass = tdRowDividerClass;
export const portalTableListCellTextClass = `${portalUiText13Compact} text-gray-text-2`;
export const portalTableStickyActionTdBase =
  "sticky right-0 z-10 bg-white pl-4 pr-1 py-3.5 text-left group-hover:bg-gray-fill-light";

export function buildStickyActionThClass(thBaseClass: string, showShadow: boolean): string {
  return `${thBaseClass} pl-3 pr-1 sticky right-0 z-10 bg-white${showShadow ? ` ${STICKY_ACTION_TH_SHADOW}` : ""}`;
}

export function buildStickyActionTdClass(baseWithoutShadow: string, showShadow: boolean): string {
  return `${baseWithoutShadow}${showShadow ? ` ${STICKY_ACTION_TD_SHADOW}` : ""}`;
}

export function portalTableStickyActionThClass(showShadow: boolean): string {
  return buildStickyActionThClass(`${thBase} pl-4 pr-1`, showShadow);
}

export function portalTableStickyActionTdClass(showShadow: boolean): string {
  return buildStickyActionTdClass(
    `${portalTableStickyActionTdBase} ${tdRowDividerClass}`,
    showShadow,
  );
}
