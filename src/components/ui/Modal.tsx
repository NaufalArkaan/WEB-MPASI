"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModalProps } from "@/types";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "lg",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      // Focus modal container
      const timer = setTimeout(() => {
        modalRef.current?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-darkGreen/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={cn(
          "relative w-full rounded-3xl bg-white shadow-floating border border-primary/15 p-6 sm:p-8 z-10 my-8 overflow-hidden animate-slide-up focus:outline-none max-h-[90vh] flex flex-col",
          maxWidthStyles[maxWidth]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-primary/10 shrink-0">
          <div>
            {title && (
              <h3
                id="modal-title"
                className="font-heading text-xl sm:text-2xl font-bold text-darkGreen leading-tight"
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                id="modal-description"
                className="mt-1 text-xs sm:text-sm text-darkGreen-300 font-body"
              >
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 -mt-2 rounded-2xl text-darkGreen-400 hover:text-darkGreen hover:bg-cream-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Tutup jendela modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="mt-5 overflow-y-auto pr-1 flex-1 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
