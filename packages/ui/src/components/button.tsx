import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
import {
  portalUiButtonWeight,
  portalUiText12,
  portalUiText13,
  portalUiText14,
} from "../lib/portal-typography";

const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap ${portalUiText14} ${portalUiButtonWeight} transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-brand)] disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:opacity-90 disabled:bg-brand-disabled disabled:text-white disabled:opacity-100",
        black:
          "bg-gray-text-1 text-white hover:opacity-90 disabled:bg-gray-text-7 disabled:text-white disabled:opacity-100",
        outline:
          "border border-gray-border-strong bg-background text-gray-text-2 hover:border-gray-border-emphasis disabled:border-gray-border-light disabled:text-gray-text-7",
        ghost:
          "text-gray-text-4 hover:bg-gray-fill-normal disabled:text-gray-text-7 disabled:hover:bg-transparent",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        /** 24px 高 · 12px 字 */
        xs: `h-6 gap-1 rounded-button-xs px-2 ${portalUiText12}`,
        sm: `h-8 rounded-button-sm px-3 ${portalUiText13}`,
        default: "h-9 rounded-btn px-4",
        lg: "h-10 rounded-button-lg px-6",
        /** 与对应文字档同高的纯图标按钮 */
        "icon-xs": "size-6 rounded-button-xs",
        "icon-sm": "size-8 rounded-button-sm",
        icon: "size-9 rounded-btn",
        "icon-lg": "size-10 rounded-button-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
