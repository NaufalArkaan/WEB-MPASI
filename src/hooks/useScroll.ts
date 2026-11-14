"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Reusable scroll interaction hook for MPASI SMART
 * 
 * Provides:
 * - `scrolled`: boolean indicating if page is scrolled beyond `threshold`
 * - `activeSection`: currently visible section ID (home, about, principles, stages, etc.)
 * - `scrollY`: numerical current vertical scroll offset
 * - `scrollToTop()`: function for smooth scrolling to top
 * - `scrollToSection(id)`: function for smooth scrolling to a specific section with navbar offset
 * 
 * Uses passive event listeners and requestAnimationFrame for 60fps performance.
 */
export function useScroll(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.pageYOffset || document.documentElement.scrollTop;
          setScrollY(currentY);
          setScrolled(currentY > threshold);

          // Track active section
          const sections = [
            "home",
            "about",
            "principles",
            "stages",
            "nutrition",
            "recipes",
            "safety",
            "faq",
            "references",
          ];
          const scrollPosition = currentY + 140; // 140px offset for sticky header

          for (let i = sections.length - 1; i >= 0; i--) {
            const sectionId = sections[i];
            const element = document.getElementById(sectionId);
            if (element) {
              const top = element.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(sectionId);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollToSection = useCallback((sectionId: string, offset = 84) => {
    const id = sectionId.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrolled, activeSection, scrollY, scrollToTop, scrollToSection };
}

export default useScroll;
