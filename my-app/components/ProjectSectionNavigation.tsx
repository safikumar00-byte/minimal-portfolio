"use client";

import * as React from "react";

export type SectionNavItem = {
  id: string;
  label: string;
};

export type ProjectSectionNavigationProps = {
  items: SectionNavItem[];
  className?: string;
  title?: string;
};

export default function ProjectSectionNavigation({
  items = [],
  className = "",
  title = "ON THIS PAGE",
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

    const headerOffset = 90;
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
        aria-label="Case study section index"
        className={`project-section-navigation hidden lg:block w-full max-w-[170px] select-none ${className}`}
      >
        <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-3.5 pl-3">
          {title}
        </div>

        <div className="relative border-l border-neutral-200/80 pl-3 flex flex-col gap-2.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-xs leading-snug transition-colors duration-150 py-0.5 block ${
                  isActive
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-400 hover:text-neutral-700 font-normal"
                }`}
              >
                {/* Active marker bar on the vertical border */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-[13px] top-0 bottom-0 w-[2px] bg-neutral-900 rounded-full"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile / Tablet Horizontal Navigation Rail */}
      <nav
        aria-label="Quick jump section index"
        className="lg:hidden w-full overflow-x-auto no-scrollbar py-3 my-4 border-y border-neutral-100 flex items-center gap-2 select-none"
      >
        <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 shrink-0 mr-1">
          Index:
        </span>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-md transition-all ${
                isActive
                  ? "bg-neutral-900 text-white font-medium"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </>
  );
}
