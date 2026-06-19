import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
import { portalUiButtonWeight, portalUiText13, portalUiText14 } from "../lib/portal-typography";

const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md ${portalUiText14} ${portalUiButtonWeight} transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-brand)] disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:opacity-90 disabled:bg-brand-disabled disabled:text-white disabled:opacity-100",
        outline:
          "border border-gray-border-strong bg-background text-gray-text-2 hover:border-brand",
        ghost: "text-gray-text-4 hover:bg-gray-fill-normal",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4",
        sm: `h-8 px-3 ${portalUiText13}`,
        lg: "h-10 px-6",
        icon: "size-9",
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
