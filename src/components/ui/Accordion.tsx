"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccordionProps } from "@/types";

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-3.5", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border transition-all duration-200 overflow-hidden",
              isOpen
                ? "bg-white border-primary/25 shadow-soft-md"
                : "bg-white/80 border-primary/10 hover:border-primary/20 hover:bg-white"
            )}
          >
            <button
              id={headerId}
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-4 p-5 text-left font-heading font-semibold text-darkGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            >
              <div className="flex items-center gap-3">
                {item.category && (
                  <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-secondary-100 text-primary-700 shrink-0">
                    {item.category}
                  </span>
                )}
                <span className="text-sm sm:text-base leading-snug">{item.title}</span>
              </div>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200",
                  isOpen
                    ? "bg-primary text-white rotate-180"
                    : "bg-cream-100 text-darkGreen-300"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                "transition-all duration-300 ease-in-out px-5",
                isOpen ? "pb-5 pt-1 block opacity-100" : "hidden opacity-0"
              )}
            >
              <div className="text-xs sm:text-sm text-darkGreen-300 font-body leading-relaxed border-t border-primary/10 pt-3.5">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
