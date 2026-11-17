"use client";

import * as React from "react";
import UserFlowDiagram, { type UserFlow } from "./UserFlowDiagram";
import StateFlowGallery, { type StateFlow } from "./StateFlowGallery";

export type ProjectFlowsData = {
  userFlows?: UserFlow[];
  stateFlows?: StateFlow[];
};

export default function ProjectFlowsSection({
  flowsData,
  deviceType = "phone",
}: {
  flowsData: ProjectFlowsData;
  deviceType?: "phone" | "desktop";
}) {
  const { userFlows = [], stateFlows = [] } = flowsData;

  const hasUserFlows = userFlows.length > 0;
  const hasStateFlows = stateFlows.length > 0;

  const [activeTab, setActiveTab] = React.useState<"user-flows" | "state-flows">(
    hasUserFlows ? "user-flows" : "state-flows"
  );

  const [selectedUserFlowId, setSelectedUserFlowId] = React.useState<string>(
    userFlows[0]?.id ?? ""
  );
  const [selectedStateFlowId, setSelectedStateFlowId] = React.useState<string>(
    stateFlows[0]?.id ?? ""
  );

  const activeUserFlow =
    userFlows.find((f) => f.id === selectedUserFlowId) ?? userFlows[0];
  const activeStateFlow =
    stateFlows.find((f) => f.id === selectedStateFlowId) ?? stateFlows[0];

  if (!hasUserFlows && !hasStateFlows) return null;

  return (
    <section
      id="flows"
      aria-labelledby="heading-flows"
      className="w-full mb-14 sm:mb-18 scroll-mt-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
            EXPERIENCE ARCHITECTURE
          </span>
          <h2
            id="heading-flows"
            className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900"
          >
            User Flows &amp; Interface States
          </h2>
        </div>

        {/* Primary Interactive Tabs: User Flows | State Flows */}
        <div
          role="tablist"
          aria-label="Experience Architecture Views"
          className="inline-flex p-1 rounded-lg bg-neutral-100 border border-neutral-200/80 self-start sm:self-auto"
        >
          {hasUserFlows && (
            <button
              role="tab"
              type="button"
              aria-selected={activeTab === "user-flows"}
              onClick={() => setActiveTab("user-flows")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === "user-flows"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              User Flows
            </button>
          )}

          {hasStateFlows && (
            <button
              role="tab"
              type="button"
              aria-selected={activeTab === "state-flows"}
              onClick={() => setActiveTab("state-flows")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === "state-flows"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              State Flows
            </button>
          )}
        </div>
      </div>

      {/* Multiple Flow Selector (if a project defines > 1 flow in the active tab) */}
      {activeTab === "user-flows" && userFlows.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {userFlows.map((flow) => (
            <button
              key={flow.id}
              type="button"
              onClick={() => setSelectedUserFlowId(flow.id)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                selectedUserFlowId === flow.id
                  ? "border-neutral-900 bg-neutral-900 text-white font-medium"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {flow.title}
            </button>
          ))}
        </div>
      )}

      {activeTab === "state-flows" && stateFlows.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {stateFlows.map((flow) => (
            <button
              key={flow.id}
              type="button"
              onClick={() => setSelectedStateFlowId(flow.id)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                selectedStateFlowId === flow.id
                  ? "border-neutral-900 bg-neutral-900 text-white font-medium"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {flow.title}
            </button>
          ))}
        </div>
      )}

      {/* Tab Panels */}
      <div className="case-study-flow-tab-content">
        {activeTab === "user-flows" && activeUserFlow && (
          <UserFlowDiagram flow={activeUserFlow} deviceType={deviceType} />
        )}

        {activeTab === "state-flows" && activeStateFlow && (
          <StateFlowGallery stateFlow={activeStateFlow} deviceType={deviceType} />
        )}
      </div>
    </section>
  );
}
