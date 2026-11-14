"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccordionProps } from "@/types";

/**
 * Reusable Accordion Component for MPASI SMART
 * 
 * Used for FAQ (Pertanyaan yang Sering Diajukan) and interactive collapsible sections.
 * 
 * Features:
 * - Fluid expand/collapse animation using CSS Grid (no hardcoded heights)
 * - Rotating animated chevron icon
 * - Supports single-expanded or multi-expanded (allowMultiple={true})
 * - Accessible keyboard navigation (ArrowUp, ArrowDown, Home, End)
 * - Category badge and custom icon support
 * - Mobile responsive padding and typography
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  defaultOpenIds,
  allowMultiple = false,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultOpenIds && defaultOpenIds.length > 0) return defaultOpenIds;
    if (defaultOpenId) return [defaultOpenId];
    return [];
  });

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    if (e.key === "ArrowDown") {
      nextIndex = (index + 1) % items.length;
    } else if (e.key === "ArrowUp") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextItem = items[nextIndex];
    if (nextItem) {
      document.getElementById(`accordion-header-${nextItem.id}`)?.focus();
    }
  };

  return (
    <div className={cn("space-y-3.5", className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border transition-all duration-200 overflow-hidden",
              isOpen
                ? "bg-white border-primary/30 shadow-soft-md"
                : "bg-white/90 border-primary/10 hover:border-primary/20 hover:bg-white"
            )}
          >
            {/* Accordion Trigger Header */}
            <button
              id={headerId}
              type="button"
              disabled={item.disabled}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={cn(
                "w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-heading font-semibold text-darkGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset transition-colors",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3 pr-2">
                {item.icon && (
                  <span className="text-primary shrink-0">{item.icon}</span>
                )}
                {item.category && (
                  <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-secondary-100 text-primary-700 shrink-0">
                    {item.category}
                  </span>
                )}
                <span className="text-sm sm:text-base leading-snug">
                  {item.title}
                </span>
              </div>

              {/* Animated Chevron Indicator */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                  isOpen
                    ? "bg-primary text-white rotate-180 shadow-soft"
                    : "bg-cream-100 text-darkGreen-300 hover:text-darkGreen"
                )}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Accordion Collapsible Panel */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="text-xs sm:text-sm text-darkGreen-300 font-body leading-relaxed border-t border-primary/10 pt-3.5 pb-5 px-4 sm:px-5">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
