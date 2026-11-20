"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import useIsClient from "@/hooks/useIsClient";
import useEscapeKey from "@/hooks/useEscapeKey";
import {
  BRAND_FOLDERS,
  type BrandManifestFolder,
  type BrandAsset,
  type AssetCategory,
} from "@/lib/brand-assets";

/* ------------------------------------------------------------------ */
/*  Types & Data Exports for Backwards Compatibility                  */
/* ------------------------------------------------------------------ */

export type BrandFolderData = BrandManifestFolder;
export const REAL_BRAND_FOLDERS: BrandManifestFolder[] = BRAND_FOLDERS;

const CATEGORY_TABS: { id: AssetCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "logos", label: "Logos" },
  { id: "brand-identity", label: "Identity" },
  { id: "mockups", label: "Mockups" },
  { id: "products", label: "Products" },
  { id: "applications", label: "Applications" },
];

/* ------------------------------------------------------------------ */
/*  Category Badge Helper                                             */
/* ------------------------------------------------------------------ */

function getCategoryColor(category: string): { bg: string; text: string; border: string } {
  switch (category) {
    case "logos":
      return { bg: "bg-amber-500/10", text: "text-amber-700", border: "border-amber-500/20" };
    case "brand-identity":
      return { bg: "bg-emerald-500/10", text: "text-emerald-700", border: "border-emerald-500/20" };
    case "mockups":
      return { bg: "bg-indigo-500/10", text: "text-indigo-700", border: "border-indigo-500/20" };
    case "products":
      return { bg: "bg-sky-500/10", text: "text-sky-700", border: "border-sky-500/20" };
    case "applications":
      return { bg: "bg-purple-500/10", text: "text-purple-700", border: "border-purple-500/20" };
    default:
      return { bg: "bg-slate-500/10", text: "text-slate-700", border: "border-slate-500/20" };
  }
}

/* ------------------------------------------------------------------ */
/*  Dynamic Aspect-Ratio Gallery Asset Card                           */
/* ------------------------------------------------------------------ */

