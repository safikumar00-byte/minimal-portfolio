"use client";

import * as React from "react";

export type PortfolioContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: "default" | "narrow" | "full";
};

/**
 * Standardized global grid container ensuring pixel-consistent outer margins,
 * maximum content bounds, and responsive padding across Home, About, and Case Studies.
 */
export default function PortfolioContainer({
  children,
  className = "",
  as: Component = "div",
  size = "default",
}: PortfolioContainerProps) {
  const sizeClasses =
    size === "narrow"
      ? "max-w-[1240px]"
      : size === "full"
      ? "max-w-none"
      : "max-w-[1560px]";

  return (
    <Component
      className={`portfolio-container w-full ${sizeClasses} mx-auto px-5 sm:px-8 md:px-12 ${className}`}
    >
      {children}
    </Component>
  );
}
