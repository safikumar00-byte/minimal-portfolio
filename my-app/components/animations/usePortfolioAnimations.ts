"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered only in the browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type AnimationOptions = {
  scopeRef?: React.RefObject<HTMLElement | null>;
  enableEntrance?: boolean;
  enableScrollTriggers?: boolean;
};

/**
 * Custom hook to orchestrate restrained, editorial GSAP animations across
 * page entrances, scroll reveals, and interactive elements.
 */
export function usePortfolioAnimations(
  containerRef: React.RefObject<HTMLElement | null>,
  options: AnimationOptions = { enableEntrance: true, enableScrollTriggers: true }
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced-motion preferences
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial Page Entrance Animations
      if (options.enableEntrance !== false) {
        const entranceTargets = el.querySelectorAll<HTMLElement>(
          "[data-animate='entrance'], .project-card, .project-info-sidebar, .project-section-navigation"
        );

        if (entranceTargets.length > 0) {
          gsap.fromTo(
            entranceTargets,
            {
              opacity: 0,
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "transform,opacity",
            }
          );
        }
      }

      // 2. Scroll-Triggered Section & Content Reveals
      if (options.enableScrollTriggers !== false) {
        const scrollSections = el.querySelectorAll<HTMLElement>(
          "section[id], .case-study-flow-tab-content, .flow-step-card, .state-card"
        );

        scrollSections.forEach((section) => {
          gsap.fromTo(
            section,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // Staggered reveal for two-up and three-up images
        const imageCompositions = el.querySelectorAll<HTMLElement>(
          ".phone-mockup-wrapper, .desktop-mockup-wrapper"
        );

        if (imageCompositions.length > 0) {
          imageCompositions.forEach((img) => {
            gsap.fromTo(
              img,
              {
                opacity: 0,
                y: 16,
                scale: 0.98,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: img,
                  start: "top 90%",
                  once: true,
                },
              }
            );
          });
        }
      }
    }, containerRef);

    return () => {
      ctx.revert(); // Complete, clean cleanup of GSAP timelines & ScrollTriggers
    };
  }, [containerRef, options.enableEntrance, options.enableScrollTriggers]);
}

export default usePortfolioAnimations;
