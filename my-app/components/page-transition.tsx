"use client";

import * as React from "react";
import usePortfolioAnimations from "@/components/animations/usePortfolioAnimations";

export default function PageTransition({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  usePortfolioAnimations(containerRef);

  return (
    <div ref={containerRef} className={`page-transition-wrapper ${className}`}>
      {children}
    </div>
  );
}
