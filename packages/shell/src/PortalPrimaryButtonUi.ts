/** Primary CTA disabled — pastel brand green, white text (see --brand-disabled) */
export const PORTAL_PRIMARY_BTN_DISABLED_CLASS =
  "disabled:cursor-not-allowed disabled:bg-brand-disabled disabled:text-white disabled:shadow-none disabled:opacity-100 disabled:hover:opacity-100";

/** Dialog footer primary (14px medium) */
export const PORTAL_PRIMARY_DIALOG_BTN_CLASS = [
  "rounded-btn border-0 bg-brand px-5 py-2 text-14 font-medium text-white",
  "transition-opacity hover:opacity-90",
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
  PORTAL_PRIMARY_BTN_DISABLED_CLASS,
].join(" ");
