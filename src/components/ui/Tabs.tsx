"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TabsProps } from "@/types";

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    onChange(tabs[newIndex].id);
    const targetElement = document.getElementById(`tab-btn-${tabs[newIndex].id}`);
    targetElement?.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "flex items-center gap-1.5 p-1.5 bg-cream-200/80 rounded-2xl border border-primary/10 overflow-x-auto",
        className
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isActive
                ? "bg-white text-primary shadow-soft border border-primary/15"
                : "text-darkGreen-300 hover:text-darkGreen hover:bg-white/50"
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "bg-cream-100 text-darkGreen-300"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
