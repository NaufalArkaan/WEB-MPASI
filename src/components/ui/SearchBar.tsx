"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBarProps } from "@/types";

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Cari menu atau bahan MPASI...",
  className,
  id = "search-input",
}) => {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-darkGreen-300">
        <Search className="w-4 h-4 text-primary" aria-hidden="true" />
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm font-body bg-white border border-primary/20 rounded-2xl text-darkGreen placeholder-darkGreen-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            if (onClear) onClear();
          }}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-darkGreen-300 hover:text-darkGreen transition-colors focus:outline-none"
          aria-label="Hapus kata kunci pencarian"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
