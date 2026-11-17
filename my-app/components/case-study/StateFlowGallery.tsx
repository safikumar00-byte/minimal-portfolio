"use client";

import * as React from "react";
import Image from "next/image";

export type StateItem = {
  stateName: string;
  stateType: "default" | "pending" | "success" | "error" | "rejected" | "loading";
  trigger: string;
  userAction: string;
  behavior: string;
  screenSrc?: string;
  screenAlt?: string;
};

export type StateFlow = {
  id: string;
  title: string;
  description: string;
  states: StateItem[];
};

const BADGE_STYLES: Record<StateItem["stateType"], string> = {
  default: "bg-neutral-100 text-neutral-700 border-neutral-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  error: "bg-rose-50 text-rose-700 border-rose-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  loading: "bg-sky-50 text-sky-700 border-sky-200",
};

export default function StateFlowGallery({
  stateFlow,
  deviceType = "phone",
}: {
  stateFlow: StateFlow;
  deviceType?: "phone" | "desktop";
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-150 pb-3">
        <h4 className="text-sm sm:text-base font-medium text-neutral-900">
          {stateFlow.title}
        </h4>
        <span className="text-[11px] font-mono text-neutral-400">
          {stateFlow.states.length} verified interface states
        </span>
      </div>

      <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed max-w-[720px]">
        {stateFlow.description}
      </p>

      {/* Grid of state comparisons */}
      <div
        className={`w-full grid gap-6 ${
          deviceType === "desktop"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {stateFlow.states.map((state, idx) => {
          const badgeClass =
            BADGE_STYLES[state.stateType] ?? BADGE_STYLES.default;

          return (
            <div
              key={state.stateName + idx}
              className="state-card flex flex-col p-4 rounded-2xl bg-[#F9F9F9] border border-neutral-200/80 hover:bg-white hover:border-neutral-300 hover:shadow-sm transition-all"
            >
              {/* Header with state badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-neutral-900">
                  {state.stateName}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass}`}
                >
                  {state.stateType}
                </span>
              </div>

              {/* Screenshot Preview */}
              {state.screenSrc && (
                <div className="w-full flex justify-center my-2">
                  <div
                    className={`relative overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 shadow-sm ${
                      deviceType === "desktop"
                        ? "w-full aspect-[16/10]"
                        : "w-[170px] sm:w-[190px] aspect-[9/19.5]"
                    }`}
                  >
                    <Image
                      src={state.screenSrc}
                      alt={state.screenAlt ?? state.stateName}
                      fill
                      sizes="280px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              )}

              {/* State details */}
              <dl className="mt-3 pt-3 border-t border-neutral-200/60 flex flex-col gap-2 text-xs">
                <div>
                  <dt className="text-[10px] font-mono uppercase text-neutral-400">
                    Trigger Condition
                  </dt>
                  <dd className="text-neutral-700 leading-snug">
                    {state.trigger}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-mono uppercase text-neutral-400">
                    Interface Behavior
                  </dt>
                  <dd className="text-neutral-600 leading-snug">
                    {state.behavior}
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
