"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TabsProps, TabItem } from "@/types";

/**
 * Reusable Tabs Component for MPASI SMART
 * 
 * Used for:
 * 1. Age Stages (6–8 bulan, 9–11 bulan, 12–23 bulan)
 * 2. Recipe Catalog Age Filtering (Semua, 6–8, 9–11, 12–23)
 * 3. Educational Guides & Multi-topic Switchers
 * 
 * Features:
 * - Structured useState supporting both Controlled and Uncontrolled modes
 * - Automatic Tabpanel rendering when `tab.content` is supplied
 * - Full WAI-ARIA tab pattern (ArrowLeft, ArrowRight, Home, End keyboard nav)
 * - Mobile horizontal scrolling container
 * - Badge and icon indicators
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  className,
  renderContent = false,
  variant = "pills",
  fullWidth = false,
}) => {
  // Structured internal state for uncontrolled usage
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    controlledActiveTab || defaultTab || tabs[0]?.id || ""
  );

  // Determine current active tab
  const currentActiveTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabSelect = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

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
    const nextTab = tabs[newIndex];
    if (nextTab && !nextTab.disabled) {
      handleTabSelect(nextTab.id);
      const targetElement = document.getElementById(`tab-btn-${nextTab.id}`);
      targetElement?.focus();
    }
  };

  const activeItem = tabs.find((t) => t.id === currentActiveTab) || tabs[0];

  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      {/* Tab Navigation List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          "flex items-center gap-1.5 p-1.5 rounded-2xl overflow-x-auto select-none no-scrollbar",
          variant === "pills" && "bg-cream-200/80 border border-primary/10",
          variant === "underlined" && "border-b border-primary/20 bg-transparent rounded-none px-0 gap-4",
          variant === "cards" && "bg-transparent gap-2.5",
          fullWidth ? "w-full justify-stretch" : "w-fit"
        )}
      >
        {tabs.map((tab, idx) => {
          const isActive = currentActiveTab === tab.id;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              type="button"
              role="tab"
              disabled={isDisabled}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabSelect(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                fullWidth && "flex-1",
                isDisabled && "opacity-40 cursor-not-allowed",
                variant === "pills" &&
                  (isActive
                    ? "bg-white text-primary shadow-soft border border-primary/15"
                    : "text-darkGreen-300 hover:text-darkGreen hover:bg-white/50"),
                variant === "underlined" &&
                  (isActive
                    ? "text-primary border-b-2 border-primary rounded-none pb-2 font-bold"
                    : "text-darkGreen-300 hover:text-darkGreen rounded-none pb-2"),
                variant === "cards" &&
                  (isActive
                    ? "bg-primary text-white shadow-soft"
                    : "bg-white text-darkGreen-300 hover:text-darkGreen border border-primary/10")
              )}
            >
              {tab.icon && (
                <span className={cn(isActive ? "text-primary" : "text-darkGreen-300")}>
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors",
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

      {/* Render active content if requested or provided */}
      {renderContent && activeItem && activeItem.content && (
        <div
          id={`panel-${activeItem.id}`}
          role="tabpanel"
          aria-labelledby={`tab-btn-${activeItem.id}`}
          tabIndex={0}
          className="focus:outline-none animate-fade-in"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
