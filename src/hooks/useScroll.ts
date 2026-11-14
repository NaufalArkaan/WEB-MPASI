"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Mapping of internal section IDs to primary navbar navigation items
const SECTION_NAV_MAP: Record<string, string> = {
  home: "home",
  about: "about",
  principles: "about",
  stages: "stages",
  nutrition: "nutrition",
  recipes: "recipes",
  safety: "recipes",
  faq: "faq",
  references: "faq",
};

const ALL_SECTION_IDS = [
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

/**
 * Reusable scroll interaction hook for MPASI SMART
 * 
 * Provides:
 * - `scrolled`: boolean indicating if page is scrolled beyond `threshold` (default 20px)
 * - `activeSection`: currently visible navbar section ID (home, about, stages, nutrition, recipes, faq)
 * - `scrollY`: current vertical scroll offset
 * - `scrollToTop()`: smooth scrolling to top
 * - `scrollToSection(id, updateHash)`: smooth scrolling to section with sticky navbar offset compensation
 */
export function useScroll(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollY, setScrollY] = useState(0);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Monitor scroll position for navbar background and general scrollY
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.pageYOffset || document.documentElement.scrollTop;
          setScrollY(currentY);
          setScrolled(currentY > threshold);

          // Top boundary condition
          if (currentY < 90) {
            setActiveSection("home");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  // 2. High accuracy IntersectionObserver to track active section
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry with the highest intersection ratio or topmost visible
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Sort by visibility ratio or vertical position
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topEntry = visibleEntries[0];
        const sectionId = topEntry.target.id;
        const mappedNav = SECTION_NAV_MAP[sectionId] || sectionId;

        // If at top of page, home takes priority
        const currentY = window.pageYOffset || document.documentElement.scrollTop;
        if (currentY < 120) {
          setActiveSection("home");
          return;
        }

        // If at bottom of page, faq/references takes priority
        if (window.innerHeight + currentY >= document.documentElement.scrollHeight - 60) {
          setActiveSection("faq");
          return;
        }

        setActiveSection(mappedNav);
      }
    };

    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 84;

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: `-${headerHeight}px 0px -40% 0px`,
      threshold: [0.1, 0.25, 0.5],
    });

    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 3. Scroll to top utility
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  }, []);

  // 4. Scroll to section with sticky navbar offset and URL hash update
  const scrollToSection = useCallback((sectionId: string, updateHash = true) => {
    const id = sectionId.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      const header = document.querySelector("header");
      const navOffset = (header ? header.offsetHeight : 84) + 10;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });

      // Update URL hash cleanly
      if (updateHash) {
        const targetHash = `#${id}`;
        if (window.location.hash !== targetHash) {
          window.history.pushState(null, "", targetHash);
        }
      }

      // Update active nav state immediately
      const mapped = SECTION_NAV_MAP[id] || id;
      setActiveSection(mapped);
    }
  }, []);

  return {
    scrolled,
    activeSection,
    scrollY,
    scrollToTop,
    scrollToSection,
  };
}

export default useScroll;
