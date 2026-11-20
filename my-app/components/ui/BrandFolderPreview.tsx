"use client";

import * as React from "react";
import {
  IconFolder,
  DEFAULT_ICONS,
  type FolderIcon,
} from "@/components/ui/icon-folder";
import { MacosFolderModal } from "@/components/ui/MacosFolderModal";

type BrandFolderPreviewProps = {
  icons?: FolderIcon[];
  title?: string;
  tags?: string[];
  theme?: "dark" | "light";
  spread?: number;
};

export function BrandFolderPreview({
  icons = DEFAULT_ICONS.slice(0, 4),
  title = "Brand Identity",
  tags = ["Urban Sprouts", "Lunex", "Volt Matrix", "Moon Safe"],
  theme = "light",
  spread = 70,
}: BrandFolderPreviewProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isOpening, setIsOpening] = React.useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setModalOpen(true);
      setIsOpening(false);
    }, 180);
  };

  return (
    <>
      <div className="overlay"></div>
      <div
        className="brand-folder-stage group relative cursor-pointer"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        {/* macOS Finder Pill Overlay */}
        {/* <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-[11px] font-medium text-slate-700 shadow-xs opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:border-sky-500/40 transition-all">
          <span className="text-xs">📁</span>
          <span>Open Brand Archive </span>
          <span className="text-[10px] text-slate-400">↗</span>
        </div> */}

        <div
          className={`brand-folder-scaler transition-all duration-200 ${isOpening ? "scale-[0.88] -translate-y-2 brightness-105" : ""
            }`}
        >
          <IconFolder
            className="brand-folder-card"
            icons={icons}
            spread={spread}
            tags={tags}
            theme={theme}
            title={title}
          />
        </div>
      </div>

      <MacosFolderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Brand Gallery Archive"
      />
    </>
  );
}

export default BrandFolderPreview;
