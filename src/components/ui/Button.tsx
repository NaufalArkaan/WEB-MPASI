"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";

/**
 * Reusable Button Component for MPASI SMART Design System
 * 
 * Supports:
 * - Variants: primary (#52765B), secondary (#A9C4A8), accent (#E8B88D), outline, ghost, cream (#F7F4EA)
 * - Sizes: sm, md, lg
 * - Dual mode: renders as <button> or <a> if `href` is provided
 * - Loading state with spinner
 * - Left and right icons with smooth hover transitions
 * - Accessible focus rings & keyboard navigation
 */
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
      isLoading = false,
      children,
      disabled,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const baseStyles =
      "inline-flex items-center justify-center font-heading font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-primary text-white hover:bg-primary-600 active:bg-primary-700 shadow-soft hover:shadow-soft-md",
      secondary:
        "bg-secondary text-darkGreen hover:bg-secondary-600 active:bg-secondary-700 shadow-soft hover:shadow-soft-md",
      accent:
        "bg-accent text-darkGreen font-semibold hover:bg-accent-600 active:bg-accent-700 shadow-soft hover:shadow-soft-md",
      outline:
        "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/15",
      ghost:
        "text-primary bg-transparent hover:bg-primary/10 active:bg-primary/15",
      cream:
        "bg-cream-100 text-darkGreen border border-primary/20 hover:bg-cream-200 active:bg-cream-300 shadow-soft",
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

    // If href is passed, render semantic <a> link CTA
    if (href) {
      return (
        <a
          href={isDisabled ? undefined : href}
          className={combinedClassName}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            if (onClick) {
              onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
            }
          }}
          aria-disabled={isDisabled}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
          ) : (
            iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>
          )}
          <span>{children}</span>
          {!isLoading && iconRight && (
            <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">
              {iconRight}
            </span>
          )}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={combinedClassName}
        onClick={onClick}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>
        )}
        <span>{children}</span>
        {!isLoading && iconRight && (
          <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
