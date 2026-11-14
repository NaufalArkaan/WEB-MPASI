"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModalProps } from "@/types";

/**
 * Reusable Modal Component for MPASI SMART
 * 
 * Used across the application for:
 * 1. Recipe Details & Portion Breakdown (Robi)
 * 2. Nutrition In-depth Profiles & Deficiencies (Juan)
 * 3. MPASI Principles Detailed Guidelines (Juan & Arkaan)
 * 
 * Features:
 * - Body scroll lock with clean state restoration
 * - Escape key dismissal
 * - Backdrop click dismissal (safe mouse down/up check)
 * - Accessible focus trap & restoration to previous element
 * - Mobile responsive bottom-sheet/centered layout
 * - WAI-ARIA dialog attributes
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "lg",
  className,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  footer,
  ariaLabel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const mouseDownTarget = useRef<EventTarget | null>(null);

  // Close on Escape key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!closeOnEscape) return;

      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      // Basic Accessible Focus Trap (Keep focus cycling inside dialog)
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
        );

        if (focusable.length > 0) {
          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [closeOnEscape, onClose]
  );

  // Background body scroll lock and focus management
  useEffect(() => {
    if (!isOpen) return;

    // Save currently focused element to restore when modal closes
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus on the modal container or the close button
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);

      // Restore focus
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const maxWidthStyles: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    full: "max-w-5xl",
  };

  const handleBackdropMouseDown = (e: React.MouseEvent) => {
    mouseDownTarget.current = e.target;
  };

  const handleBackdropMouseUp = (e: React.MouseEvent) => {
    // Only close if the mouse started AND finished on the backdrop itself
    if (
      closeOnBackdrop &&
      mouseDownTarget.current === e.currentTarget &&
      e.target === e.currentTarget
    ) {
      onClose();
    }
    mouseDownTarget.current = null;
  };

  const titleId = title ? "modal-dialog-title" : undefined;
  const descriptionId = description ? "modal-dialog-description" : undefined;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-label={!title ? ariaLabel || "Jendela dialog modal" : undefined}
    >
      {/* Backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-darkGreen/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onMouseDown={handleBackdropMouseDown}
        onMouseUp={handleBackdropMouseUp}
        aria-hidden="true"
      />

      {/* Modal Card Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={cn(
          "relative w-full rounded-t-3xl sm:rounded-3xl bg-white shadow-floating border border-primary/15 p-5 sm:p-7 md:p-8 z-10 overflow-hidden animate-slide-up focus:outline-none max-h-[92vh] sm:max-h-[88vh] flex flex-col",
          maxWidthStyles[maxWidth] || maxWidthStyles.lg,
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-primary/10 shrink-0">
          <div className="pr-2">
            {title && (
              <h3
                id={titleId}
                className="font-heading text-lg sm:text-2xl font-bold text-darkGreen leading-tight tracking-tight"
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                id={descriptionId}
                className="mt-1.5 text-xs sm:text-sm text-darkGreen-300 font-body leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-1.5 -mt-1.5 rounded-2xl text-darkGreen-400 hover:text-darkGreen hover:bg-cream-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
              aria-label="Tutup jendela modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Scrollable Body Content */}
        <div className="mt-5 overflow-y-auto pr-1 flex-1 space-y-4 focus:outline-none text-darkGreen">
          {children}
        </div>

        {/* Optional Footer Slot */}
        {footer && (
          <div className="mt-5 pt-4 border-t border-primary/10 flex items-center justify-end gap-3 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
