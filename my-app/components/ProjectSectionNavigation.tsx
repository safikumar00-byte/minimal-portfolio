"use client";

import * as React from "react";

export type SectionNavItem = {
  id: string;
  label: string;
  count?: number;
};

export type ProjectSectionNavigationProps = {
  items: SectionNavItem[];
  className?: string;
  title?: string;
  showIndices?: boolean;
};

export default function ProjectSectionNavigation({
  items = [],
  className = "",
  title = "APPLICATION SCREENS",
  showIndices = true,
}: ProjectSectionNavigationProps) {
  const [activeId, setActiveId] = React.useState<string>(items?.[0]?.id ?? "");

  // IntersectionObserver to observe visible sections in the viewport
  React.useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting sections sorted by their position from top of viewport
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
        rootMargin: "-10% 0px -60% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Smooth scroll with header offset
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (!element) return;

    const headerOffset = 95;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveId(targetId);
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop Sticky Rail (Right Column) */}
      <nav
        aria-label="Case study navigation rail"
        className={`project-section-navigation hidden lg:block w-full max-w-[185px] select-none ${className}`}
      >
        <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-3.5 pl-3">
          {title}
        </div>

        <div className="relative border-l border-neutral-200/80 pl-3 flex flex-col gap-2.5">
          {items.map((item, idx) => {
            const isActive = activeId === item.id;
            const indexStr = String(idx + 1).padStart(2, "0");

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-xs leading-snug transition-colors duration-150 py-0.5 flex items-baseline justify-between gap-1.5 ${
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
                  {showIndices && (
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                      {indexStr}
                    </span>
                  )}
                  <span className="truncate">{item.label}</span>
                </span>

                {typeof item.count === "number" && (
                  <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                    {item.count}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile / Tablet Horizontal Navigation Rail */}
      <nav
        aria-label="Quick jump section index"
        className="lg:hidden w-full overflow-x-auto no-scrollbar py-3 my-4 border-y border-neutral-100 flex items-center gap-1.5 select-none sticky top-14 bg-white/95 backdrop-blur-xs z-20"
      >
        <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 shrink-0 mr-1.5">
          {title === "APPLICATION SCREENS" ? "Folders:" : "Index:"}
        </span>
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          const indexStr = String(idx + 1).padStart(2, "0");

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-neutral-900 text-white font-medium shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {showIndices && (
                <span className="text-[10px] font-mono opacity-60">
                  {indexStr}
                </span>
              )}
              <span>{item.label}</span>
              {typeof item.count === "number" && (
                <span className="text-[10px] font-mono opacity-50">
                  ({item.count})
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
}
