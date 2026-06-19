import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
import { portalUiText14 } from "../lib/portal-typography";

const inputVariants = cva(
  `flex w-full ${portalUiText14} text-gray-text-2 outline-none transition placeholder:font-medium placeholder:text-gray-text-7 disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      focusStyle: {
        brand:
          "h-9 rounded-input border border-gray-border-strong bg-background px-3 hover:border-brand focus:border-brand focus:shadow-[var(--focus-ring-brand)]",
        shell:
          "h-full border-0 bg-transparent font-medium shadow-none hover:border-0 focus:border-0 focus:shadow-none",
      },
    },
    defaultVariants: {
      focusStyle: "brand",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, focusStyle, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ focusStyle }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
