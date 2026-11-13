"use client";

import { useEffect, useRef, useState } from "react";
import InfiniteDragCanvas, {
  type CanvasItem,
} from "@/components/mfa/InfiniteDragCanvas";

const artwork: CanvasItem[] = [
  {
    src: "/graphic_designs/nortiqa/webp/nortiqa_1.webp",
    title: "Nortiqa",
    meta: "Travel brand identity",
  },
  {
    src: "/graphic_designs/ani_visa_services/webp/ani_1.webp",
    title: "ANI Visa Services",
    meta: "Campaign design",
  },
  {
    src: "/graphic_designs/studentCare/webp/studnet_care_1.webp",
    title: "Student Care",
    meta: "Social campaign",
  },
  {
    src: "/graphic_designs/QuantHexa/webp/quantHexa_1.webp",
    title: "QuantHexa",
    meta: "Brand design",
  },
  {
    src: "/graphic_designs/inights_carousel/webp/insights_carousel_1.webp",
    title: "Insights",
    meta: "Social media design",
  },
  {
    src: "/graphic_designs/travellersBridge/webp/travellers_bridge_1.webp",
    title: "Travellers Bridge",
    meta: "Campaign design",
  },
  {
    src: "/graphic_designs/tristoneCarouselBanners/webp/tristone_creations_1.webp",
    title: "Tristone Creations",
    meta: "Carousel design",
  },
  {
    src: "/graphic_designs/nortiqa/webp/nortiqa_4.webp",
    title: "Nortiqa",
    meta: "Travel promotion",
  },
  {
    src: "/graphic_designs/ani_visa_services/webp/ani_3.webp",
    title: "ANI Visa Services",
    meta: "Promotional design",
  },
  {
    src: "/graphic_designs/studentCare/webp/studnet_care_6.webp",
    title: "Student Care",
    meta: "Social media artwork",
  },
  {
    src: "/graphic_designs/QuantHexa/webp/quantHexa_2.webp",
    title: "QuantHexa",
    meta: "Visual identity",
  },
  {
    src: "/graphic_designs/inights_carousel/webp/insights_carousel_5.webp",
    title: "Insights",
    meta: "Carousel graphic",
  },
  {
    src: "/graphic_designs/travellersBridge/webp/travellers_bridge_3.webp",
    title: "Travellers Bridge",
    meta: "Travel campaign",
  },
  {
    src: "/graphic_designs/tristoneCarouselBanners/webp/tristone_creations_3.webp",
    title: "Tristone Creations",
    meta: "Social media banner",
  },
];

export default function InfiniteGraphicGallery() {
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
        className="infinite-gallery-preview"
        aria-label="Interactive graphic design canvas"
      >
        <InfiniteDragCanvas
          items={artwork}
          size={100}
          gap={12}
          drift={7}
          tilt={3}
          zoomOut={0.04}
          axis="both"
          onCanvasActivate={() => setIsExpanded(true)}
        />
        <span className="infinite-gallery-hint" aria-hidden="true">
          DRAG TO EXPLORE <span>·</span> TAP TO EXPAND
        </span>
      </section>

      <dialog
        className="infinite-gallery-dialog"
        ref={dialogRef}
        aria-labelledby="infinite-gallery-title"
        onClose={() => setIsExpanded(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeGallery();
        }}
      >
        <div className="infinite-gallery-dialog-content">
          <header className="infinite-gallery-dialog-header">
            <div>
              <p>SELECTED GRAPHIC WORK</p>
              <h2 id="infinite-gallery-title">Graphic design</h2>
            </div>
            <button
              className="infinite-gallery-close"
              type="button"
              aria-label="Close graphic design canvas"
              onClick={closeGallery}
            >
              ×
            </button>
          </header>
          <div className="infinite-gallery-expanded-canvas">
            <InfiniteDragCanvas
              items={artwork}
              size={230}
              gap={18}
              inertia={1.2}
              tilt={6}
              drift={10}
              axis="both"
              wheel
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
