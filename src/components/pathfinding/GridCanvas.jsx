import React, { useRef } from 'react';
import { Flag, Navigation, ShieldAlert, Waves } from 'lucide-react';

export default function GridCanvas({
  grid = [],
  visitedNodes = [],
  shortestPath = [],
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  mode = 'wall' // 'wall' | 'weight' | 'start' | 'target' | 'erase'
}) {
  const visitedSet = new Set(visitedNodes.map(n => `${n.row},${n.col}`));
  const pathSet = new Set(shortestPath.map(n => `${n.row},${n.col}`));
  const lastTouchedCellRef = useRef(null);

  const handleTouchStart = (e, r, c) => {
    lastTouchedCellRef.current = `${r},${c}`;
    if (onMouseDown) onMouseDown(r, c);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!targetElement) return;

    const cellElement = targetElement.closest('[data-grid-cell="true"]');
    if (cellElement) {
      const r = parseInt(cellElement.getAttribute('data-row'), 10);
      const c = parseInt(cellElement.getAttribute('data-col'), 10);
      const key = `${r},${c}`;
      if (lastTouchedCellRef.current !== key && !isNaN(r) && !isNaN(c)) {
        lastTouchedCellRef.current = key;
        if (onMouseEnter) onMouseEnter(r, c);
      }
    }
  };

  const handleTouchEnd = () => {
    lastTouchedCellRef.current = null;
    if (onMouseUp) onMouseUp();
  };

  return (
    <div 
      className="w-full overflow-x-auto select-none bg-black/95 p-2 sm:p-3 rounded-2xl border border-white/10 flex items-center justify-start sm:justify-center touch-scroll"
      onMouseLeave={onMouseUp}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div className="grid gap-[2px] bg-zinc-950 p-1.5 sm:p-2 rounded-xl border border-white/5 inline-block mx-auto">
        {grid.map((row, r) => (
          <div key={`row-${r}`} className="flex gap-[2px]">
            {row.map((cell, c) => {
              const key = `${r},${c}`;
              const isStart = cell.isStart;
              const isTarget = cell.isTarget;
              const isWall = cell.isWall;
              const isWeight = cell.weight > 1;
              const isPath = pathSet.has(key);
              const isVisited = visitedSet.has(key);

              let cellStyle = 'bg-zinc-900 border border-white/5 hover:border-white/30';

              if (isStart) {
                cellStyle = 'bg-white text-black font-black border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]';
              } else if (isTarget) {
                cellStyle = 'bg-white text-black font-black border-white shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse';
              } else if (isPath) {
                cellStyle = 'bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-wave-grow';
              } else if (isVisited) {
                cellStyle = 'bg-zinc-700/80 border-white/20 shadow-[0_0_6px_rgba(255,255,255,0.2)] animate-wave-grow';
              } else if (isWall) {
                cellStyle = 'bg-zinc-950 border-zinc-700 shadow-inner';
              } else if (isWeight) {
                cellStyle = 'bg-zinc-800 border-dashed border-white/40';
              }

              return (
                <div
                  key={`cell-${r}-${c}`}
                  data-grid-cell="true"
                  data-row={r}
                  data-col={c}
                  onMouseDown={() => onMouseDown(r, c)}
                  onMouseEnter={() => onMouseEnter(r, c)}
                  onMouseUp={onMouseUp}
                  onTouchStart={(e) => handleTouchStart(e, r, c)}
                  className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center cursor-pointer transition-all duration-150 touch-manipulation ${cellStyle}`}
                >
                  {isStart ? (
                    <Navigation className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black text-black" />
                  ) : isTarget ? (
                    <Flag className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black text-black" />
                  ) : isWeight ? (
                    <span className="text-[8px] sm:text-[9px] font-mono text-zinc-300 font-bold">5</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
