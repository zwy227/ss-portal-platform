import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
import { portalUiFieldWeight, portalUiText14 } from "../lib/portal-typography";

const inputVariants = cva(
  `flex w-full ${portalUiText14} ${portalUiFieldWeight} text-gray-text-2 outline-none transition placeholder:font-normal placeholder:text-gray-text-7 disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      focusStyle: {
        field:
          "h-9 rounded-input border border-gray-border-strong bg-background px-3 hover:border-gray-border-emphasis focus:border-gray-border-black focus:shadow-focus-normal",
        shell:
          "h-full border-0 bg-transparent shadow-none hover:border-0 focus:border-0 focus:shadow-none",
      },
    },
    defaultVariants: {
      focusStyle: "field",
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
