"use client";

import { SearchInput } from "./SearchInput";
import type { SearchInputProps } from "@/types";

/**
 * Re-export of SearchInput as SearchBar for seamless backward compatibility.
 * Allows members of the team (like Robi in Recipes.tsx) to import either SearchBar or SearchInput.
 */
export const SearchBar = SearchInput;
export type { SearchInputProps as SearchBarProps };
export default SearchInput;
