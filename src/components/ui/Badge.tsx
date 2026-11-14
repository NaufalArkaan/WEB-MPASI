import React from "react";
import { cn } from "@/lib/utils";
import { BadgeProps } from "@/types";

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-heading font-medium tracking-wide rounded-full transition-colors select-none";

  const variantStyles = {
    primary: "bg-primary-50 text-primary-700 border border-primary/20",
    secondary: "bg-secondary-100 text-primary-800 border border-secondary/30",
    accent: "bg-accent-100 text-accent-900 border border-accent/40",
    cream: "bg-cream-200 text-darkGreen border border-primary/10",
    outline: "bg-transparent text-primary-700 border border-primary/30",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3.5 py-1 gap-1.5",
    lg: "text-sm px-4 py-1.5 gap-2",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
