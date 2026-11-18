"use client";

import * as React from "react";
import Image from "next/image";
import ScreenLightbox, { type LightboxScreen } from "@/components/case-study/ScreenLightbox";
import ScreenCategoryNavigation, {
  type ScreenCategoryNavItem,
} from "@/components/case-study/ScreenCategoryNavigation";

export interface GalleryScreenItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  module: string;
  categoryLabel?: string;
  state?: string;
  sequence?: number;
  device?: "mobile" | "desktop";
  description?: string;
}

export interface ScreenCategoryGroup {
  id: string; // e.g. "cat-onboarding"
  key: string; // e.g. "onboarding"
  label: string; // e.g. "Onboarding"
  description?: string;
  screens: GalleryScreenItem[];
}

export interface ApplicationScreenGalleryProps {
  categories: ScreenCategoryGroup[];
  deviceType?: "phone" | "desktop";
  className?: string;
  onCategoriesReady?: (navItems: ScreenCategoryNavItem[]) => void;
}

export default function ApplicationScreenGallery({
  categories = [],
  deviceType = "phone",
  className = "",
}: ApplicationScreenGalleryProps) {
  const [selectedScreenIndex, setSelectedScreenIndex] = React.useState<number | null>(null);

  // Flatten all screens into a continuous list for the lightbox
  const allScreens: LightboxScreen[] = React.useMemo(() => {
    const list: LightboxScreen[] = [];
    categories.forEach((cat) => {
      cat.screens.forEach((screen) => {
        list.push({
          id: screen.id,
          src: screen.src,
          alt: screen.alt || screen.title,
          title: screen.title,
          module: screen.module,
          categoryLabel: cat.label,
          state: screen.state,
          device: screen.device || (deviceType === "desktop" ? "desktop" : "mobile"),
        });
      });
    });
    return list;
  }, [categories, deviceType]);

  const handleOpenLightbox = (screenId: string) => {
    const idx = allScreens.findIndex((s) => s.id === screenId);
    if (idx !== -1) {
      setSelectedScreenIndex(idx);
    }
  };

  return (
    <div className={`application-screen-gallery w-full flex flex-col gap-16 sm:gap-20 ${className}`}>
      {/* Mobile / Tablet Horizontal Folder Bar */}
      <div className="lg:hidden w-full">
        <ScreenCategoryNavigation
          categories={categories.map((cat) => ({
            id: cat.id,
            label: cat.label,
            count: cat.screens.length,
          }))}
        />
      </div>

      {/* Screen Categories Loop */}
      {categories.map((category, catIndex) => {
        const isDesktopProject = deviceType === "desktop";
        const categoryNumber = String(catIndex + 1).padStart(2, "0");

        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`heading-${category.id}`}
            className="w-full scroll-mt-28"
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 mb-6 border-b border-neutral-200/80">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[11px] font-mono text-neutral-400 font-medium">
                  {categoryNumber}
                </span>
                <h3
                  id={`heading-${category.id}`}
                  className="text-base sm:text-lg font-medium text-neutral-900 tracking-tight"
                >
                  {category.label}
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  ({category.screens.length}{" "}
                  {category.screens.length === 1 ? "screen" : "screens"})
                </span>
              </div>

              {category.description && (
                <p className="text-xs text-neutral-500 font-normal max-w-md sm:text-right">
                  {category.description}
                </p>
              )}
            </div>

            {/* Screen Cards Grid */}
            <div
              className={`grid gap-5 sm:gap-6 ${
                isDesktopProject
                  ? category.screens.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-2"
                  : category.screens.length === 1
                  ? "grid-cols-1 sm:grid-cols-2 max-w-sm"
                  : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
              }`}
            >
              {category.screens.map((screen) => {
                const isScreenDesktop =
                  screen.device === "desktop" || isDesktopProject;

                return (
                  <div
                    key={screen.id}
                    onClick={() => handleOpenLightbox(screen.id)}
                    className="group relative flex flex-col cursor-zoom-in select-none text-left"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenLightbox(screen.id);
                      }
                    }}
                    aria-label={`Enlarge ${screen.title}`}
                  >
                    {/* Frame Container */}
                    <div
                      className={`relative w-full rounded-xl overflow-hidden bg-neutral-50/80  shadow-sm  group-hover:border-neutral-400 group-hover:shadow-md transition-all duration-200 p-0 sm:p-0 flex items-center justify-center ${
                        isScreenDesktop
                          ? ""
                          : "aspect-9/19.5"
                      }`}
                    >
                      <Image
                        src={screen.src}
                        alt={screen.alt || screen.title}
                        width={isScreenDesktop ? 1200 : 600}
                        height={isScreenDesktop ? 750 : 1300}
                        quality={90}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                      />

                      {/* Subtle hover icon overlay */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/70 text-white rounded-md p-1.5 shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Caption Below Screen */}
                    <div className="mt-2.5 px-0.5 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-medium text-neutral-900 group-hover:text-neutral-950 line-clamp-1">
                          {screen.title}
                        </h4>
                        {screen.state && screen.state !== "default" && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                            {screen.state}
                          </span>
                        )}
                      </div>

                      {screen.description && (
                        <p className="text-[11px] text-neutral-500 leading-snug line-clamp-1 font-normal">
                          {screen.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Lightbox Modal */}
      {selectedScreenIndex !== null && (
        <ScreenLightbox
          screens={allScreens}
          currentIndex={selectedScreenIndex}
          isOpen={selectedScreenIndex !== null}
          onClose={() => setSelectedScreenIndex(null)}
          onSelectIndex={(index) => setSelectedScreenIndex(index)}
        />
      )}
    </div>
  );
}
