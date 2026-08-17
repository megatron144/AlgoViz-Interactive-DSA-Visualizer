import React from 'react';
import { ALGO_DETAILS } from '../../utils/complexityData';
import { BookOpen, ExternalLink, Code2, Trophy } from 'lucide-react';

export default function ComplexityCard({ algoKey }) {
  const details = ALGO_DETAILS[algoKey] || {
    name: 'Algorithm Details',
    timeComplexity: { best: 'O(1)', average: 'O(N)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Interactive visualization mode.',
    keyPoints: [],
    practiceProblems: []
  };

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
      case 'medium':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'hard':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      default:
        return 'text-zinc-300 bg-zinc-800 border-zinc-700';
    }
  };

  const getPlatformBadge = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'leetcode':
        return 'text-amber-300 bg-amber-950/40 border-amber-600/40';
      case 'codeforces':
        return 'text-blue-300 bg-blue-950/40 border-blue-600/40';
      case 'cses':
        return 'text-purple-300 bg-purple-950/40 border-purple-600/40';
      default:
        return 'text-zinc-400 bg-zinc-900 border-zinc-700';
    }
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

      {/* Practice Problems Section (LeetCode & Codeforces) */}
      {details.practiceProblems && details.practiceProblems.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-white" />
              <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                Curated Practice Problems
              </h4>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              LeetCode & Codeforces
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {details.practiceProblems.map((prob, idx) => (
              <a
                key={idx}
                href={prob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-white/20 transition-all duration-200"
              >
                <div className="flex flex-col gap-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border font-semibold ${getPlatformBadge(prob.platform)}`}>
                      {prob.platform}
                    </span>
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border font-semibold ${getDifficultyColor(prob.difficulty)}`}>
                      {prob.difficulty}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">
                    {prob.title}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
