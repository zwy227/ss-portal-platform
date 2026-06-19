import * as React from "react";
import { cn } from "../lib/utils";
import { portalUiText14 } from "../lib/portal-typography";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `flex h-9 w-full rounded-md border border-gray-border-strong bg-background px-3 ${portalUiText14} text-gray-text-2 outline-none transition placeholder:text-gray-text-7 hover:border-brand focus:border-brand focus:shadow-[var(--focus-ring-brand)] disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
