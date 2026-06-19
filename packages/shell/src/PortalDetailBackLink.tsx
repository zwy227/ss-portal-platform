import type { ComponentPropsWithoutRef, ReactElement } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export const PORTAL_DETAIL_BACK_LINK_CLASS =
  "flex size-8 shrink-0 items-center justify-center rounded-nav border border-gray-border-normal bg-background text-gray-text-4 transition hover:bg-gray-fill-normal";

const TOOLTIP_CONTENT_CLASS =
  "z-50 max-w-[240px] rounded-md border border-gray-border-normal bg-popover px-2.5 py-1.5 text-13-compact font-medium text-gray-text-2 shadow-md";

function DetailBackTooltip({ label, children }: { label: string; children: ReactElement }) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
            {label}
            <Tooltip.Arrow className="fill-popover" width={10} height={5} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function PortalDetailBackLink({
  to,
  label,
  className,
  state,
}: {
  to: string;
  label: string;
  className?: string;
  state?: ComponentPropsWithoutRef<typeof Link>["state"];
}) {
  return (
    <DetailBackTooltip label={label}>
      <Link
        to={to}
        state={state}
        className={className ?? PORTAL_DETAIL_BACK_LINK_CLASS}
        aria-label={label}
      >
        <ArrowLeft className="size-[18px]" strokeWidth={1.75} aria-hidden />
      </Link>
    </DetailBackTooltip>
  );
}

export function PortalDetailBackButton({
  onClick,
  label,
  className,
  disabled,
}: {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <DetailBackTooltip label={label}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={className ?? PORTAL_DETAIL_BACK_LINK_CLASS}
        aria-label={label}
      >
        <ArrowLeft className="size-[18px]" strokeWidth={1.75} aria-hidden />
      </button>
    </DetailBackTooltip>
  );
}
