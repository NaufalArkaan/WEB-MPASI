import { ReactNode } from "react";

// ==========================================
// 1. NAVIGATION TYPES
// ==========================================
export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

// ==========================================
// 2. UI COMPONENT PROPS (Syahrial & Shared)
// ==========================================
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

export interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "accent" | "glass" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "xl" | "2xl" | "3xl";
}

// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

// Accordion Types
export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
  category?: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

// Badge Props
export type BadgeVariant = "primary" | "secondary" | "accent" | "cream" | "outline" | "success" | "warning";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
}

// SearchBar Props
export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

// Tabs Props
export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

// ==========================================
// 3. SECTION DOMAIN DATA TYPES
// ==========================================

// About MPASI Card
export interface AboutCardItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullContent: string[];
  reference: string;
  iconName: "book" | "heart" | "clock" | "shield" | "activity";
  badgeText: string;
}

// Readiness Signs
export interface ReadinessSign {
  sign: string;
  description: string;
  why: string;
}

// Age Group Identifier
export type AgeGroupId = "6-8" | "9-11" | "12-23";

// Age Stage Data
export interface AgeStage {
  id: AgeGroupId;
  age: string;
  title?: string;
  texture: string;
  frequency: string;
  portion: string;
  foods: string;
  tips: string[];
}

// Nutrition Data
export interface NutritionItem {
  id: string;
  name: string;
  role: string;
  sources: string;
  note: string;
  iconName?: string;
  foods: string[];
  color: string;
  category?: string;
}

// Recipe Nutrition Facts
export interface RecipeNutrition {
  calories?: string;
  protein?: string;
  iron?: string;
  fat?: string;
  carbs?: string;
}

// Recipe Data (Robi)
export interface Recipe {
  id: string;
  name: string;
  image: string;
  ageGroup: AgeGroupId;
  ageLabel?: string;
  texture: string;
  duration: string;
  portion: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  allergens: string[];
  nutrition?: RecipeNutrition;
  tips?: string;
  isFeatured?: boolean;
}

// Food Safety Step
export interface FoodSafetyStep {
  id: string;
  title: string;
  description: string;
  iconName: string;
  stepNumber: number;
}

// FAQ Data
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Reference Data
export interface ReferenceItem {
  id: string;
  title: string;
  publisher: string;
  year: string;
  description: string;
  href: string;
  linkLabel: string;
  type?: string;
}

// Footer link group
export interface FooterLinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
    badge?: string;
    isExternal?: boolean;
  }[];
}
