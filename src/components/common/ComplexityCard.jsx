import React from 'react';
import { ALGO_DETAILS } from '../../utils/complexityData';
import { BookOpen, Check, Layers, Cpu } from 'lucide-react';

export default function ComplexityCard({ algoKey }) {
  const details = ALGO_DETAILS[algoKey] || {
    name: 'Algorithm Details',
    timeComplexity: { best: 'O(1)', average: 'O(N)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Interactive visualization mode.',
    keyPoints: []
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
      {/* Title & Category */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              {details.category || 'Algorithm Theory'}
            </span>
          </div>
          <h3 className="text-xl font-display font-black text-white mt-0.5">
            {details.name}
          </h3>
        </div>
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white">
          <BookOpen className="w-5 h-5" />
        </div>
      </div>

      {/* Complexity Matrix Table */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-900/90 p-3 rounded-xl border border-white/5">
          <span className="text-[10px] uppercase font-mono text-zinc-400">Best Time</span>
          <p className="text-sm font-mono font-bold text-white mt-1">
            {details.timeComplexity?.best || '-'}
          </p>
        </div>

        <div className="bg-zinc-900/90 p-3 rounded-xl border border-white/5">
          <span className="text-[10px] uppercase font-mono text-zinc-400">Average Time</span>
          <p className="text-sm font-mono font-bold text-white mt-1">
            {details.timeComplexity?.average || '-'}
          </p>
        </div>

        <div className="bg-zinc-900/90 p-3 rounded-xl border border-white/5">
          <span className="text-[10px] uppercase font-mono text-zinc-400">Worst Time</span>
          <p className="text-sm font-mono font-bold text-white mt-1">
            {details.timeComplexity?.worst || '-'}
          </p>
        </div>

        <div className="bg-zinc-900/90 p-3 rounded-xl border border-white/5">
          <span className="text-[10px] uppercase font-mono text-zinc-400">Aux Space</span>
          <p className="text-sm font-mono font-bold text-white mt-1">
            {details.spaceComplexity || '-'}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 className="text-xs font-mono font-bold uppercase text-zinc-300">Overview</h4>
        <p className="text-xs leading-relaxed text-zinc-400">
          {details.description}
        </p>
      </div>

      {/* Key Highlights */}
      {details.keyPoints && details.keyPoints.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase text-zinc-300">Key Highlights</h4>
          <ul className="space-y-1.5">
            {details.keyPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
