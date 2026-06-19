import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { portalSelectionHintClass } from "./portal-selection-fieldset";

export type PortalRadioCardProps = {
  name: string;
  value: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
};

export function PortalRadioCard({
  name,
  value,
  title,
  description,
  meta,
  checked,
  onChange,
  disabled = false,
  className,
}: PortalRadioCardProps) {
  return (
    <label
      className={cn(
        "block rounded-input border border-solid p-4 transition-colors",
        disabled ? "cursor-default border-0" : "cursor-pointer",
        checked
          ? disabled
            ? "bg-[color-mix(in_srgb,var(--brand)_5%,white)]"
            : "border-gray-border-normal bg-[color-mix(in_srgb,var(--brand)_5%,white)]"
          : disabled
            ? "bg-white"
            : "border-gray-border-normal bg-white hover:border-gray-border-emphasis",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <span className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn(
            "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-solid transition-colors",
            checked ? "border-gray-text-1 bg-white" : "border-gray-text-7 bg-white",
          )}
        >
          <span
            className={cn(
              "size-2 rounded-full transition-opacity",
              checked ? "bg-gray-text-1 opacity-100" : "bg-transparent opacity-0",
            )}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-14 font-semibold text-gray-text-2">{title}</span>
            {meta}
          </span>
          {description ? (
            typeof description === "string" ? (
              <p className={cn("mt-1", portalSelectionHintClass)}>{description}</p>
            ) : (
              description
            )
          ) : null}
        </span>
      </span>
    </label>
  );
}
