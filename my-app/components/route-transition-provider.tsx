"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionPhase = "idle" | "exit" | "enter";

type RouteTransitionContextValue = {
  phase: TransitionPhase;
  navigate: (href: string, replace: boolean, scroll: boolean) => void;
};

const RouteTransitionContext =
  React.createContext<RouteTransitionContextValue | null>(null);

const EXIT_DURATION = 180;
const ENTER_DURATION = 420;
const NAVIGATION_TIMEOUT = 2500;

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = React.useState<TransitionPhase>("idle");
  const phaseRef = React.useRef<TransitionPhase>("idle");
  const previousPathname = React.useRef(pathname);
  const exitTimer = React.useRef<number | null>(null);
  const enterTimer = React.useRef<number | null>(null);
  const fallbackTimer = React.useRef<number | null>(null);

  const clearTimer = React.useCallback((timer: React.RefObject<number | null>) => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const updatePhase = React.useCallback((nextPhase: TransitionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  React.useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    clearTimer(exitTimer);
    clearTimer(fallbackTimer);
    updatePhase("enter");
    clearTimer(enterTimer);
    enterTimer.current = window.setTimeout(() => {
      updatePhase("idle");
      enterTimer.current = null;
    }, ENTER_DURATION);
  }, [pathname, clearTimer, updatePhase, clearTimer]);

  React.useEffect(() => {
    const handlePopState = () => {
      clearTimer(exitTimer);
      clearTimer(fallbackTimer);
      clearTimer(enterTimer);
      updatePhase("enter");
      enterTimer.current = window.setTimeout(() => {
        updatePhase("idle");
        enterTimer.current = null;
      }, ENTER_DURATION);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      clearTimer(exitTimer);
      clearTimer(enterTimer);
      clearTimer(fallbackTimer);
    };
  }, [clearTimer, updatePhase]);

  const navigate = React.useCallback(
    (href: string, replace: boolean, scroll: boolean) => {
      if (phaseRef.current === "exit") return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (replace) router.replace(href, { scroll });
        else router.push(href, { scroll });
        return;
      }

      clearTimer(exitTimer);
      clearTimer(enterTimer);
      clearTimer(fallbackTimer);
      updatePhase("exit");

      exitTimer.current = window.setTimeout(() => {
        exitTimer.current = null;
        try {
          if (replace) router.replace(href, { scroll });
          else router.push(href, { scroll });
        } catch (error) {
          clearTimer(fallbackTimer);
          updatePhase("idle");
          throw error;
        }
      }, EXIT_DURATION);

      fallbackTimer.current = window.setTimeout(() => {
        fallbackTimer.current = null;
        clearTimer(exitTimer);
        updatePhase("idle");
      }, NAVIGATION_TIMEOUT);
    },
    [clearTimer, router, updatePhase],
  );

  const contextValue = React.useMemo(
    () => ({ navigate, phase }),
    [navigate, phase],
  );

  return (
    <RouteTransitionContext.Provider value={contextValue}>
      <div className="route-transition-shell">
        {children}
        <div
          aria-hidden="true"
          className={`route-transition-overlay route-transition-overlay--${phase}`}
        />
      </div>
    </RouteTransitionContext.Provider>
  );
}

export function RouteTransitionContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = React.useContext(RouteTransitionContext);

  if (!context) {
    throw new Error(
      "RouteTransitionContent must be used within RouteTransitionProvider.",
    );
  }

  return (
    <div
      className="route-transition-content"
      data-transition-phase={context.phase}
    >
      {children}
    </div>
  );
}

export function useRouteTransition() {
  const context = React.useContext(RouteTransitionContext);
  if (!context) {
    throw new Error("TransitionLink must be used within RouteTransitionProvider.");
  }
  return context.navigate;
}
