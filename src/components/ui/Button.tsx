"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      iconLeft,
      iconRight,
      fullWidth = false,
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-heading font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-primary text-white hover:bg-primary-600 shadow-soft hover:shadow-soft-md active:bg-primary-700",
      secondary:
        "bg-secondary text-darkGreen hover:bg-secondary-600 shadow-soft hover:shadow-soft-md",
      accent:
        "bg-accent text-darkGreen font-semibold hover:bg-accent-600 shadow-soft hover:shadow-soft-md",
      outline:
        "border-2 border-primary text-primary hover:bg-primary/10 active:bg-primary/15",
      ghost:
        "text-primary hover:bg-primary/10 active:bg-primary/15",
    };

    const sizeStyles = {
      sm: "text-xs py-2 px-3.5 rounded-xl gap-1.5",
      md: "text-sm py-2.5 px-5 rounded-2xl gap-2",
      lg: "text-base py-3.5 px-7 rounded-2xl gap-2.5 shadow-md",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <a
          href={href}
          className={combinedClassName}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            if (onClick) {
              onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
            }
          }}
          aria-disabled={disabled}
        >
          {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">{iconRight}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={combinedClassName}
        onClick={onClick}
        {...props}
      >
        {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;

