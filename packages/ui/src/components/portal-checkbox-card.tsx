import * as Tooltip from "@radix-ui/react-tooltip";
import { useId, type ReactNode } from "react";
import { cn } from "../lib/utils";
import {
  portalSelectionCardInteractionClass,
  portalSelectionCardRadiusClass,
  portalSelectionCardSelectedClass,
  portalSelectionHintClass,
} from "./portal-selection-fieldset";

const portalCheckboxInputClass =
  "mt-0.5 size-4 shrink-0 rounded border-gray-border-strong accent-gray-text-1 disabled:checked:opacity-95";

export type PortalCheckboxCardProps = {
  title: ReactNode;
  description?: ReactNode;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  disabledTooltip?: string;
  badge?: string;
  meta?: ReactNode;
  checkedAddon?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function PortalCheckboxCard({
  title,
  description,
  checked,
  onCheckedChange,
  disabled = false,
  disabledTooltip,
  badge,
  meta,
  checkedAddon,
  footer,
  className,
}: PortalCheckboxCardProps) {
  const checkboxId = useId();

  const checkboxInput = (
    <input
      id={checkboxId}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      readOnly={disabled}
      onChange={
        disabled
          ? undefined
          : (event) => {
              onCheckedChange?.(event.target.checked);
            }
      }
      className={portalCheckboxInputClass}
    />
  );

  return (
    <div
      className={cn(
        portalSelectionCardRadiusClass,
        "border border-solid px-4 py-3 transition-colors",
        checked
          ? portalSelectionCardSelectedClass
          : disabled
            ? "border-gray-border-light bg-gray-fill-light"
            : "border-gray-border-normal bg-white",
        disabled ? "cursor-default" : portalSelectionCardInteractionClass,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {disabled && disabledTooltip ? (
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>{checkboxInput}</Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  sideOffset={6}
                  className="z-50 max-w-[240px] rounded-lg border border-gray-border-normal bg-white px-2.5 py-1.5 text-13 font-medium text-gray-text-2 shadow-md"
                >
                  {disabledTooltip}
                  <Tooltip.Arrow className="fill-white" width={10} height={5} />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ) : (
          checkboxInput
        )}
        <div className="min-w-0 flex-1">
          <label
            htmlFor={checkboxId}
            className={cn("block", disabled ? "cursor-not-allowed" : "cursor-pointer")}
          >
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-14 font-medium">
                {typeof title === "string" ? (
                  <span className={disabled && !checked ? "text-gray-text-7" : "text-gray-text-2"}>
                    {title}
                  </span>
                ) : (
                  title
                )}
              </span>
              {badge ? (
                <span className="rounded-full bg-gray-fill-normal px-2 py-0.5 text-11 font-medium text-gray-text-7">
                  {badge}
                </span>
              ) : null}
              {meta}
            </span>
            {description ? (
              typeof description === "string" ? (
                <p className={cn("mt-0.5", portalSelectionHintClass)}>{description}</p>
              ) : (
                description
              )
            ) : null}
          </label>
          {checked && checkedAddon ? checkedAddon : null}
        </div>
      </div>
      {checked && footer ? (
        <div className="mt-4 border-t border-gray-border-normal pt-4">{footer}</div>
      ) : null}
    </div>
  );
}
