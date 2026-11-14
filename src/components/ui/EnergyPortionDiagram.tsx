"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flame } from "lucide-react";
import Card from "@/components/ui/Card";

interface StageData {
  ageLabel: string;
  targetAsi: number;
  targetMpasi: number;
}

const STAGES: StageData[] = [
  {
    ageLabel: "Usia 6–8 Bulan",
    targetAsi: 70,
    targetMpasi: 30,
  },
  {
    ageLabel: "Usia 9–11 Bulan",
    targetAsi: 50,
    targetMpasi: 50,
  },
  {
    ageLabel: "Usia 12–23 Bulan",
    targetAsi: 30,
    targetMpasi: 70,
  },
];

interface EnergyPortionDiagramProps {
  className?: string;
}

export const EnergyPortionDiagram: React.FC<EnergyPortionDiagramProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isIntersected, setIsIntersected] = useState(false);
  const [counts, setCounts] = useState([
    { asi: 0, mpasi: 0 },
    { asi: 0, mpasi: 0 },
    { asi: 0, mpasi: 0 },
  ]);

  useEffect(() => {
    if (hasAnimated) return;

    const el = containerRef.current;
    if (!el) return;

    // 1. Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsIntersected(true);
      setHasAnimated(true);
      setCounts([
        { asi: 70, mpasi: 30 },
        { asi: 50, mpasi: 50 },
        { asi: 30, mpasi: 70 },
      ]);
      return;
    }

    // 2. Fallback if IntersectionObserver is not supported
    if (typeof IntersectionObserver === "undefined") {
      setIsIntersected(true);
      setHasAnimated(true);
      setCounts([
        { asi: 70, mpasi: 30 },
        { asi: 50, mpasi: 50 },
        { asi: 30, mpasi: 70 },
      ]);
      return;
    }

    // 3. Setup IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect(); // Avoid repeating animation on re-render

          // Double rAF ensures the browser paints the 0% initial state first
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsIntersected(true);

              // Smooth 1200ms count-up animation for percentage numbers
              const duration = 1200;
              const startTime = performance.now();

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic: 1 - (1 - t)^3
                const easeOut = 1 - Math.pow(1 - progress, 3);

                setCounts([
                  {
                    asi: Math.round(70 * easeOut),
                    mpasi: Math.round(30 * easeOut),
                  },
                  {
                    asi: Math.round(50 * easeOut),
                    mpasi: Math.round(50 * easeOut),
                  },
                  {
                    asi: Math.round(30 * easeOut),
                    mpasi: Math.round(70 * easeOut),
                  },
                ]);

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  // Guarantee exact final numbers
                  setCounts([
                    { asi: 70, mpasi: 30 },
                    { asi: 50, mpasi: 50 },
                    { asi: 30, mpasi: 70 },
                  ]);
                }
              };

              requestAnimationFrame(animate);
            });
          });
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <Card ref={containerRef} variant="accent" padding="md" rounded="3xl" className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-accent-700" />
          <span className="font-heading font-bold text-sm text-darkGreen">
            Porsi Energi: ASI vs MPASI
          </span>
        </div>
        <span className="text-[11px] font-semibold text-primary uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-primary/10">
          WHO 2023
        </span>
      </div>

      <div className="space-y-4 text-xs font-body">
        {STAGES.map((stage, idx) => {
          const count = counts[idx];
          const asiWidth = isIntersected ? `${stage.targetAsi}%` : "0%";
          const mpasiWidth = isIntersected ? `${stage.targetMpasi}%` : "0%";

          return (
            <div key={stage.ageLabel}>
              <div className="flex justify-between font-heading font-medium text-darkGreen mb-1.5">
                <span>{stage.ageLabel}</span>
                <span className="text-primary font-bold">
                  {/* Static accessible text for SEO & Screen Readers */}
                  <span className="sr-only">
                    ASI {stage.targetAsi}% • MPASI {stage.targetMpasi}%
                  </span>
                  {/* Gradual visual count-up */}
                  <span
                    aria-hidden="true"
                    className={`transition-opacity duration-700 ${
                      isIntersected ? "opacity-100" : "opacity-20"
                    }`}
                  >
                    ASI {count.asi}% • MPASI {count.mpasi}%
                  </span>
                </span>
              </div>
              <div className="w-full h-3 bg-secondary-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-primary rounded-l-full transition-[width] duration-[1200ms] ease-out motion-reduce:transition-none"
                  style={{ width: asiWidth }}
                  title={`ASI ${stage.targetAsi}%`}
                />
                <div
                  className="h-full bg-accent rounded-r-full transition-[width] duration-[1200ms] ease-out motion-reduce:transition-none"
                  style={{ width: mpasiWidth }}
                  title={`MPASI ${stage.targetMpasi}%`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-accent/20 flex items-center justify-between text-[11px] text-darkGreen-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
          <span>ASI Lanjut</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
          <span>Makanan Pendamping</span>
        </div>
      </div>
    </Card>
  );
};

export default EnergyPortionDiagram;
