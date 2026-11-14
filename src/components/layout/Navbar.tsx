"use client";

import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ArrowRight, 
  HeartHandshake, 
  BookOpen, 
  Baby, 
  Apple, 
  ChefHat, 
  HelpCircle,
  Home
} from "lucide-react";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { NavItem } from "@/types";

const NAV_ITEMS: (NavItem & { icon: React.ReactNode })[] = [
  { label: "Beranda", href: "#home", icon: <Home className="w-4 h-4" /> },
  { label: "Tentang MPASI", href: "#about", icon: <HeartHandshake className="w-4 h-4" /> },
  { label: "Panduan", href: "#stages", icon: <BookOpen className="w-4 h-4" /> },
  { label: "Nutrisi", href: "#nutrition", icon: <Apple className="w-4 h-4" /> },
  { label: "Resep", href: "#recipes", icon: <ChefHat className="w-4 h-4" /> },
  { label: "FAQ", href: "#faq", icon: <HelpCircle className="w-4 h-4" /> },
];

export const Navbar: React.FC = () => {
  const { scrolled, activeSection, scrollToSection } = useScroll(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle URL hash on initial page load (e.g. /#recipes)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      // Slight timeout to ensure full DOM layout is computed
      const timer = setTimeout(() => {
        scrollToSection(hashId, false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [scrollToSection]);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    scrollToSection(targetId, true);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-40 transition-all duration-300 w-full",
          scrolled
            ? "glass-navbar py-3 shadow-soft"
            : "bg-cream/95 backdrop-blur-sm py-4 sm:py-5 border-b border-primary/10"
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            aria-label="MPASI SMART - Kembali ke Beranda"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-primary to-primary-600 flex items-center justify-center text-white shadow-soft group-hover:shadow-soft-md group-hover:scale-105 transition-all duration-200">
              <Baby className="w-5 h-5 sm:w-6 sm:h-6 text-accent-200" strokeWidth={2.2} aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-darkGreen tracking-tight leading-none group-hover:text-primary transition-colors">
                MPASI <span className="text-primary font-extrabold">SMART</span>
              </span>
              <span className="text-[10px] sm:text-xs font-body text-darkGreen-300 font-medium tracking-wider uppercase mt-1">
                Edukasi Bayi 6–23 Bulan
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-primary/15 shadow-sm"
            aria-label="Navigasi Utama"
          >
            {NAV_ITEMS.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-heading font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "bg-primary text-white shadow-sm font-semibold"
                      : "text-darkGreen-400 hover:text-darkGreen hover:bg-secondary/20"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="#stages"
              variant="primary"
              size="sm"
              iconRight={<ArrowRight className="w-4 h-4" />}
              onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, "#stages")}
              className="shadow-soft hover:shadow-soft-md font-heading font-semibold"
            >
              Jelajahi Panduan
            </Button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-white border border-primary/20 text-darkGreen hover:text-primary hover:bg-secondary/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Backdrop & Sheet */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-darkGreen/50 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={cn(
            "absolute top-[72px] sm:top-[80px] right-0 left-0 max-h-[calc(100vh-80px)] overflow-y-auto bg-cream border-b border-primary/20 shadow-soft-lg p-6 transition-all duration-300 ease-out transform",
            mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-heading font-semibold text-darkGreen-300 uppercase tracking-wider px-3 mb-1">
              Navigasi Halaman
            </span>

            {NAV_ITEMS.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-heading font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-soft font-semibold"
                      : "text-darkGreen hover:bg-white hover:text-primary border border-transparent hover:border-primary/10"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className={cn(isActive ? "text-white" : "text-primary")}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-primary/15 flex flex-col gap-3">
              <Button
                href="#stages"
                variant="primary"
                size="md"
                fullWidth
                iconRight={<ArrowRight className="w-4 h-4" />}
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, "#stages")}
                className="font-heading font-semibold"
              >
                Jelajahi Panduan Lengkap
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-darkGreen-300 font-body py-1">
                <span>Rujukan Resmi:</span>
                <span className="font-semibold text-primary">WHO (2023)</span>
                <span>•</span>
                <span className="font-semibold text-primary">Buku KIA (2024)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
