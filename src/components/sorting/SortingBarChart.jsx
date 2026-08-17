import React from 'react';

export default function SortingBarChart({
  array = [],
  comparing = [],
  swapping = [],
  pivot = null,
  sorted = [],
  maxVal = 100,
  height = 360,
  showLabels = true
}) {
  const max = Math.max(maxVal, ...array, 1);

  return (
    <div 
      className="w-full flex items-end justify-center gap-1.5 px-3 py-6 bg-black/95 rounded-2xl border border-white/10 overflow-hidden relative"
      style={{ height: `${height}px` }}
    >
      {array.map((val, idx) => {
        const heightPercent = Math.max(8, (val / max) * 100);
        const isComparing = comparing.includes(idx);
        const isSwapping = swapping.includes(idx);
        const isPivot = pivot === idx;
        const isSorted = sorted.includes(idx);

        let barBg = 'bg-zinc-800 border-zinc-700';
        let textGlow = 'text-zinc-400';

        if (isSorted) {
          barBg = 'bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]';
          textGlow = 'text-white font-bold';
        } else if (isSwapping) {
          barBg = 'bg-zinc-200 border-white shadow-[0_0_16px_rgba(255,255,255,0.8)] scale-y-105';
          textGlow = 'text-white font-black';
        } else if (isComparing) {
          barBg = 'bg-zinc-500 border-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]';
          textGlow = 'text-white font-bold';
        } else if (isPivot) {
          barBg = 'bg-zinc-700 border-2 border-white';
          textGlow = 'text-white font-bold';
        }

        return (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center justify-end h-full min-w-[6px] max-w-[40px] transition-all duration-100 ease-out"
          >
            {/* Value Label above bar */}
            {showLabels && array.length <= 32 && (
              <span className={`text-[10px] font-mono mb-1 select-none transition-colors ${textGlow}`}>
                {val}
              </span>
            )}

            {/* Bar Body */}
            <div
              className={`w-full rounded-t-lg border transition-all duration-100 ${barBg}`}
              style={{ height: `${heightPercent}%` }}
            />

            {/* Index Label below bar */}
            {showLabels && array.length <= 20 && (
              <span className="text-[9px] font-mono text-zinc-600 mt-1 select-none">
                {idx}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
