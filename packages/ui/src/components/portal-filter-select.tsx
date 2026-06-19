import * as React from "react";
import { cn } from "../lib/utils";

export type PortalFilterSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  withIcon?: boolean;
};

export const PortalFilterSelect = React.forwardRef<HTMLSelectElement, PortalFilterSelectProps>(
  ({ className, withIcon = false, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "portal-filter-select",
          withIcon ? "portal-filter-select--with-icon" : "portal-filter-select--plain",
          className,
        )}
        {...props}
      />
    );
  },
);

PortalFilterSelect.displayName = "PortalFilterSelect";
