"use client";

import * as React from "react";
import Image from "next/image";

export type FlowStep = {
  stepNumber: number;
  title: string;
  description: string;
  action: string;
  screenSrc?: string;
  screenAlt?: string;
  decisionPoint?: string;
  outcome?: string;
};

export type UserFlow = {
  id: string;
  title: string;
  description: string;
  steps: FlowStep[];
};

export default function UserFlowDiagram({
  flow,
  deviceType = "phone",
}: {
  flow: UserFlow;
  deviceType?: "phone" | "desktop";
}) {
  const [selectedStep, setSelectedStep] = React.useState<number>(1);
  const activeStep =
    flow.steps.find((s) => s.stepNumber === selectedStep) ?? flow.steps[0];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-150 pb-3">
        <h4 className="text-sm sm:text-base font-medium text-neutral-900">
          {flow.title}
        </h4>
        <span className="text-[11px] font-mono text-neutral-400">
          {flow.steps.length} sequential steps
        </span>
      </div>

      <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed max-w-[720px]">
        {flow.description}
      </p>

      {/* Horizontal Flow Stepper Bar */}
      <div className="w-full overflow-x-auto no-scrollbar py-2">
        <div className="flex items-center min-w-max gap-3 px-1">
          {flow.steps.map((step, idx) => {
            const isSelected = selectedStep === step.stepNumber;
            return (
              <React.Fragment key={step.stepNumber}>
                <button
                  type="button"
                  onClick={() => setSelectedStep(step.stepNumber)}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200"
                    }`}
                  >
                    0{step.stepNumber}
                  </span>
                  <span className="text-xs font-medium whitespace-nowrap">
                    {step.title}
                  </span>
                </button>

                {idx < flow.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-neutral-300 font-mono text-xs select-none"
                  >
                    →
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Detailed Inspector */}
      {activeStep && (
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_340px] gap-6 p-6 rounded-2xl bg-[#F9F9F9] border border-neutral-200/90 items-start">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <span className="font-semibold text-neutral-900">
                STAGE 0{activeStep.stepNumber}
              </span>
              <span>/</span>
              <span>ACTION POINT</span>
            </div>

            <h5 className="text-base sm:text-lg font-medium text-neutral-900">
              {activeStep.title}
            </h5>

            <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
              {activeStep.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-200/60 text-xs">
              <div>
                <dt className="text-[10px] font-mono uppercase text-neutral-400 mb-0.5">
                  User Trigger
                </dt>
                <dd className="font-medium text-neutral-800">
                  {activeStep.action}
                </dd>
              </div>

              {activeStep.decisionPoint && (
                <div>
                  <dt className="text-[10px] font-mono uppercase text-amber-600 mb-0.5">
                    Branch Decision
                  </dt>
                  <dd className="text-neutral-700">
                    {activeStep.decisionPoint}
                  </dd>
                </div>
              )}

              {activeStep.outcome && (
                <div className="sm:col-span-2">
                  <dt className="text-[10px] font-mono uppercase text-emerald-600 mb-0.5">
                    Expected Outcome
                  </dt>
                  <dd className="text-neutral-700">{activeStep.outcome}</dd>
                </div>
              )}
            </div>
          </div>

          {/* Screenshot Preview for this step */}
          {activeStep.screenSrc && (
            <div className="w-full flex justify-center">
              <div
                className={`relative overflow-hidden rounded-xl bg-white border border-neutral-200/80 shadow-md ${
                  deviceType === "desktop"
                    ? "w-full aspect-[16/10]"
                    : "w-[180px] sm:w-[200px] aspect-[9/19.5]"
                }`}
              >
                <Image
                  src={activeStep.screenSrc}
                  alt={activeStep.screenAlt ?? activeStep.title}
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
