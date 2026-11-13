"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SiteHeader() {
  const [localTime, setLocalTime] = useState("");

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
      <Link className="wordmark" href="/">Sunil Kumar Reddy</Link>
      <nav className="top-nav" aria-label="Main navigation">
        <Link href="/about">About</Link>
        <a href="/Sunil_Kumar_Reddy.pdf" download>
          Résumé <span aria-hidden="true">↗</span>
        </a>
        <span className="location">
          Visakhapatnam, IN <time>{localTime || "—:—"}</time>
        </span>
      </nav>
    </header>
  );
}
