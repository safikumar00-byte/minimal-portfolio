"use client";

import * as React from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Icon Folder — a glass folder with app icons fanned out of it.       */
/*  Pops in when it scrolls into view; hover / tap / Enter spreads the  */
/*  icons wider. The folder tab shape is drawn to the real card width. */
/* ------------------------------------------------------------------ */

export type FolderIcon = {
  /** Image URL of an app icon (square works best). */
  src?: string;
  /** Or any custom node (SVG, emoji, component). */
  node?: React.ReactNode;
  /** Tile background behind `node`. */
  background?: string;
  label?: string;
};

export type IconFolderProps = {
  title?: string;
  tags?: string[];
  icons?: FolderIcon[];
  theme?: "dark" | "light";
  /** Start spread open (no hover needed). */
  defaultOpen?: boolean;
  /** Horizontal distance between fanned icons, px. */
  spread?: number;
  /** Small icon pill in the corner of the folder. */
  showPill?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

/* ---------- default content ---------- */

/* Brand marks from real brand gallery portfolio */
export const DEFAULT_ICONS: FolderIcon[] = [
  {
    label: "Urban Sprouts",
    background: "linear-gradient(135deg, #73b743, #285027)",
    node: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand-gallery/urban-sprouts/icon.svg"
        alt="Urban Sprouts"
        className="w-[100%] h-[100%] object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
      />
    ),
  },
  {
    label: "Lunex",
    background: "linear-gradient(135deg, #2b2b2b, #121212)",
    node: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand-gallery/lunex/icon.svg"
        alt="Lunex"
        className="w-[100%] h-[100%] object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
      />
    ),
  },
  {
    label: "Volt Matrix",
    background: "linear-gradient(135deg, #059669, #022c22)",
    node: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand-gallery/volt-matrix/c39dc9235525379.68d9375e00cde.jpg"
        alt="Volt Matrix"
        className="w-[100%] h-[100%] object-cover rounded-[16px] shadow-sm"
      />
    ),
  },
  {
    label: "Moon Safe",
    background: "linear-gradient(135deg, #02100c7, #082f49)",
    node: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand-gallery/moon-safe/mockup kit.jpg"
        alt="Moon Safe"
        className="w-[100%] h-[100%] object-cover rounded-[16px] shadow-sm"
      />
    ),
  },
  {
    label: "SFX Forex",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    node: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand-gallery/sfx-forex/icon.png"
        alt="SFX Forex"
        className="w-[100%] h-[100%] object-contain"
      />
    ),
  },
  {
    label: "Bug Bloons",
    background: "linear-gradient(135deg, #ea580c, #9a3412)",
    node: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand-gallery/bug-bloons/1.jpg"
        alt="Bug Bloons"
        className="w-[100%] h-[100%] object-cover rounded-[16px] shadow-sm"
      />
    ),
  },
];

export const DEFAULTS = {
  title: "Brand Identity",
  tags: ["Urban Sprouts", "Lunex", "Volt Matrix", "Moon Safe"],
  icons: DEFAULT_ICONS.slice(0, 4),
};

export const THEMES = {
  dark: {
    ink: "#ffffff",
    chipBg: "rgba(36, 36, 36, 0.75)",
    chipBorder: "#2e2e2e",
    chipInk: "#a1a1aa",
    backFill: "rgba(24, 24, 28, 0.8)",
    backEdge: "rgba(255, 255, 255, 0.15)",
    frontBg: "rgba(18, 18, 20, 0.9)",
    frontEdge: ["rgba(255, 255, 255, 0.45)", "rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0)"],
    glow: "rgba(255, 255, 255, 0.12)",
    pillBg: "rgba(0, 0, 0, 0.65)",
    pillBorder: "rgba(255, 255, 255, 0.12)",
    tileRing: "rgba(255, 255, 255, 0.15)",
    tileShadow: "rgba(0, 0, 0, 0.6)",
    focus: "rgba(255, 255, 255, 0.45)",
  },
  light: {
    ink: "#0f172a",
    chipBg: "rgba(255, 255, 255, 0.92)",
    chipBorder: "rgba(0, 0, 0, 0.14)",
    chipInk: "#1e293b",
    backFill: "rgba(235, 237, 243, 0.95)",
    backEdge: "rgba(0, 0, 0, 0.16)",
    frontBg: "rgba(255, 255, 255, 0.98)",
    frontEdge: ["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.14)", "rgba(0, 0, 0, 0.08)"],
    glow: "rgba(99, 102, 241, 0.16)",
    pillBg: "rgba(255, 255, 255, 0.95)",
    pillBorder: "rgba(0, 0, 0, 0.14)",
    tileRing: "rgba(0, 0, 0, 0.1)",
    tileShadow: "rgba(0, 0, 0, 0.18)",
    focus: "rgba(0, 0, 0, 0.45)",
  },
} as const;

