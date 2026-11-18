"use client";

import * as React from "react";
import FadeContent from "@/components/motion/FadeContent";

export type PortfolioPreloaderProps = {
  onComplete?: () => void;
  minDuration?: number;
};

const COUNTER_DURATION = 1400;
const FADE_DURATION = 1400;
const CONTENT_FADE_DURATION = 0.2;

export default function PortfolioPreloader({
  onComplete,
  minDuration = COUNTER_DURATION,
}: PortfolioPreloaderProps) {
  const onCompleteRef = React.useRef(onComplete);
  const hasNotifiedRef = React.useRef(false);
  const [counter, setCounter] = React.useState(0);
  const [isFading, setIsFading] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  React.useEffect(() => {
    const duration = Math.max(1, minDuration);
    const startTime = performance.now();
    let animationFrameId = 0;
    let fadeTimerId = 0;

    const renderFrame = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCounter(Math.floor(easedProgress * 100));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
        return;
      }

      setCounter(100);
      if (!hasNotifiedRef.current) {
        hasNotifiedRef.current = true;
        onCompleteRef.current?.();
      }
      setIsFading(true);
      fadeTimerId = window.setTimeout(() => setIsFinished(true), FADE_DURATION);
    };

    animationFrameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(fadeTimerId);
    };
  }, [minDuration]);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[var(--z-preloader)] flex items-center justify-center bg-black transition-opacity ease-out ${
        isFading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      aria-hidden="true"
    >
      <FadeContent
        className="font-mono text-[256px] font-medium text-white"
        effect="mist"
        trigger="mount"
        duration={CONTENT_FADE_DURATION}
        initialOpacity={0}
        disappearAfter={Math.max(
          minDuration / 1000 - CONTENT_FADE_DURATION,
          0,
        )}
        disappearDuration={0.45}
      >
        <span>{counter}</span>
      </FadeContent>
    </div>
  );
}
