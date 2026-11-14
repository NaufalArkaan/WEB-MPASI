import { ReactNode } from "react";

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

// Button variants
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

// Section Heading
export interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

// Card props
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "accent" | "glass" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "xl" | "2xl" | "3xl";
}

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

