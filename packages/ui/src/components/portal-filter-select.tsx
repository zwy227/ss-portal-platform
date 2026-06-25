import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";

export type PortalFilterSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  withIcon?: boolean;
};

export const PortalFilterSelect = React.forwardRef<HTMLSelectElement, PortalFilterSelectProps>(
  ({ className, withIcon = false, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "portal-filter-select",
            withIcon ? "portal-filter-select--with-icon" : "portal-filter-select--plain",
            className,
          )}
          {...props}
        />
        <ChevronDown
          className="portal-filter-select-chevron"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>
    );
  },
);

PortalFilterSelect.displayName = "PortalFilterSelect";
