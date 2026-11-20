"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/transition-link";
import GooeyNav, { type GooeyNavItem } from "@/components/ui/GooeyNav";

const HEADER_ITEMS: GooeyNavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Résumé",
    href: "/Sunil_Kumar_Reddy.pdf",
    download: true,
    icon: <span aria-hidden="true">↗</span>,
  },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [localTime, setLocalTime] = useState("");
  const routeIndex = pathname === "/about" ? 0 : null;
  const [selection, setSelection] = useState({ pathname, index: routeIndex });
  const activeIndex =
    selection.pathname === pathname ? selection.index : routeIndex;

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="site-header">
      <TransitionLink className="wordmark" href="/">Sunil Kumar Reddy</TransitionLink>
      <GooeyNav
        ariaLabel="Main navigation"
        activeIndex={activeIndex}
        onChange={(index) => setSelection({ pathname, index })}
        items={HEADER_ITEMS}
        theme="light"
        size="sm"
        frame
        color="#18181b"
        activeTextColor="#ffffff"
        gooeyness={0.5}
        wobble={0.5}
        particleCount={15}
        spread={56}
        animationTime={600}
        className="site-header-nav"
      />
      <div className="header-meta">
        <span className="location">
          Visakhapatnam, IN <time>{localTime || "—:—"}</time>
        </span>
      </div>
    </header>
  );
}
