"use client";

import * as React from "react";

export interface ScreenCategoryNavItem {
  id: string; // section anchor id, e.g. "cat-onboarding"
  label: string; // e.g. "Onboarding"
  count?: number; // e.g. 3
}

export interface ScreenCategoryNavigationProps {
  categories: ScreenCategoryNavItem[];
  title?: string;
  className?: string;
}

export default function ScreenCategoryNavigation({
  categories = [],
  title = "APPLICATION SCREENS",
  className = "",
}: ScreenCategoryNavigationProps) {
  const [activeId, setActiveId] = React.useState<string>(categories?.[0]?.id ?? "");

  // IntersectionObserver to observe category section headers
  React.useEffect(() => {
    if (categories.length === 0) return;

    const elements = categories
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section closest to the top offset
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - 120) -
              Math.abs(b.boundingClientRect.top - 120),
          );

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (!element) return;

    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveId(targetId);
  };

  if (categories.length === 0) return null;

  return (
    <>
      {/* Desktop Sticky Rail (Right Column) */}
      <nav
        aria-label="Application screens category index"
        className={`screen-category-navigation hidden lg:block w-full max-w-[190px] select-none ${className}`}
      >
        <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-3.5 pl-3">
          {title}
        </div>

        <div className="relative border-l border-neutral-200/80 pl-3 flex flex-col gap-2.5">
          {categories.map((cat, idx) => {
            const isActive = activeId === cat.id;
            const indexNumber = String(idx + 1).padStart(2, "0");

            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={(e) => handleScrollTo(e, cat.id)}
                aria-current={isActive ? "true" : undefined}
                className={`group relative text-xs leading-snug transition-colors duration-150 py-0.5 flex items-baseline justify-between gap-1.5 ${
                  isActive
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-500 hover:text-neutral-800 font-normal"
                }`}
              >
                {/* Active marker bar on the vertical border */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-[13px] top-0 bottom-0 w-[2px] bg-neutral-900 rounded-full"
                  />
                )}

                <span className="flex items-baseline gap-2 min-w-0">
                  <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                    {indexNumber}
                  </span>
                  <span className="truncate">{cat.label}</span>
                </span>

                {typeof cat.count === "number" && (
                  <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                    {cat.count}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile / Tablet Horizontal Scrollable Category Bar */}
      <nav
        aria-label="Quick category selector"
        className="lg:hidden w-full overflow-x-auto no-scrollbar py-3 my-4 border-y border-neutral-100 flex items-center gap-1.5 select-none sticky top-14 bg-white/95 backdrop-blur-xs z-20"
      >
        <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 shrink-0 mr-1.5">
          Folders:
        </span>
        {categories.map((cat, idx) => {
          const isActive = activeId === cat.id;
          const indexNumber = String(idx + 1).padStart(2, "0");

          return (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              onClick={(e) => handleScrollTo(e, cat.id)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-neutral-900 text-white font-medium shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <span className="text-[10px] font-mono opacity-60">
                {indexNumber}
              </span>
              <span>{cat.label}</span>
              {typeof cat.count === "number" && (
                <span className="text-[10px] font-mono opacity-50">
                  ({cat.count})
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
}
