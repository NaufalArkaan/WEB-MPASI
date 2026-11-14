"use client";

import React, { useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInputProps } from "@/types";

/**
 * Reusable SearchInput Component for MPASI SMART
 * 
 * Used by Robi in Recipe catalog filtering and general page search.
 * 
 * NOTE: This is a purely reusable, stateless/controlled UI component.
 * It does NOT store or mock recipe data internally; it strictly delegates
 * `value` and `onChange` to the parent component.
 * 
 * Features:
 * - Left search icon in theme primary color (#52765B)
 * - Accessible clear button ('X') displayed when value is non-empty
 * - Escape key listener to quickly clear search input
 * - Screen-reader friendly accessible label (sr-only)
 * - Size variants (sm, md, lg)
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Cari menu atau bahan MPASI...",
  className,
  id = "search-input",
  disabled = false,
  autoFocus = false,
  ariaLabel,
  size = "md",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && value) {
      e.stopPropagation();
      handleClear();
    }
  };

  const sizeClasses = {
    sm: "py-2 pl-9 pr-9 text-xs rounded-xl",
    md: "py-2.5 sm:py-3 pl-10 pr-10 text-sm rounded-2xl",
    lg: "py-3 sm:py-3.5 pl-11 pr-11 text-base rounded-2xl",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <label htmlFor={id} className="sr-only">
        {ariaLabel || placeholder}
      </label>

      {/* Leading Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-darkGreen-300">
        <Search
          className={cn("text-primary", iconSizes[size])}
          aria-hidden="true"
        />
      </div>

      {/* Input element */}
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
        className={cn(
          "w-full font-body bg-white border border-primary/20 text-darkGreen placeholder-darkGreen-300 shadow-sm transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          "hover:border-primary/40",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-cream-100",
          sizeClasses[size]
        )}
      />

      {/* Trailing Clear Button */}
      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-darkGreen-300 hover:text-darkGreen transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg my-auto h-fit p-1"
          aria-label="Hapus kata kunci pencarian"
          title="Hapus pencarian (Esc)"
        >
          <X className={iconSizes[size]} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;

