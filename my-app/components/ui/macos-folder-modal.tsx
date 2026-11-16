"use client";

import * as React from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};
function useIsClient() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/* ------------------------------------------------------------------ */
/*  Types & Real Brand Gallery Data                                   */
/* ------------------------------------------------------------------ */

export type BrandFolderData = {
  id: string;
  name: string;
  category: string;
  itemsCount: number;
  dateModified: string;
  size: string;
  tagColor: "green" | "gold" | "blue" | "purple" | "orange";
  previewImage: string;
  galleryImages: { src: string; caption: string }[];
  description: string;
  deliverables: string[];
};

export const REAL_BRAND_FOLDERS: BrandFolderData[] = [
  {
    id: "urban-sprouts",
    name: "Urban Sprouts",
    category: "Agriculture & Organic",
    itemsCount: 9,
    dateModified: "Oct 14, 2026",
    size: "64.2 MB",
    tagColor: "green",
    previewImage: "/brand-gallery/urban-sprouts/Artboard 1.png",
    galleryImages: [
      { src: "/brand-gallery/urban-sprouts/Artboard 1.png", caption: "Brandmark & Visual Emblem" },
      { src: "/brand-gallery/urban-sprouts/Artboard 3.png", caption: "Logo Construction & Proportions" },
      { src: "/brand-gallery/urban-sprouts/Artboard 7.png", caption: "Color System & Typography Standards" },
      { src: "/brand-gallery/urban-sprouts/Artboard 8.png", caption: "Packaging Label Guidelines" },
      { src: "/brand-gallery/urban-sprouts/Artboard 9.png", caption: "Collateral & Business Stationery" },
      { src: "/brand-gallery/urban-sprouts/Artboard 10.png", caption: "Produce Carton & Box Mockups" },
      { src: "/brand-gallery/urban-sprouts/Artboard 12.png", caption: "Digital Storefront & Mobile Assets" },
      { src: "/brand-gallery/urban-sprouts/Artboard 14.png", caption: "Outdoor Billboard & Signage" },
      { src: "/brand-gallery/urban-sprouts/Artboard 1_1.png", caption: "Master Brand Suite Spread" },
    ],
    description: "Sustainable vertical farming & microgreen nursery identity, biological sprout symbol, eco-packaging tokens, and agricultural display collateral.",
    deliverables: ["Organic Brandmark", "Color Palette", "Cardboard Packaging", "Label Systems", "Store Signage"],
  },
  {
    id: "lunex",
    name: "Lunex Luxury",
    category: "Luxury & Retail",
    itemsCount: 6,
    dateModified: "Nov 02, 2026",
    size: "38.5 MB",
    tagColor: "gold",
    previewImage: "/brand-gallery/lunex/main-logo.png",
    galleryImages: [
      { src: "/brand-gallery/lunex/main-logo.png", caption: "Master Monogram & Golden Ratio Emblem" },
      { src: "/brand-gallery/lunex/price-tag.jpg", caption: "Luxury Hangtag & Embossed Gold Foil Mockup" },
      { src: "/brand-gallery/lunex/thank-you-card.jpg", caption: "Customer Thank You Envelope & Premium Card" },
      { src: "/brand-gallery/lunex/logo-transparent.png", caption: "Vector Crest on Dark Substrate" },
      { src: "/brand-gallery/lunex/icon-black.png", caption: "Solid Dark Icon Variant" },
      { src: "/brand-gallery/lunex/icon-white.png", caption: "Solid Light Icon Variant" },
    ],
    description: "High-end bespoke retail and lifestyle apparel identity, interlocking geometry monogram, gold-leaf print packaging, and customer stationery.",
    deliverables: ["Geometric Monogram", "Hangtag Mockups", "Stationery Kit", "Gold Foil Specs", "Garment Labels"],
  },
  {
    id: "moon-safe",
    name: "Moon Safe Diagnostics",
    category: "Healthcare & Biotech",
    itemsCount: 12,
    dateModified: "Sep 28, 2026",
    size: "148.0 MB",
    tagColor: "blue",
    previewImage: "/brand-gallery/moon-safe/mockup kit.jpg",
    galleryImages: [
      { src: "/brand-gallery/moon-safe/mockup kit.jpg", caption: "Comprehensive Identity Mockup Kit" },
      { src: "/brand-gallery/moon-safe/letterhead mockup.jpg", caption: "Clinical Letterhead & Document Suite" },
      { src: "/brand-gallery/moon-safe/test tube mockup.jpg", caption: "Diagnostic Test Tube & Laboratory Vial Labeling" },
      { src: "/brand-gallery/moon-safe/visitng card mockup.jpg", caption: "Corporate Business Card Suite" },
      { src: "/brand-gallery/moon-safe/board mockup.jpg", caption: "Diagnostic Facility Entrance Signage" },
      { src: "/brand-gallery/moon-safe/display mockup.jpg", caption: "Trade Exhibition Display Stand" },
      { src: "/brand-gallery/moon-safe/face mask mockup.jpg", caption: "Branded Personal Protective Equipment" },
      { src: "/brand-gallery/moon-safe/id card mockup.jpg", caption: "Staff Security Credential Badges" },
      { src: "/brand-gallery/moon-safe/banner mockup.jpg", caption: "Conference Roll-up Banner" },
      { src: "/brand-gallery/moon-safe/paper cut mockup.jpg", caption: "Embossed Paper Architectural Mockup" },
      { src: "/brand-gallery/moon-safe/Artboard 1 copy 2@4x-100.jpg", caption: "Clinical Brand Guidelines Manual" },
      { src: "/brand-gallery/moon-safe/Artboard 15@4x-100.jpg", caption: "Laboratory Visual Design System" },
    ],
    description: "Diagnostic medical laboratory and clinical safety architecture, sterile packaging systems, corporate identity, and environmental facility signage.",
    deliverables: ["Clinical Identity", "Vial & Tube Labels", "Signage Suite", "PPE Branding", "Stationery Pack"],
  },
  {
    id: "volt-matrix",
    name: "Volt Matrix",
    category: "Enterprise & Energy",
    itemsCount: 8,
    dateModified: "Jul 19, 2026",
    size: "72.4 MB",
    tagColor: "green",
    previewImage: "/brand-gallery/volt-matrix/c39dc9235525379.68d9375e00cde.jpg",
    galleryImages: [
      { src: "/brand-gallery/volt-matrix/c39dc9235525379.68d9375e00cde.jpg", caption: "Core Brand Mark & Electric Green Identity" },
      { src: "/brand-gallery/volt-matrix/458b11235525379.68d9375e007bd.jpg", caption: "Grid Layout & Vector Typography" },
      { src: "/brand-gallery/volt-matrix/1.jpg", caption: "Enterprise Portal Hero & Architecture" },
      { src: "/brand-gallery/volt-matrix/2.jpg", caption: "Corporate Letterhead & Stationery" },
      { src: "/brand-gallery/volt-matrix/3.jpg", caption: "Executive Business Cards" },
      { src: "/brand-gallery/volt-matrix/4.jpg", caption: "Digital ID Badges & Lanyards" },
      { src: "/brand-gallery/volt-matrix/5.jpg", caption: "Cloud Platform Design System" },
      { src: "/brand-gallery/volt-matrix/6.jpg", caption: "Brand Guidelines Overview" },
    ],
    description: "Enterprise electrical infrastructure and digital workflow platform branding, modular typography, and technical collateral.",
    deliverables: ["Identity Emblem", "Design Tokens", "Stationery Pack", "Corporate Badges", "Design Guide"],
  },
  {
    id: "bug-bloons",
    name: "Bug Bloons",
    category: "Media & Entertainment",
    itemsCount: 10,
    dateModified: "Aug 11, 2026",
    size: "52.8 MB",
    tagColor: "orange",
    previewImage: "/brand-gallery/bug-bloons/1.jpg",
    galleryImages: [
      { src: "/brand-gallery/bug-bloons/1.jpg", caption: "Character Mascot & Logo Illustration" },
      { src: "/brand-gallery/bug-bloons/2.jpg", caption: "Vibrant Color Palette & Typography" },
      { src: "/brand-gallery/bug-bloons/3.jpg", caption: "Party Event Invitation Suite" },
      { src: "/brand-gallery/bug-bloons/4.jpg", caption: "Merchandise & Apparel Prints" },
      { src: "/brand-gallery/bug-bloons/5.jpg", caption: "Social Media Banner Templates" },
      { src: "/brand-gallery/bug-bloons/6.jpg", caption: "Balloon Package Stickers & Badges" },
      { src: "/brand-gallery/bug-bloons/7.jpg", caption: "Promotional Flyer Campaigns" },
      { src: "/brand-gallery/bug-bloons/8.jpg", caption: "Kids Workshop Activity Cards" },
      { src: "/brand-gallery/bug-bloons/9.jpg", caption: "Storefront Window Decals" },
      { src: "/brand-gallery/bug-bloons/10.jpg", caption: "Vehicle Wrap Mockup" },
    ],
    description: "Playful creative event and balloon artistry identity, bespoke illustrative mascot design, party collateral, and festival promotional banners.",
    deliverables: ["Character Illustration", "Mascot Guidelines", "Party Collateral", "Stickers & Decals", "Vehicle Wrap"],
  },
  {
    id: "sfx-forex",
    name: "SFX Forex",
    category: "Fintech & Markets",
    itemsCount: 4,
    dateModified: "Aug 30, 2026",
    size: "24.1 MB",
    tagColor: "purple",
    previewImage: "/brand-gallery/sfx-forex/square-logo.jpg",
    galleryImages: [
      { src: "/brand-gallery/sfx-forex/square-logo.jpg", caption: "Primary App Square Icon & Currency Waves" },
      { src: "/brand-gallery/sfx-forex/horizontal-logo.jpg", caption: "Horizontal Corporate Brandmark" },
      { src: "/brand-gallery/sfx-forex/dp.jpg", caption: "Social Media Display Avatar & Watermark" },
      { src: "/brand-gallery/sfx-forex/icon.png", caption: "Transparent App Launcher Symbol" },
    ],
    description: "Algorithmic foreign exchange trading portal, dynamic market waves iconography, terminal design tokens, and social branding.",
    deliverables: ["Trading Icon", "App Launcher", "Avatar Graphics", "Market Banners", "Vector Logos"],
  },
  {
    id: "grow-fast",
    name: "Grow Fast Nutrition",
    category: "Agriculture & Organic",
    itemsCount: 3,
    dateModified: "Jun 16, 2026",
    size: "31.6 MB",
    tagColor: "green",
    previewImage: "/brand-gallery/grow-fast-package/Front.png",
    galleryImages: [
      { src: "/brand-gallery/grow-fast-package/Front.png", caption: "Retail Fertilizer Bag Front Packaging" },
      { src: "/brand-gallery/grow-fast-package/back.jpg", caption: "Technical Directions & Nutrient Breakdown Back" },
      { src: "/brand-gallery/grow-fast-package/full_design.png", caption: "Full Die-Cut Packaging Artwork Flat" },
    ],
    description: "Specialized agricultural plant bio-nutrient packaging design, organic soil amendment sacks, regulatory labels, and dieline layouts.",
    deliverables: ["Die-Cut Packaging", "Front Bag Art", "Back Specs Label", "Print Ready PDF", "Store Display"],
  },
  {
    id: "tristone",
    name: "Tristone Agency",
    category: "Media & Agency",
    itemsCount: 4,
    dateModified: "May 22, 2026",
    size: "42.0 MB",
    tagColor: "blue",
    previewImage: "/brand-gallery/tristone/1.png",
    galleryImages: [
      { src: "/brand-gallery/tristone/1.png", caption: "Corporate Brand Identity Showcase" },
      { src: "/brand-gallery/tristone/2.png", caption: "3D Promotional Carousel Banners" },
      { src: "/brand-gallery/tristone/3.png", caption: "Social Media Marketing Deck" },
      { src: "/brand-gallery/tristone/4.png", caption: "Digital Campaign Key Visuals" },
    ],
    description: "Creative digital marketing studio visual branding, 3D social carousel layouts, ad campaign key visuals, and typographic systems.",
    deliverables: ["Brand Identity", "3D Artwork", "Social Carousels", "Key Visuals", "Deck Templates"],
  },
  {
    id: "cpt",
    name: "CPT Solutions",
    category: "Enterprise & Consulting",
    itemsCount: 2,
    dateModified: "Apr 18, 2026",
    size: "18.3 MB",
    tagColor: "gold",
    previewImage: "/brand-gallery/cpt/logo.png",
    galleryImages: [
      { src: "/brand-gallery/cpt/logo.png", caption: "Primary Wordmark & Modern Vector Emblem" },
      { src: "/brand-gallery/cpt/icon.png", caption: "High-Resolution App Launcher Icon" },
    ],
    description: "Strategic corporate technology consultancy branding, executive identity, vector monogram, and corporate collateral.",
    deliverables: ["Corporate Wordmark", "App Icon", "Letterhead", "Brand Standards", "Digital Assets"],
  },
  {
    id: "archieve",
    name: "Approvals & Lending",
    category: "Fintech & Markets",
    itemsCount: 7,
    dateModified: "Mar 12, 2026",
    size: "46.2 MB",
    tagColor: "purple",
    previewImage: "/brand-gallery/archieve/approvals-logo-100.jpg",
    galleryImages: [
      { src: "/brand-gallery/archieve/approvals-logo-100.jpg", caption: "Instant Loan Approval Badge" },
      { src: "/brand-gallery/archieve/availcreidt-100.jpg", caption: "Avail Credit Micro-Badge" },
      { src: "/brand-gallery/archieve/quickdisbursal-logo-100.jpg", caption: "Quick Disbursal Security Stamp" },
      { src: "/brand-gallery/archieve/simplecredit-logo-100.jpg", caption: "SimpleCredit Corporate Mark" },
      { src: "/brand-gallery/archieve/gv/cup-mockup.png", caption: "Corporate Merchandise Coffee Mug Mockup" },
      { src: "/brand-gallery/archieve/gv/paper-mockup.png", caption: "Embossed Heavyweight Paper Presentation" },
      { src: "/brand-gallery/archieve/gv/business card mockupjpg.png", caption: "Foil Stamped Business Cards" },
    ],
    description: "Fintech credit mobility trust marks, instant disbursal iconography, corporate client merchandise, and stationery mockups.",
    deliverables: ["Trust Badges", "Credit Logos", "Cup Merch", "Paper Mockup", "Foil Card Mockup"],
  },
];

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
  folder: BrandFolderData;
  isSelected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  size?: "compact" | "normal" | "large";
}) {
  const iconWidth = size === "compact" ? 76 : size === "large" ? 116 : 94;
  const iconHeight = size === "compact" ? 64 : size === "large" ? 98 : 80;

  return (
    <div
      className={`group flex flex-col items-center justify-start cursor-pointer select-none transition-all duration-150 active:scale-95 ${size === "compact" ? "w-24 p-1.5" : size === "large" ? "w-36 p-3" : "w-28 p-2"
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
              x1="0" y1="0" x2="0" y2="1"
            >
              <stop offset="0%" stopColor="#5bc6fb" />
              <stop offset="35%" stopColor="#258fe8" />
              <stop offset="100%" stopColor="#1467cb" />
            </linearGradient>

            <linearGradient
              id={`folder-crease-${folder.id}`}
              x1="0" y1="0" x2="0" y2="1"
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
          className={`absolute z-20 overflow-hidden rounded-[3px] border border-white/80 bg-white shadow-[0_5px_12px_rgba(0,0,0,0.3)] ${size === "compact"
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
              x1="0" y1="0" x2="0" y2="1"
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
            x1="16" y1="56" x2="105" y2="56"
            stroke="rgba(0,30,80,0.18)"
            strokeWidth="1"
          />
          <line
            x1="16" y1="57" x2="105" y2="57"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />
        </svg>

        {/* TAG DOT BADGE */}
        <span
          className={`absolute z-40 -bottom-0.5 right-1.5 w-2.5 h-2.5 rounded-full border border-white shadow-sm ${folder.tagColor === "green"
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
          className={`text-[12px] font-medium text-center line-clamp-2 px-1.5 py-0.5 rounded-[4px] transition-colors leading-[14px] ${isSelected
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
  const [activeBrand, setActiveBrand] = React.useState<BrandFolderData | null>(null);
  const [selectedFolder, setSelectedFolder] = React.useState<BrandFolderData | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");
  const [iconSize, setIconSize] = React.useState<"compact" | "normal" | "large">("normal");
  const [quickLookIndex, setQuickLookIndex] = React.useState<number | null>(null);

  // Keyboard navigation: Escape to go back / close
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (quickLookIndex !== null) {
          setQuickLookIndex(null);
        } else if (activeBrand) {
          setActiveBrand(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, quickLookIndex, activeBrand, onClose]);

  // Lock body scroll when modal is active
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const filteredFolders = REAL_BRAND_FOLDERS.filter((folder) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-5 overflow-hidden transition-opacity duration-300 animate-fadeIn"
      style={{
        /* macOS Wallpaper Style Background Gradient */
        background: '#00000069'
        // background:
        //   "linear-gradient(180deg, #184ea8 0%, #1a57ba 40%, #4684e2 75%, #d89f78 95%, #e6a778 100%)",
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

      {/* macOS Top Menu Bar */}
      {/* <header className="absolute top-0 left-0 right-0 h-7 bg-white/20 backdrop-blur-xl border-b border-white/10 text-white/95 text-[13px] px-4 flex items-center justify-between select-none z-10 shadow-xs">
        <div className="flex items-center gap-4 font-normal">
          <span className="font-semibold text-sm"></span>
          <span className="font-semibold text-white">Finder</span>
          <span className="hidden md:inline hover:text-white cursor-pointer">File</span>
          <span className="hidden md:inline hover:text-white cursor-pointer">Edit</span>
          <span className="hidden md:inline hover:text-white cursor-pointer">View</span>
          <span className="hidden md:inline hover:text-white cursor-pointer">Go</span>
          <span className="hidden md:inline hover:text-white cursor-pointer">Window</span>
          <span className="hidden md:inline hover:text-white cursor-pointer">Help</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/85 font-medium">
          <span className="hidden sm:inline">Brand Identity System</span>
          <span className="text-white/40">|</span>
          <span>Macintosh HD</span>
          <span>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </header> */}

      {/* Main macOS Finder Window */}
      <div
        className="relative w-full max-w-5xl h-[86vh] max-h-[860px] bg-[#fbfbfd]/95 backdrop-blur-2xl rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.45)] flex flex-col overflow-hidden text-slate-800 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "macOsWindowPop 380ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Window Chrome Titlebar */}
        <div className="h-13 bg-[#ebebef]/90 border-b border-black/[0.08] px-4 flex items-center justify-between select-none shrink-0">
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
                if (activeBrand) setActiveBrand(null);
                else setSelectedFolder(null);
              }}
              title="Minimize"
            >
              <span className="opacity-0 group-hover:opacity-100 font-bold leading-none">−</span>
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-[9px] text-[#006500] opacity-90 hover:opacity-100 group transition-all cursor-pointer shadow-2xs"
              aria-label="Zoom"
              onClick={() => setIconSize((s) => (s === "normal" ? "large" : s === "large" ? "compact" : "normal"))}
              title="Toggle size"
            >
              <span className="opacity-0 group-hover:opacity-100 font-bold leading-none">+</span>
            </button>
          </div>

          {/* Breadcrumb Path Bar & Back Button */}
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium overflow-hidden">
            {activeBrand ? (
              <button
                type="button"
                onClick={() => setActiveBrand(null)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-200/80 hover:bg-slate-300 text-slate-800 font-medium text-xs transition-colors cursor-pointer shadow-2xs"
              >
                <span>‹</span>
                <span>All Brands</span>
              </button>
            ) : null}

            <span className="text-slate-400 hidden sm:inline">Macintosh HD</span>
            <span className="text-slate-300 hidden sm:inline">›</span>
            <span
              className={`cursor-pointer hover:underline ${activeBrand ? "text-slate-500" : "text-slate-900 font-semibold"
                }`}
              onClick={() => setActiveBrand(null)}
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
                  className={`p-1 rounded text-xs transition-all cursor-pointer ${viewMode === "grid"
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
                  className={`p-1 rounded text-xs transition-all cursor-pointer ${viewMode === "table"
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
                className="w-28 sm:w-40 h-7 pl-6 pr-2 bg-white/90 border border-slate-300/80 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-2xs"
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

        {/* Window Body: Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* macOS Finder Left Sidebar */}
          {/* <aside className="w-44 sm:w-52 bg-[#f4f4f7]/80 border-r border-black/[0.06] p-3 flex flex-col justify-between select-none text-xs text-slate-700 hidden sm:flex shrink-0">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
                Brand Categories
              </span>
              <ul className="mt-1 space-y-0.5">
                {categories.map((item) => (
                  <li key={item.val}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(item.val);
                        setActiveBrand(null);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors cursor-pointer ${activeCategory === item.val && !activeBrand
                        ? "bg-[#007aff] text-white font-medium"
                        : "hover:bg-black/[0.05] text-slate-700"
                        }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === item.val && !activeBrand
                          ? "bg-white/25 text-white"
                          : "bg-slate-200 text-slate-500"
                          }`}
                      >
                        {item.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
                  System Tags
                </span>
                <div className="mt-1.5 px-2 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Live Brands</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Luxury Retail</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    <span>Clinical Safety</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>Fintech & Web3</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white/70 border border-slate-200 text-[11px] text-slate-500">
              <strong className="text-slate-800 block mb-0.5">Interaction Hint:</strong>
              Click any folder to scroll through its full image gallery. Press <kbd className="px-1 py-0.5 bg-slate-100 rounded border border-slate-300 text-[10px]">Esc</kbd> to exit.
            </div>
          </aside> */}

          {/* Main Stage */}
          <main className="flex-1 flex flex-col overflow-hidden bg-white/75">
            {activeBrand ? (
              /* ========================================================= */
              /* Brand Folder Page: Scrollable Brand Images Gallery View  */
              /* ========================================================= */
              <div className="flex-1 flex flex-col overflow-hidden animate-fadeIn">
                {/* Brand Folder Info Header */}
                <div className="p-4 sm:p-5 border-b border-slate-200 bg-white/90 backdrop-blur-md flex flex-col gap-2 shrink-0">
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shadow-2xs shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeBrand.previewImage}
                          alt={activeBrand.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                          {activeBrand.name}
                        </h2>
                        {/* <span className="text-xs text-slate-500">
                          {activeBrand.category} · {activeBrand.galleryImages.length} assets · {activeBrand.size}
                        </span> */}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveBrand(null)}
                      className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200"
                    >
                      <span className="text-xs">‹ Back to Folders</span>
                    </button>
                  </div>

                  {/* <p className="text-xs text-slate-600 leading-relaxed max-w-3xl pt-1">
                    {activeBrand.description}
                  </p> */}

                  {/* <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeBrand.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div> */}
                </div>

                {/* SCROLLABLE VIEW: Images of the selected brand */}

                <div className="flex-1 p-2 sm:p-2 overflow-y-auto">

                  {/* Masonry / Free-flow Gallery */}
                  <div className="columns-1 sm:columns-2 lg:columns-2 gap-2 space-y-2">

                    {activeBrand.galleryImages
                      .filter(
                        (img) =>
                          searchQuery.trim() === "" ||
                          img.caption.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((img, idx) => (
                        <div
                          key={img.src + idx}
                          onClick={() => setQuickLookIndex(idx)}
                          className="group relative mb-5 break-inside-avoid overflow-hidden rounded-sm bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          {/* Image */}
                          <img
                            src={img.src}
                            alt={img.caption}
                            loading="lazy"
                            className="block w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                            <span className="text-white text-xs font-medium">
                              {img.caption}
                            </span>

                            <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm shrink-0">
                              View ↗
                            </span>
                          </div>
                        </div>
                      ))}

                  </div>

                  {/* Gallery Footer */}
                  <div className="py-6 text-center text-xs text-slate-400">
                    End of {activeBrand.name} gallery · {activeBrand.galleryImages.length} assets
                  </div>

                </div>

              </div>
            ) : viewMode === "grid" ? (
              /* ========================================================= */
              /* Root View: Light Grid Layout of macOS Folder Icons        */
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
                      onClick={() => {
                        setSelectedFolder(folder);
                        setActiveBrand(folder);
                      }}
                      onDoubleClick={() => {
                        setSelectedFolder(folder);
                        setActiveBrand(folder);
                      }}
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
                          onClick={() => {
                            setSelectedFolder(folder);
                            setActiveBrand(folder);
                          }}
                          className={`border-b border-slate-100 cursor-pointer transition-colors ${isSel
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
              ? `${activeBrand.galleryImages.length} items in ${activeBrand.name}`
              : `${filteredFolders.length} folders available`}
          </span>
          <span>142.8 GB available on Macintosh HD</span>
        </footer>
      </div>

      {/* Lightbox / Quick Look Overlay when clicking an image inside a brand */}
      {activeBrand && quickLookIndex !== null && (
        <div
          className="fixed inset-0 z-[100000] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setQuickLookIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-10 bg-slate-800/90 px-4 flex items-center justify-between text-white text-xs select-none">
              <span className="font-semibold truncate">
                {activeBrand.name} — {activeBrand.galleryImages[quickLookIndex].caption}
              </span>
              <button
                type="button"
                onClick={() => setQuickLookIndex(null)}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black/90 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeBrand.galleryImages[quickLookIndex].src}
                alt={activeBrand.galleryImages[quickLookIndex].caption}
                className="w-full h-full object-contain p-4"
              />

              {activeBrand.galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setQuickLookIndex((prev) =>
                        prev === null || prev === 0
                          ? activeBrand.galleryImages.length - 1
                          : prev - 1
                      )
                    }
                    className="absolute left-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-lg font-bold cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setQuickLookIndex((prev) =>
                        prev === null || prev === activeBrand.galleryImages.length - 1
                          ? 0
                          : prev + 1
                      )
                    }
                    className="absolute right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-lg font-bold cursor-pointer"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default MacosFolderModal;