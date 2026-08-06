import { portalUiText13Compact } from "./portal-typography";

export const STICKY_ACTION_TH_SHADOW = "shadow-[-10px_0_16px_-4px_rgba(0,0,0,0.14)]";
export const STICKY_ACTION_TD_SHADOW = "shadow-[-10px_0_16px_-4px_rgba(0,0,0,0.12)]";

/** 列表表头 — 12px / medium(500) */
const thBase = `py-3 text-left text-12 font-medium text-gray-text-4 border-b border-gray-border-normal`;
const tdRowDividerClass = "border-b border-gray-border-light";

export const portalTableThFirstClass = `${thBase} pl-1 pr-4`;
export const portalTableThMidClass = `${thBase} px-4`;
export const portalTableTdFirstClass = "pl-1 pr-4 py-3.5";
export const portalTableTdMidClass = "px-4 py-3.5";
export const portalTableTdRowDividerClass = tdRowDividerClass;
export const portalTableListCellTextClass = `${portalUiText13Compact} text-gray-text-2`;
/** 右侧 sticky 操作列宽度（备注 + 更多，对齐 SSLTLDemo DrayageQuoteOrderTable） */
export const PORTAL_TABLE_STICKY_ACTION_COL_WIDTH = "w-[88px]";

export const portalTableStickyActionTdBase =
  `sticky right-0 z-10 ${PORTAL_TABLE_STICKY_ACTION_COL_WIDTH} bg-white pl-3 pr-2 py-3.5 text-left align-middle group-hover:bg-gray-fill-light`;

export function buildStickyActionThClass(thBaseClass: string, showShadow: boolean): string {
  return `${thBaseClass} sticky right-0 z-10 bg-white${showShadow ? ` ${STICKY_ACTION_TH_SHADOW}` : ""}`;
}

export function buildStickyActionTdClass(baseWithoutShadow: string, showShadow: boolean): string {
  return `${baseWithoutShadow}${showShadow ? ` ${STICKY_ACTION_TD_SHADOW}` : ""}`;
}

export function portalTableStickyActionThClass(showShadow: boolean): string {
  return buildStickyActionThClass(
    `${thBase} ${PORTAL_TABLE_STICKY_ACTION_COL_WIDTH} pl-3 pr-2 text-left`,
    showShadow,
  );
}

export function portalTableStickyActionTdClass(showShadow: boolean): string {
  return buildStickyActionTdClass(
    `${portalTableStickyActionTdBase} ${tdRowDividerClass}`,
    showShadow,
  );
}
