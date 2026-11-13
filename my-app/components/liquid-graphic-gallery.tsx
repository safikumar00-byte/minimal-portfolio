"use client";

import { useEffect, useRef, useState } from "react";
import LiquidGlassCarousel, {
  type GlassItem,
} from "@/components/mfa/LiquidGlassCarousel";

const artwork: GlassItem[] = [
  {
    src: "/graphic_designs/nortiqa/webp/nortiqa_1.webp",
    title: "Nortiqa",
  },
  {
    src: "/graphic_designs/ani_visa_services/webp/ani_1.webp",
    title: "ANI Visa Services",
  },
  {
    src: "/graphic_designs/studentCare/webp/studnet_care_1.webp",
    title: "Student Care",
  },
  {
    src: "/graphic_designs/QuantHexa/webp/quantHexa_1.webp",
    title: "QuantHexa",
  },
  {
    src: "/graphic_designs/inights_carousel/webp/insights_carousel_1.webp",
    title: "Insights",
  },
  {
    src: "/graphic_designs/travellersBridge/webp/travellers_bridge_1.webp",
    title: "Travellers Bridge",
  },
  {
    src: "/graphic_designs/tristoneCarouselBanners/webp/tristone_creations_1.webp",
    title: "Tristone Creations",
  },
  {
    src: "/graphic_designs/nortiqa/webp/nortiqa_4.webp",
    title: "Nortiqa",
  },
];

export default function LiquidGraphicGallery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isExpanded && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [isExpanded]);

  const closeGallery = () => dialogRef.current?.close();

  return (
    <>
      <section
        className="liquid-gallery-preview"
        aria-label="Interactive graphic design carousel"
      >
        {!isExpanded && (
          <LiquidGlassCarousel
            items={artwork}
            panelHeight={150}
            gap={12}
            ringColor="#ff6a1f"
            ring={0.45}
            dispersion={6}
            glow={3}
            entry={false}
            className="liquid-carousel-preview"
          />
        )}
        <button
          className="liquid-gallery-expand"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isExpanded}
          aria-label="Expand graphic design carousel"
          onClick={() => setIsExpanded(true)}
        >
          Expand <span aria-hidden="true">↗</span>
        </button>
      </section>

      <dialog
        className="liquid-gallery-dialog"
        ref={dialogRef}
        aria-labelledby="liquid-gallery-title"
        onClose={() => setIsExpanded(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeGallery();
        }}
      >
        <div className="liquid-gallery-dialog-content">
          <header className="liquid-gallery-dialog-header">
            <div>
              <p>SELECTED GRAPHIC WORK</p>
              <h2 id="liquid-gallery-title">Graphic design</h2>
            </div>
            <button
              className="liquid-gallery-close"
              type="button"
              aria-label="Close graphic design carousel"
              onClick={closeGallery}
            >
              ×
            </button>
          </header>
          {isExpanded && (
            <div className="liquid-gallery-expanded-carousel">
              <LiquidGlassCarousel
                items={artwork}
                panelHeight={420}
                gap={24}
                ringColor="#ff6a1f"
                ring={0.7}
                dispersion={9}
                glow={4.2}
                className="liquid-carousel-expanded"
              />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
