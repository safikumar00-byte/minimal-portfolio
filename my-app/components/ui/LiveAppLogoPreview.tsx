"use client";

import * as React from "react";
import {
  GlassIconReveal,
  MARK_CREDBUDDHA,
  MARK_KARYOTICA,
  MARK_21ST,
} from "@/components/ui/liquid-glass-logo-reveal";

export { MARK_CREDBUDDHA, MARK_KARYOTICA, MARK_21ST };

export interface LiveAppLogoPreviewProps {
  logo?: string;
  label?: string;
  look?: "light" | "dark";
  background?: string;
  logoColor?: string;
  tileSize?: number;
  speed?: number;
  className?: string;
}

export function LiveAppLogoPreview({
  logo = MARK_KARYOTICA,
  label = "Karyotica Labs",
  look = "light",
  background = "#fff",
  logoColor = "#86bb46",
  tileSize = 200,
  speed = 1,
  className = "",
}: LiveAppLogoPreviewProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden flex items-center justify-center ${className}`}>
      <div className="overlay"></div>
      <GlassIconReveal
        background={background}
        className="h-full w-full"
        finalScale={0.82}
        label={label}
        logo={logo}
        logoColor={logoColor}
        logoScale={0.65}
        look={look}
        loop={true}
        speed={speed}
        tileSize={tileSize}
      />
    </div>
  );
}

export default LiveAppLogoPreview;
