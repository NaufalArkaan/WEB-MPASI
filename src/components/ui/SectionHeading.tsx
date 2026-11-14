import React from "react";
import { cn } from "@/lib/utils";
import { SectionHeadingProps } from "@/types";

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = "center",
  className,
}) => {
  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-10 sm:mb-14",
        alignmentStyles[align],
        className
      )}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-100 border border-primary/20 text-primary-700 text-xs sm:text-sm font-heading font-medium tracking-wide mb-3 shadow-sm">
          {badgeIcon && <span className="text-primary-600">{badgeIcon}</span>}
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-darkGreen tracking-tight leading-snug sm:leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-darkGreen-300 font-body leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      <div
        className={cn(
          "mt-4 h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full",
          align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
        )}
        aria-hidden="true"
      />
    </div>
  );
};

export default SectionHeading;