function GalleryAssetCard({
  asset,
  onClick,
}: {
  asset: BrandAsset;
  onClick: () => void;
}) {
  const isPdf = asset.format === "PDF";
  const initialLandscape = asset.width >= asset.height * 1.35;
  const [isLandscape, setIsLandscape] = React.useState(initialLandscape);

  const handleImageLoad = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = e.currentTarget;
      if (naturalHeight > 0) {
        setIsLandscape(naturalWidth >= naturalHeight * 1.35);
      }
    },
    []
  );

  const catColors = getCategoryColor(asset.category);

  if (isPdf) {
    return (
      <div
        className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between col-span-1 sm:col-span-2 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-600 font-bold text-sm shrink-0 shadow-2xs">
              PDF
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catColors.bg} ${catColors.text} ${catColors.border} uppercase tracking-wider`}>
                  Brand Guidelines
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {asset.sizeFormatted}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">
                {asset.caption}
              </h4>
            </div>
          </div>

          <a
            href={asset.src}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-2xs flex items-center gap-1.5 shrink-0"
          >
            <span>Open PDF</span>
            <span className="text-[10px] text-slate-400">↗</span>
          </a>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
          <span className="truncate max-w-[260px] sm:max-w-md font-mono text-[11px]">
            {asset.filename}
          </span>
          <span className="font-medium text-slate-700 group-hover:text-sky-600 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center ${
        isLandscape ? "col-span-1 sm:col-span-2" : "col-span-1"
      }`}
      style={{
        minHeight: isLandscape ? "240px" : "280px",
      }}
    >
      {/* Background checkerboard for transparent assets */}
      {asset.hasAlpha && (
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          }}
        />
      )}

      {/* Actual Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset.src}
        alt={asset.caption}
        loading="lazy"
        onLoad={handleImageLoad}
        className={`block relative z-10 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ${
          asset.hasAlpha ? "p-4 object-contain max-h-[320px]" : ""
        }`}
      />

      {/* Top Asset Format & Category Badges */}
      <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md border uppercase tracking-wider shadow-2xs ${catColors.bg} ${catColors.text} ${catColors.border} bg-white/95`}
        >
          {asset.category.replace("-", " ")}
        </span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white/90">
          {asset.format}
        </span>
      </div>

      {/* Dimension Pill (top-right on hover) */}
      <div className="absolute top-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-2xs border border-slate-200">
          {asset.width} × {asset.height}
        </span>
      </div>

      {/* Bottom Gradient Hover Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5 gap-2 z-20">
        <div className="min-w-0 pr-2">
          <p className="text-white text-xs font-semibold leading-snug line-clamp-1">
            {asset.caption}
          </p>
          <p className="text-white/70 text-[10px] tracking-wide mt-0.5 font-mono truncate">
            {asset.filename} · {asset.sizeFormatted}
          </p>
        </div>

        <span className="rounded-full bg-white/95 hover:bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-md shrink-0 flex items-center gap-1">
          <span>Quick Look</span>
          <span className="text-[10px] text-slate-400">↗</span>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  macOS Folder Icon Component                                       */
/* ------------------------------------------------------------------ */

export function MacosFolderIcon({
  folder,
  isSelected,
  onClick,
  onDoubleClick,
  size = "normal",
}: {
  folder: BrandManifestFolder;
  isSelected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  size?: "compact" | "normal" | "large";
}) {
  const iconWidth = size === "compact" ? 76 : size === "large" ? 116 : 94;
  const iconHeight = size === "compact" ? 64 : size === "large" ? 98 : 80;

  return (
    <div
      className={`group flex flex-col items-center justify-start cursor-pointer select-none transition-all duration-150 active:scale-95 ${
        size === "compact" ? "w-24 p-1.5" : size === "large" ? "w-36 p-3" : "w-28 p-2"
      }`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDoubleClick?.();
        }
      }}
    >
      {/* Folder Graphic - Three Layer Depth Structure */}
      <div
        className="relative flex items-center justify-center transition-all duration-200 group-hover:-translate-y-1"
        style={{
          width: iconWidth,
          height: iconHeight,
        }}
      >
        {/* LAYER 1: BACK FOLDER */}
        <svg
          viewBox="0 0 120 100"
          className="absolute inset-0 z-10 h-full w-full overflow-visible drop-shadow-[0_4px_10px_rgba(0,40,90,0.22)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`folder-back-${folder.id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#5bc6fb" />
              <stop offset="35%" stopColor="#258fe8" />
              <stop offset="100%" stopColor="#1467cb" />
            </linearGradient>

            <linearGradient
              id={`folder-crease-${folder.id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="rgba(8,48,102,0.45)" />
              <stop offset="100%" stopColor="rgba(8,48,102,0)" />
            </linearGradient>
          </defs>

          {/* Back Tab */}
          <path
            d="M 12 25
     C 12 17 17 12 25 12
     L 47 12
     C 54 12 58 16 62 21
     L 66 26
     C 69 30 73 31 79 31
     L 96 31
     C 105 31 110 36 110 45
     L 110 81
     C 110 90 105 95 96 95
     L 24 95
     C 15 95 10 90 10 81
     Z"
            fill={`url(#folder-back-${folder.id})`}
          />

          {/* Inner Fold Shadow */}
          <rect
            x="15"
            y="32"
            width="90"
            height="12"
            fill={`url(#folder-crease-${folder.id})`}
            rx="3"
          />
        </svg>

        {/* LAYER 2: FLOATING BRAND PREVIEW */}
        <div
          className={`absolute z-20 overflow-hidden rounded-[3px] border border-white/80 bg-white shadow-[0_5px_12px_rgba(0,0,0,0.3)] ${
            size === "compact"
              ? "top-[7px] h-[32px] w-[38px]"
              : size === "large"
                ? "top-[10px] h-[47px] w-[58px]"
                : "top-[9px] h-[39px] w-[48px]"
          }`}
          style={{
            left: "50%",
            transform: "translateX(-50%) rotate(-8deg) perspective(300px) rotateY(-5deg)",
            transformOrigin: "bottom center",
            transition: "transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={folder.previewImage}
            alt={folder.name}
            className="block h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* LAYER 3: FRONT FOLDER POCKET */}
        <svg
          viewBox="0 0 120 100"
          className="absolute inset-0 z-30 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`folder-front-${folder.id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#43b2fb" />
              <stop offset="25%" stopColor="#2494ef" />
              <stop offset="85%" stopColor="#0d70dc" />
              <stop offset="100%" stopColor="#095abb" />
            </linearGradient>
          </defs>

          {/* Front Pocket */}
          <path
            d="M 10 45
     C 10 36 16 31 25 31
     L 95 31
     C 104 31 110 36 110 45
     L 110 81
     C 110 90 104 95 95 95
     L 25 95
     C 16 95 10 90 10 81
     Z"
            fill={`url(#folder-front-${folder.id})`}
          />

          {/* Gloss Rim */}
          <path
            d="M 11.5 43 C 11.5 37 16.3 32.7 22.5 32.7 L 98.5 32.7 C 104.7 32.7 109.5 37 109.5 43"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Emboss Details */}
          <line
            x1="16"
            y1="56"
            x2="105"
            y2="56"
            stroke="rgba(0,30,80,0.18)"
            strokeWidth="1"
          />
          <line
            x1="16"
            y1="57"
            x2="105"
            y2="57"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />
        </svg>

        {/* TAG DOT BADGE */}
        <span
          className={`absolute z-40 -bottom-0.5 right-1.5 w-2.5 h-2.5 rounded-full border border-white shadow-sm ${
            folder.tagColor === "green"
              ? "bg-emerald-500"
              : folder.tagColor === "blue"
                ? "bg-sky-500"
                : folder.tagColor === "purple"
                  ? "bg-purple-500"
                  : folder.tagColor === "gold"
                    ? "bg-amber-400"
                    : "bg-orange-500"
          }`}
        />
      </div>

      {/* Folder Name & Details */}
      <div className="mt-1.5 flex flex-col items-center max-w-full">
        <span
          className={`text-[12px] font-medium text-center line-clamp-2 px-1.5 py-0.5 rounded-[4px] transition-colors leading-[14px] ${
            isSelected
              ? "bg-[#007aff] text-white shadow-sm"
              : "text-slate-800 group-hover:bg-slate-200/80"
          }`}
        >
          {folder.name}
        </span>
        <span className="text-[10px] text-slate-500 tracking-tight mt-0.5 font-normal">
          {folder.itemsCount} items
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main macOS Full-Page Modal Component                              */
/* ------------------------------------------------------------------ */

interface MacosFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function MacosFolderModal({
  isOpen,
  onClose,
  title = "Brand Gallery",
}: MacosFolderModalProps) {
  const mounted = useIsClient();
  const [activeBrand, setActiveBrand] = React.useState<BrandManifestFolder | null>(null);
  const [selectedFolder, setSelectedFolder] = React.useState<BrandManifestFolder | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<AssetCategory>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");
  const [iconSize, setIconSize] = React.useState<"compact" | "normal" | "large">("normal");
  const [quickLookIndex, setQuickLookIndex] = React.useState<number | null>(null);

  useEscapeKey(() => {
    if (quickLookIndex !== null) {
      setQuickLookIndex(null);
    } else if (activeBrand) {
      setActiveBrand(null);
      setActiveCategory("all");
    } else {
      onClose();
    }
  }, isOpen);

  useBodyScrollLock(isOpen);

  // Keyboard navigation for Quick Look lightbox
  React.useEffect(() => {
    if (!isOpen || quickLookIndex === null || !activeBrand) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setQuickLookIndex((prev) =>
          prev === null || prev === 0 ? activeBrand.assets.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setQuickLookIndex((prev) =>
          prev === null || prev === activeBrand.assets.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, quickLookIndex, activeBrand]);

  if (!isOpen || !mounted) return null;

  // Root view: Filter brand folders by search
  const filteredFolders = BRAND_FOLDERS.filter((folder) => {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") return true;
    return (
      folder.name.toLowerCase().includes(query) ||
      folder.category.toLowerCase().includes(query) ||
      folder.description.toLowerCase().includes(query) ||
      folder.deliverables.some((d) => d.toLowerCase().includes(query))
    );
  });

  // Active brand view: Filter brand assets by active category and search query
  const filteredBrandAssets = activeBrand
    ? activeBrand.assets
        .map((asset, originalIndex) => ({ ...asset, originalIndex }))
        .filter((asset) => {
          // Category filter
          if (activeCategory !== "all" && asset.category !== activeCategory) {
            return false;
          }
          // Search query filter
          const query = searchQuery.trim().toLowerCase();
          if (query === "") return true;
          return (
            asset.caption.toLowerCase().includes(query) ||
            asset.subcategory.toLowerCase().includes(query) ||
            asset.filename.toLowerCase().includes(query) ||
            asset.format.toLowerCase().includes(query)
          );
        })
    : [];

  // Available category tabs for this brand
  const brandTabs = activeBrand
    ? CATEGORY_TABS.filter((tab) => {
        if (tab.id === "all") return true;
        return activeBrand.presentCategories.includes(tab.id);
      })
    : [];

  const handleSelectBrand = (folder: BrandManifestFolder) => {
    setSelectedFolder(folder);
    setActiveBrand(folder);
    setActiveCategory("all");
    setSearchQuery("");
  };

  const handleBackToFolders = () => {
    setActiveBrand(null);
    setActiveCategory("all");
    setSearchQuery("");
    setQuickLookIndex(null);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-2 sm:p-5 overflow-hidden transition-opacity duration-300 animate-fade-in"
      style={{
        background: "rgba(0, 0, 0, 0.65)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Subtle macOS Desktop Wallpaper Layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.25) 0%, transparent 70%), linear-gradient(135deg, rgba(88, 142, 245, 0.4) 0%, rgba(245, 120, 160, 0.15) 50%, rgba(255, 180, 80, 0.2) 100%)",
        }}
      />

      {/* Main macOS Finder Window */}
      <div
        className="relative w-full max-w-5xl h-[88vh] max-h-[880px] bg-[#fbfbfd]/95 backdrop-blur-2xl rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.45)] flex flex-col overflow-hidden text-slate-800 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "macOsWindowPop 380ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Window Chrome Titlebar */}
        <div className="h-13 bg-[#ebebef]/90 border-b border-black/[0.08] px-4 flex items-center justify-between select-none shrink-0 gap-3">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-[9px] text-[#780000] opacity-90 hover:opacity-100 group transition-all cursor-pointer shadow-2xs"
              aria-label="Close window"
              title="Close (Esc)"
            >
              <span className="opacity-0 group-hover:opacity-100 font-bold leading-none">✕</span>
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-[10px] text-[#995700] opacity-90 hover:opacity-100 group transition-all cursor-pointer shadow-2xs"
              aria-label="Minimize"
              onClick={() => {
                if (activeBrand) handleBackToFolders();
                else setSelectedFolder(null);
              }}
              title="Back / Clear"
            >
              <span className="opacity-0 group-hover:opacity-100 font-bold leading-none">−</span>
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-[9px] text-[#006500] opacity-90 hover:opacity-100 group transition-all cursor-pointer shadow-2xs"
              aria-label="Toggle size"
              onClick={() =>
                setIconSize((s) =>
                  s === "normal" ? "large" : s === "large" ? "compact" : "normal"
                )
              }
              title="Toggle size"
            >
              <span className="opacity-0 group-hover:opacity-100 font-bold leading-none">+</span>
            </button>
          </div>

          {/* Breadcrumb Path Bar */}
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium overflow-hidden">
            {activeBrand ? (
              <button
                type="button"
                onClick={handleBackToFolders}
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-200/80 hover:bg-slate-300 text-slate-800 font-medium text-xs transition-colors cursor-pointer shadow-2xs"
              >
                <span>‹</span>
                <span>All Brands</span>
              </button>
            ) : null}

            <span className="text-slate-400 hidden sm:inline">Macintosh HD</span>
            <span className="text-slate-300 hidden sm:inline">›</span>
            <span
              className={`cursor-pointer hover:underline ${
                activeBrand ? "text-slate-500" : "text-slate-900 font-semibold"
              }`}
              onClick={handleBackToFolders}
            >
              {title}
            </span>
            {activeBrand && (
              <>
                <span className="text-slate-300">›</span>
                <span className="text-slate-900 font-semibold truncate max-w-[140px] sm:max-w-none">
                  {activeBrand.name}
                </span>
              </>
            )}
          </div>

          {/* View Mode Controls & Search */}
          <div className="flex items-center gap-2">
            {!activeBrand && (
              <div className="flex items-center bg-slate-200/80 p-0.5 rounded-md border border-slate-300/60 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1 rounded text-xs transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Grid View"
                  aria-label="Grid view"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="1" width="6" height="6" rx="1" />
                    <rect x="9" y="1" width="6" height="6" rx="1" />
                    <rect x="1" y="9" width="6" height="6" rx="1" />
                    <rect x="9" y="9" width="6" height="6" rx="1" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`p-1 rounded text-xs transition-all cursor-pointer ${
                    viewMode === "table"
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Table View"
                  aria-label="Table view"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1 3h14v2H1V3zm0 4h14v2H1V7zm0 4h14v2H1v-2z" />
                  </svg>
                </button>
              </div>
            )}

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={activeBrand ? "Filter assets..." : "Search brands..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-28 sm:w-44 h-7 pl-6 pr-2 bg-white/90 border border-slate-300/80 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-2xs"
              />
              <svg
                className="absolute left-2 top-2 text-slate-400"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Window Body */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 flex flex-col overflow-hidden bg-white/75">
            {activeBrand ? (
              /* ========================================================= */
              /* Brand Folder Page: Dynamic Gallery & Category Filters     */
              /* ========================================================= */
              <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
                {/* Brand Folder Info Header */}
                <div className="p-4 sm:p-5 border-b border-slate-200 bg-white/95 backdrop-blur-md flex flex-col gap-3 shrink-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs shrink-0 bg-slate-50 flex items-center justify-center p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeBrand.previewImage}
                          alt={activeBrand.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
                            {activeBrand.name}
                          </h2>
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                            {activeBrand.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {activeBrand.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleBackToFolders}
                      className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200 shrink-0 shadow-2xs"
                    >
                      <span>‹ Back to Folders</span>
                    </button>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-1 scrollbar-none">
                    {brandTabs.map((tab) => {
                      const count =
                        tab.id === "all"
                          ? activeBrand.assets.length
                          : activeBrand.assets.filter((a) => a.category === tab.id).length;
                      const isActive = activeCategory === tab.id;

                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setActiveCategory(tab.id);
                            setSearchQuery("");
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                            isActive
                              ? "bg-slate-900 text-white shadow-xs font-semibold"
                              : "bg-slate-100/90 hover:bg-slate-200/80 text-slate-600 border border-slate-200/70"
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SCROLLABLE VIEW: Dynamic Aspect-Ratio Grid */}
                <div className="flex-1 p-3 sm:p-5 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 grid-flow-dense gap-3 sm:gap-4">
                    {filteredBrandAssets.map((asset) => (
                      <GalleryAssetCard
                        key={asset.id}
                        asset={asset}
                        onClick={() => setQuickLookIndex(asset.originalIndex)}
                      />
                    ))}
                  </div>

                  {filteredBrandAssets.length === 0 && (
                    <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400">
                      <span className="text-3xl mb-2">🔍</span>
                      <p className="text-xs font-medium">
                        No assets found matching &ldquo;{searchQuery}&rdquo; in {activeCategory}
                      </p>
                    </div>
                  )}

                  {/* Gallery Footer */}
                  <div className="py-6 text-center text-xs text-slate-400">
                    {filteredBrandAssets.length} of {activeBrand.itemsCount} assets · Total Size: {activeBrand.size}
                  </div>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              /* ========================================================= */
              /* Root View: Grid Layout of macOS Folder Icons              */
              /* ========================================================= */
              <div
                className="flex-1 p-4 sm:p-6 overflow-y-auto"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 items-start">
                  {filteredFolders.map((folder) => (
                    <MacosFolderIcon
                      key={folder.id}
                      folder={folder}
                      size={iconSize}
                      isSelected={selectedFolder?.id === folder.id}
                      onClick={() => handleSelectBrand(folder)}
                      onDoubleClick={() => handleSelectBrand(folder)}
                    />
                  ))}
                </div>

                {filteredFolders.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center py-16 text-slate-400">
                    <span className="text-4xl mb-2">🔍</span>
                    <p className="text-sm font-medium">
                      No brand folders found matching &ldquo;{searchQuery}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* ========================================================= */
              /* Root View: macOS Table View Mode                          */
              /* ========================================================= */
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f0f0f4] border-b border-slate-200 text-slate-600 font-semibold sticky top-0 select-none">
                      <th className="py-2.5 px-4">Name</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Items</th>
                      <th className="py-2.5 px-3">Date Modified</th>
                      <th className="py-2.5 px-3">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFolders.map((folder) => {
                      const isSel = selectedFolder?.id === folder.id;
                      return (
                        <tr
                          key={folder.id}
                          onClick={() => handleSelectBrand(folder)}
                          className={`border-b border-slate-100 cursor-pointer transition-colors ${
                            isSel
                              ? "bg-[#007aff] text-white"
                              : "hover:bg-slate-50 text-slate-700 odd:bg-slate-50/40"
                          }`}
                        >
                          <td className="py-2.5 px-4 font-medium flex items-center gap-2.5">
                            <span className="text-base">📁</span>
                            <span>{folder.name}</span>
                          </td>
                          <td className={`py-2.5 px-3 ${isSel ? "text-white/90" : "text-slate-500"}`}>
                            {folder.category}
                          </td>
                          <td className={`py-2.5 px-3 ${isSel ? "text-white/90" : "text-slate-500"}`}>
                            {folder.itemsCount} assets
                          </td>
                          <td className={`py-2.5 px-3 ${isSel ? "text-white/90" : "text-slate-500"}`}>
                            {folder.dateModified}
                          </td>
                          <td className={`py-2.5 px-3 ${isSel ? "text-white/90" : "text-slate-500"}`}>
                            {folder.size}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>

        {/* Window Footer Status Bar */}
        <footer className="h-6 bg-[#ebebef] border-t border-slate-200/80 px-4 flex items-center justify-between text-[11px] text-slate-500 select-none shrink-0">
          <span>
            {activeBrand
              ? `${filteredBrandAssets.length} of ${activeBrand.itemsCount} assets in ${activeBrand.name}`
              : `${filteredFolders.length} brand folders available`}
          </span>
          <span>142.8 GB available on Macintosh HD</span>
        </footer>
      </div>

      {/* Lightbox / Quick Look Overlay */}
      {activeBrand && quickLookIndex !== null && activeBrand.assets[quickLookIndex] && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setQuickLookIndex(null)}
        >
          {(() => {
            const currentAsset = activeBrand.assets[quickLookIndex];
            const catColors = getCategoryColor(currentAsset.category);

            return (
              <div
                className="relative w-full max-w-5xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-white/20 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Quick Look Header */}
                <div className="h-11 bg-slate-800/95 border-b border-white/10 px-4 flex items-center justify-between text-white text-xs select-none gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-semibold text-slate-200 truncate">
                      {activeBrand.name}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-white font-medium truncate">
                      {currentAsset.caption}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${catColors.bg} ${catColors.text} bg-white/10 text-white/90 border border-white/15`}
                    >
                      {currentAsset.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-mono text-white/60 hidden sm:inline">
                      {currentAsset.width} × {currentAsset.height} px · {currentAsset.sizeFormatted}
                    </span>
                    <span className="text-[11px] text-white/50">
                      {quickLookIndex + 1} / {activeBrand.assets.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuickLookIndex(null)}
                      className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                      title="Close (Esc)"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Quick Look Canvas Viewport */}
                <div className="relative aspect-video max-h-[75vh] w-full bg-black/95 flex items-center justify-center p-4">
                  {currentAsset.format === "PDF" ? (
                    <div className="flex flex-col items-center justify-center text-center p-8 max-w-md">
                      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold text-xl mb-4">
                        PDF
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {currentAsset.caption}
                      </h3>
                      <p className="text-xs text-slate-400 mb-6 font-mono">
                        {currentAsset.filename} ({currentAsset.sizeFormatted})
                      </p>
                      <a
                        href={currentAsset.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-colors shadow-lg flex items-center gap-2"
                      >
                        <span>Open Document in New Tab</span>
                        <span>↗</span>
                      </a>
                    </div>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={currentAsset.src}
                      alt={currentAsset.caption}
                      className="max-h-[70vh] w-auto max-w-full object-contain"
                    />
                  )}

                  {/* Navigation Arrows */}
                  {activeBrand.assets.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setQuickLookIndex((prev) =>
                            prev === null || prev === 0
                              ? activeBrand.assets.length - 1
                              : prev - 1
                          )
                        }
                        className="absolute left-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xl font-bold cursor-pointer transition-colors border border-white/20"
                        title="Previous (←)"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setQuickLookIndex((prev) =>
                            prev === null || prev === activeBrand.assets.length - 1
                              ? 0
                              : prev + 1
                          )
                        }
                        className="absolute right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xl font-bold cursor-pointer transition-colors border border-white/20"
                        title="Next (→)"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default MacosFolderModal;
