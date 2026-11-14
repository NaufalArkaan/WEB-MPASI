"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackToTopProps } from "@/types";

/**
 * Reusable BackToTop Floating Button for MPASI SMART
 * 
 * Features:
 * - Appears smoothly when scrolled past `threshold` (default: 300px)
 * - Automatically fades out and becomes non-interactive when near top
 * - High-performance scroll listener using requestAnimationFrame & passive flag
 * - Native smooth scrolling (`window.scrollTo({ top: 0, behavior: 'smooth' })`)
 * - Non-intrusive floating position with floating elevation shadow
 * - Accessible aria-label and keyboard focus ring
 */
export const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  smooth = true,
  className,
  ariaLabel = "Kembali ke bagian atas halaman",
  showLabel = false,
  label = "Ke Atas",
  bottomOffset,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Performant scroll listener using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          setIsVisible(scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }, [smooth]);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={ariaLabel}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        "fixed right-5 sm:right-8 z-40 flex items-center gap-2 rounded-2xl bg-primary text-white p-3 sm:p-3.5 shadow-floating border border-white/20 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:bg-primary-600 hover:-translate-y-1 active:scale-95 group",
        bottomOffset || "bottom-6 sm:bottom-8",
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none",
        className
      )}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      {showLabel && (
        <span className="text-xs font-heading font-semibold pr-1">
          {label}
        </span>
      )}
    </button>
  );
};

export default BackToTop;

