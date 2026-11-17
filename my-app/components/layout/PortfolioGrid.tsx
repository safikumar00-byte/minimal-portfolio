"use client";

import * as React from "react";

export type PortfolioGridProps = {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
  as?: React.ElementType;
};

export default function PortfolioGrid({
  children,
  columns = 3,
  className = "",
  as: Component = "div",
}: PortfolioGridProps) {
  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Component
      className={`grid ${colClass} gap-6 md:gap-8 lg:gap-10 items-start w-full ${className}`}
    >
      {children}
    </Component>
  );
}
