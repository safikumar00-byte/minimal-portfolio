"use client";

import * as React from "react";

export default function EditorialRulerGrid() {
  return (
    <div
      className="editorial-ruler-bar select-none pointer-events-none mb-6 hidden md:block"
      aria-hidden="true"
    >
      {/* Top architectural coordinate line */}
      {/* <div className="flex items-center justify-between text-[10px] font-mono text-[#A0A3A8] pb-1.5 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="text-[#55585D] font-semibold">GRID // 3-COL SYSTEM</span>
          <span className="text-[#D5D7DA]">/</span>
          <span>MODULAR DATUM</span>
        </div>
        <div className="flex items-center gap-3">
          <span>COLS: 03 [1fr]</span>
          <span className="text-[#D5D7DA]">/</span>
          <span>SCALE 1:1</span>
        </div>
      </div> */}

      {/* 3 Column Identifiers strictly matching the 3-column grid */}
      <div className="grid grid-cols-3 gap-6 text-[10px] font-mono text-[#A0A3A8] py-1 border-[#E9EAEC]">
        <div className="flex items-center justify-between pr-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#55585D]">01</span>
            <span className="text-[#D5D7DA]">/</span>
            <span className="text-[9px] text-[#A0A3A8]">COL_L</span>
          </div>
          <span className="text-[9px] text-[#D5D7DA] font-mono">+ 00.0%</span>
        </div>

        <div className="flex items-center justify-between pr-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#55585D]">02</span>
            <span className="text-[#D5D7DA]">/</span>
            <span className="text-[9px] text-[#A0A3A8]">COL_M</span>
          </div>
          <span className="text-[9px] text-[#D5D7DA] font-mono">+ 33.3%</span>
        </div>

        <div className="flex items-center justify-between pr-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#55585D]">03</span>
            <span className="text-[#D5D7DA]">/</span>
            <span className="text-[9px] text-[#A0A3A8]">COL_R</span>
          </div>
          <span className="text-[9px] text-[#D5D7DA] font-mono">+ 66.6%</span>
        </div>
      </div>

      {/* Precision horizontal measurement ruler */}
      <div className="editorial-ruler-ticks h-[8px] w-full border-b border-[#E9EAEC]" />
    </div>
  );
}