/* folder outlines: front pocket has its tab on the left, back plate on the right */
export const pathL = (
  w: number,
  h: number,
  r: number,
  d: number,
  tw: number,
  s: number
) =>
  `M0 ${r}A${r} ${r} 0 0 1 ${r} 0L${tw} 0C${tw + s * 0.55} 0 ${tw + s * 0.45} ${d} ${tw + s} ${d}L${w - r} ${d}A${r} ${r} 0 0 1 ${w} ${d + r}L${w} ${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}L${r} ${h}A${r} ${r} 0 0 1 0 ${h - r}Z`;

export const pathR = (
  w: number,
  h: number,
  r: number,
  d: number,
  tw: number,
  s: number
) => {
  const x = w - tw;
  return `M0 ${d + r}A${r} ${r} 0 0 1 ${r} ${d}L${x - s} ${d}C${x - s * 0.45} ${d} ${x - s * 0.55} 0 ${x} 0L${w - r} 0A${r} ${r} 0 0 1 ${w} ${r}L${w} ${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}L${r} ${h}A${r} ${r} 0 0 1 0 ${h - r}Z`;
};

function useShape(
  ref: React.RefObject<HTMLDivElement | null>,
  make: (w: number, h: number) => string
) {
  const [d, setD] = React.useState(() => make(380, 180));

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth || 380;
      const h = el.offsetHeight || 180;
      setD(make(w, h));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return d;
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => { };
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function Tile({
  icon,
  ring,
  shadow,
}: {
  icon: FolderIcon;
  ring: string;
  shadow: string;
}) {
  return (
    <div
      className="grid h-full w-full place-items-center overflow-hidden rounded-[inherit]"
      style={{
        background: icon.src ? undefined : icon.background ?? "#2a2a2a",
        boxShadow: `0 18px 40px ${shadow}, 0 0 0 1px ${ring}`,
      }}
    >
      {icon.src ? (
        <Image
          alt={icon.label || ""}
          className="h-full w-full object-cover"
          draggable={false}
          src={icon.src}
          width={101}
          height={101}
          unoptimized
        />
      ) : (
        icon.node
      )}
    </div>
  );
}

export function IconFolder(props: IconFolderProps) {
  const { title, tags, icons } = { ...DEFAULTS, ...props };
  const {
    theme = "dark",
    defaultOpen = false,
    spread = 70,
    showPill = true,
    className = "",
  } = props;
  const t = THEMES[theme];
  const gid = React.useId().replace(/:/g, "");

  const rootRef = React.useRef<HTMLDivElement>(null);
  const frontRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(true);

  const [openOverride, setOpenOverride] = React.useState<{
    defaultOpen: boolean;
    value: boolean;
  }>({
    defaultOpen,
    value: defaultOpen,
  });

  const open =
    openOverride.defaultOpen === defaultOpen
      ? openOverride.value
      : defaultOpen;

  const setOpen = React.useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      setOpenOverride((curr) => {
        const base =
          curr.defaultOpen === defaultOpen ? curr.value : defaultOpen;
        const nextVal = typeof next === "function" ? next(base) : next;
        return { defaultOpen, value: nextVal };
      });
    },
    [defaultOpen]
  );

  const [hover, setHover] = React.useState(false);
  const [hi, setHi] = React.useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frontD = useShape(frontRef, (w, h) =>
    pathL(w, h, 24, 24, Math.round(w * 0.42), 46)
  );
  const backD = useShape(backRef, (w, h) =>
    pathR(w, h, 24, 24, Math.round(w * 0.4), 46)
  );

  const n = icons.length;
  const rs = n > 1 ? 25 / (n - 1) : 0; // degrees of tilt per step
  const wide = open || hover;
  const lift = wide;
  const ease = "cubic-bezier(.2,.8,.2,1)";
  const toggle = (e?: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    setOpen((o) => !o);
    if (e && "clientX" in e) {
      props.onClick?.(e);
    }
  };

  return (
    <div
      aria-expanded={open}
      aria-label={`${title}: ${tags.join(", ")}`}
      className={`relative isolate h-[286px] w-full max-w-[420px] cursor-pointer select-none outline-none [-webkit-tap-highlight-color:transparent] focus-visible:rounded-3xl focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 ${className}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        setHi(null);
      }}
      ref={rootRef}
      role="button"
      style={{
        color: t.ink,
        fontFamily:
          "'Geist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        letterSpacing: "-0.05em",
        outlineColor: t.focus,
        zIndex: lift ? 2 : undefined,
        opacity: shown || reduced ? 1 : 0,
        transform:
          shown || reduced
            ? lift
              ? "translateY(-6px) scale(1.02)"
              : "none"
            : "translateY(34px) scale(.92)",
        transition: reduced
          ? "none"
          : `transform .9s ${ease}, opacity .6s ease`,
      }}
      tabIndex={0}
    >
      {/* soft glow behind the folder */}
      <div
        className="pointer-events-none absolute left-[8%] right-[8%] top-10 -z-10 h-[200px] rounded-full opacity-80 blur-[18px]"
        style={{
          background: `radial-gradient(closest-side, ${t.glow}, transparent)`,
        }}
      />

      {/* back plate */}
      <div
        className="absolute inset-x-0 bottom-0 top-[14px]"
        ref={backRef}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id={`back-fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme === "dark" ? "#28282e" : "#f4f6fb"}
                stopOpacity={theme === "dark" ? "0.7" : "0.95"}
              />
              <stop
                offset="100%"
                stopColor={theme === "dark" ? "#16161a" : "#dee2ed"}
                stopOpacity={theme === "dark" ? "0.5" : "0.9"}
              />
            </linearGradient>
          </defs>
          <path
            d={backD}
            fill={`url(#back-fill-${gid})`}
            stroke={t.backEdge}
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* fanned icons */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {icons.map((icon, i) => {
          const k = i - (n - 1) / 2;
          const gap = wide ? spread * 1.15 : spread;
          const y = k * k * 9 - (wide ? 4 : 0);
          const rot = k * rs * (wide ? 1.2 : 1);
          return (
            <div
              className="absolute left-1/2 top-[42px] -ml-[50.5px] h-[101px] w-[101px] rounded-[26px] [backface-visibility:hidden]"
              key={i}
              style={{
                zIndex: hi === i ? 5 : undefined,
                opacity: shown || reduced ? 1 : 0,
                transform:
                  shown || reduced
                    ? `translate3d(${k * gap}px, ${y}px, 0) rotate(${rot}deg)`
                    : `translate3d(${k * spread * 0.6}px, 80px, 0)`,
                transition: reduced
                  ? "none"
                  : `transform ${wide ? 0.6 : 0.9}s ${ease}, opacity .5s`,
                transitionDelay: reduced
                  ? "0s"
                  : wide
                    ? `${i * 0.04}s`
                    : `${0.35 + i * 0.08}s`,
              }}
            >
              <div
                className="pointer-events-auto relative h-full w-full rounded-[inherit]"
                onPointerEnter={(e) => e.pointerType === "mouse" && setHi(i)}
                onPointerLeave={() => setHi((h) => (h === i ? null : h))}
                style={{
                  transform:
                    hi === i
                      ? `translateY(-26px) rotate(${-rot}deg) scale(1.1)`
                      : hi !== null
                        ? "scale(.96)"
                        : "none",
                  filter:
                    hi !== null && hi !== i
                      ? "saturate(.75) brightness(.85)"
                      : "none",
                  transition: reduced
                    ? "none"
                    : `transform .45s ${ease}, filter .3s ease`,
                }}
              >
                <Tile icon={icon} ring={t.tileRing} shadow={t.tileShadow} />
                {icon.label && (
                  <span
                    className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium leading-4 backdrop-blur-[8px]"
                    style={{
                      background: t.pillBg,
                      borderColor: t.pillBorder,
                      color: t.ink,
                      opacity: hi === i ? 1 : 0,
                      transform: `translateX(-50%) translateY(${hi === i ? 0 : 6
                        }px)`,
                      transition: reduced
                        ? "none"
                        : `opacity .25s ease, transform .35s ${ease}`,
                    }}
                  >
                    {icon.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* glass front pocket */}
      <div
        className="absolute inset-x-0 bottom-0 h-[180px] overflow-hidden rounded-b-[24px]"
        ref={frontRef}
        style={{
          transform: lift ? "translateY(6px)" : "none",
          transition: reduced ? "none" : `transform .6s ${ease}`,
          filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.08))",
        }}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id={`front-fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme === "dark" ? "#222228" : "#ffffff"}
                stopOpacity={theme === "dark" ? "0.92" : "0.96"}
              />
              <stop
                offset="100%"
                stopColor={theme === "dark" ? "#101012" : "#f0f0f5"}
                stopOpacity={theme === "dark" ? "0.85" : "0.92"}
              />
            </linearGradient>
            <linearGradient id={`edge-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={t.frontEdge[0]} />
              <stop offset=".35" stopColor={t.frontEdge[1]} />
              <stop offset="1" stopColor={t.frontEdge[2]} />
            </linearGradient>
          </defs>
          <path
            d={frontD}
            fill={`url(#front-fill-${gid})`}
            stroke={`url(#edge-${gid})`}
            strokeWidth="1.5"
          />
        </svg>

        {/* content within the pocket */}
        <div className="relative z-10 h-full w-full">
          <h3 className="m-0 px-[18px] pt-[34px] text-xl font-medium leading-[26px]">
            {title}
          </h3>
          <div className="mx-[18px] mt-3.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                className="h-6 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5 shadow-sm backdrop-blur-[7px]"
                key={tag}
                style={{
                  background: t.chipBg,
                  borderColor:
                    hi !== null && icons[hi]?.label === tag
                      ? t.focus
                      : t.chipBorder,
                  color:
                    hi !== null && icons[hi]?.label === tag ? t.ink : t.chipInk,
                  transition: "border-color .25s ease, color .25s ease",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {showPill && (
            <span
              aria-hidden="true"
              className="absolute bottom-3.5 right-3.5 flex h-[34px] items-center gap-1.5 rounded-full border px-1.5 shadow-sm backdrop-blur-[8px]"
              style={{ background: t.pillBg, borderColor: t.pillBorder }}
            >
              {icons.map((icon, i) => (
                <span
                  className="block h-[22px] w-[22px] overflow-hidden rounded-[7px]"
                  key={i}
                >
                  <span
                    className="grid h-full w-full place-items-center [&_svg]:h-[60%] [&_svg]:w-[60%]"
                    style={{
                      background: icon.src ? undefined : icon.background,
                    }}
                  >
                    {icon.src ? (
                      <Image
                        alt={icon.label || ""}
                        className="h-full w-full object-cover"
                        src={icon.src}
                        width={22}
                        height={22}
                        unoptimized
                      />
                    ) : (
                      icon.node
                    )}
                  </span>
                </span>
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default IconFolder;
