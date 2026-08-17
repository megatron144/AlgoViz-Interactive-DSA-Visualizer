import React from 'react';
import { Activity, Clock, CheckCircle2, RefreshCw } from 'lucide-react';

export default function StatsDashboard({ stats = {}, isRunning = false, isFinished = false, statusText = '' }) {
  const statEntries = [
    { label: 'Comparisons', value: stats.comparisons ?? '-' },
    { label: 'Swaps / Writes', value: stats.swaps ?? '-' },
    { label: 'Array Accesses', value: stats.accesses ?? '-' },
    { label: 'Visited Elements', value: stats.visitedCount ?? '-' },
    { label: 'Path Length', value: stats.pathLength ?? '-' },
    { label: 'Total Cost', value: stats.cost ?? '-' },
  ].filter(s => s.value !== '-');

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
      {/* Execution Status Badge */}
      <div className="glass-card rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 border border-white/10 flex flex-col justify-between">
        <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs font-mono">
          <span>Status</span>
          {isRunning ? (
            <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
          ) : isFinished ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          ) : (
            <Activity className="w-3.5 h-3.5 text-zinc-400" />
          )}
        </div>
        <div className="mt-1.5 sm:mt-2">
          <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
            isFinished
              ? 'bg-white text-black'
              : isRunning
              ? 'bg-zinc-800 text-white border border-white/20'
              : 'bg-zinc-900 text-zinc-400'
          }`}>
            {isFinished ? 'Completed' : isRunning ? 'Running' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Dynamic Metric Boxes */}
      {statEntries.slice(0, 4).map((stat) => (
        <div key={stat.label} className="glass-card rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 border border-white/10 flex flex-col justify-between">
          <span className="text-zinc-400 text-[10px] sm:text-xs font-mono truncate">{stat.label}</span>
          <span className="text-base sm:text-xl font-display font-bold text-white tracking-tight mt-0.5 sm:mt-1">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
