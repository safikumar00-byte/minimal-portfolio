"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export type PageTransitionVariant = "fade" | "mist" | "slide" | "curtain";

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
  variant?: PageTransitionVariant;
};

const transitionConfig: Record<
  PageTransitionVariant,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
  },
  mist: {
    from: { autoAlpha: 0, filter: "blur(10px)", y: 8 },
    to: { autoAlpha: 1, filter: "blur(0px)", y: 0 },
  },
  slide: {
    from: { autoAlpha: 0, x: 16 },
    to: { autoAlpha: 1, x: 0 },
  },
  curtain: {
    from: { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
    to: { autoAlpha: 1, clipPath: "inset(0 0 0% 0)" },
  },
};

export default function PageTransition({
  children,
  className = "",
  variant = "mist",
}: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previousPathname = React.useRef(pathname);
  const animationRef = React.useRef<gsap.core.Tween | null>(null);

  React.useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const element = containerRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    animationRef.current?.kill();
    animationRef.current = gsap.fromTo(element, transitionConfig[variant].from, {
      ...transitionConfig[variant].to,
      duration: 0.48,
      ease: "power3.out",
      willChange: "transform, filter",
      clearProps: "transform,filter,willChange,opacity,visibility,clipPath",
    });

    return () => {
      animationRef.current?.kill();
      animationRef.current = null;
      gsap.set(element, {
        clearProps: "transform,filter,willChange,opacity,visibility,clipPath",
      });
    };
  }, [pathname, variant]);

  React.useEffect(
    () => () => {
      animationRef.current?.kill();
      animationRef.current = null;
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className={`page-transition-wrapper ${className}`}
      data-route={pathname}
    >
      {children}
    </div>
  );
}
