import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { CardProps } from "@/types";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      rounded = "3xl",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "transition-all duration-300 relative overflow-hidden";

    const variantStyles = {
      default:
        "bg-white border border-primary/15 shadow-card hover:shadow-card-hover",
      elevated:
        "bg-white border border-primary/10 shadow-soft-md hover:shadow-soft-lg hover:-translate-y-1",
      accent:
        "bg-gradient-to-br from-white to-accent-50 border border-accent/40 shadow-card hover:shadow-card-hover",
      glass:
        "bg-white/80 backdrop-blur-md border border-white/60 shadow-soft",
      outline:
        "bg-transparent border-2 border-primary/20 hover:border-primary/40",
    };

    const paddingStyles = {
      none: "p-0",
      sm: "p-4 sm:p-5",
      md: "p-6 sm:p-7",
      lg: "p-8 sm:p-10",
    };

    const roundedStyles = {
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          roundedStyles[rounded],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;

