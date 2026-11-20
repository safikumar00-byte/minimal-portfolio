"use client";

import * as React from "react";
import TransitionLink from "@/components/transition-link";
import AdmitOneTicket, {
  TICKET_GEOMETRY,
  TICKET_LAYOUT,
  TICKET_TEXTURE,
  TICKET_GRADIENT,
} from "@/components/ui/admit-one-ticket";
import useIsClient from "@/hooks/useIsClient";

export type PortfolioTicketProps = {
  presenter?: string;
  name?: string;
  event?: string;
  venue?: string;
  dates?: string;
  stubText?: string;
  watermark?: string;
  href?: string;
  width?: number;
  className?: string;
  tilt?: boolean | { maxTilt?: number; scale?: number; glare?: number };
};

export const PORTFOLIO_TICKET_DEFAULTS = {
  presenter: "INTERACTIVE EXPERIENCES PRESENT",
  name: "GAME & CAMPAIGN\nLANDING PAGES",
  event: "",
  venue: "CREATIVE DEVELOPMENT",
  dates: "DIGITAL EXPERIENCES",
  stubText: "EXPLORE",
  watermark: "PLAY",
  href: "/work/game-campaigns",
};

export default function PortfolioTicket(props: PortfolioTicketProps) {
  const {
    presenter = PORTFOLIO_TICKET_DEFAULTS.presenter,
    name = PORTFOLIO_TICKET_DEFAULTS.name,
    event = PORTFOLIO_TICKET_DEFAULTS.event,
    venue = PORTFOLIO_TICKET_DEFAULTS.venue,
    dates = PORTFOLIO_TICKET_DEFAULTS.dates,
    stubText = PORTFOLIO_TICKET_DEFAULTS.stubText,
    watermark = PORTFOLIO_TICKET_DEFAULTS.watermark,
    href,
    width: fixedWidth,
    className = "",
    tilt = true,
  } = props;
  const ticketHref = Object.prototype.hasOwnProperty.call(props, "href")
    ? href
    : PORTFOLIO_TICKET_DEFAULTS.href;
  const isClient = useIsClient();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = React.useState<number>(360);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || fixedWidth) return;

    const updateWidth = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        // Constrain width to reasonable bounds so it fits comfortably within card
        const targetWidth = Math.min(Math.round(rect.width), 480);
        setMeasuredWidth(targetWidth);
      }
    };

    updateWidth();
    const ro = new ResizeObserver(() => updateWidth());
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixedWidth]);

  const ticketWidth = fixedWidth ?? (isClient ? measuredWidth : 360);
  const ticketHeight = Math.round(ticketWidth / TICKET_GEOMETRY.aspect);

  const ticketElement = (
    <div
      ref={containerRef}
      className={`portfolio-ticket-wrapper flex items-center justify-center w-full overflow-visible select-none ${className}`}
      style={{
        minHeight: `${ticketHeight}px`,
        background: "transparent",
      }}
    >
      <AdmitOneTicket
        presenter={presenter}
        name={name}
        event={event}
        venue={venue}
        dates={dates}
        stubText={stubText}
        watermark={watermark}
        width={ticketWidth}
        geometry={TICKET_GEOMETRY}
        layout={TICKET_LAYOUT}
        texture={TICKET_TEXTURE}
        gradient={TICKET_GRADIENT}
        tilt={tilt}
      />
    </div>
  );

  if (ticketHref) {
    return (
      <TransitionLink
        href={ticketHref}
        className="portfolio-ticket-anchor group block w-full outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-4 rounded-xl transition-transform duration-200"
        aria-label={`${name.replace(/\n/g, " ")} — ${presenter} (${venue})`}
      >
        {ticketElement}
      </TransitionLink>
    );
  }

  return ticketElement;
}
