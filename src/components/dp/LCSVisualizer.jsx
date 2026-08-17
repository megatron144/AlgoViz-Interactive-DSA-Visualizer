import React, { useState, useEffect, useRef } from 'react';
import { generateLCSSteps } from '../../algorithms/dp/dpAlgorithms';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { AlignLeft, Play, Sparkles } from 'lucide-react';

export default function LCSVisualizer({ onActiveLineChange }) {
  const [string1, setString1] = useState('STONE');
  const [string2, setString2] = useState('LONGEST');
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(80);

  const timerRef = useRef(null);

  const handleStartLCS = () => {
    const s1 = string1.trim().toUpperCase() || 'ABC';
    const s2 = string2.trim().toUpperCase() || 'AC';
    const s = generateLCSSteps(s1, s2);
    setSteps(s);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          const next = currentStepIdx + 1;
          setCurrentStepIdx(next);

          const step = steps[next];
          if (step?.match) {
            soundPlayer.playTone(600, 0, 1000);
          } else if (step?.val !== undefined) {
            soundPlayer.playTone(step.val * 40, 0, 500);
          }

          if (next === steps.length - 1) {
            setIsPlaying(false);
            soundPlayer.playCompletionSweep();
            confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
          }
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIdx, steps, speed]);

  const currentStep = steps[currentStepIdx] || {
    dpTable: Array.from({ length: string1.length + 1 }, () => new Array(string2.length + 1).fill(0)),
    description: ''
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">String Matching DP</span>
            <h2 className="text-xl font-display font-black text-white">Longest Common Subsequence (LCS)</h2>
          </div>

          <div className="flex items-center gap-2">
            {[
              { s1: 'STONE', s2: 'LONGEST' },
              { s1: 'ALGORITHM', s2: 'LOGARITHM' },
              { s1: 'DYNAMIC', s2: 'PROGRAM' }
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setString1(p.s1);
                  setString2(p.s2);
                  setSteps([]);
                  setCurrentStepIdx(0);
                  setIsPlaying(false);
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 text-xs font-mono text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white transition-all"
              >
                {p.s1} & {p.s2}
              </button>
            ))}
          </div>
        </div>

        {/* Input Strings */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-zinc-900/90 p-1.5 sm:p-2 rounded-xl border border-white/10">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Str 1:</span>
            <input
              type="text"
              value={string1}
              onChange={e => setString1(e.target.value.toUpperCase())}
              className="w-20 sm:w-28 bg-black border border-white/15 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-mono text-white text-center uppercase"
            />
            <span className="text-zinc-500 font-mono text-xs">&</span>
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Str 2:</span>
            <input
              type="text"
              value={string2}
              onChange={e => setString2(e.target.value.toUpperCase())}
              className="w-20 sm:w-28 bg-black border border-white/15 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-mono text-white text-center uppercase"
            />
            <button
              onClick={handleStartLCS}
              className="px-3 sm:px-4 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10 touch-manipulation"
            >
              Solve LCS
            </button>
          </div>
        </div>
      </div>

      {/* Main LCS Matrix */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border border-white/10 space-y-3 sm:space-y-4">
        {/* Description Banner */}
        <div className="min-h-[40px] sm:min-h-[45px] bg-black/80 rounded-xl p-2.5 sm:p-3 border border-white/15 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
            <span className="text-white font-medium">
              {currentStep.description || 'Click Solve LCS Matrix to inspect string matching recurrence.'}
            </span>
          </div>
          {currentStep.lcsStr && (
            <div className="bg-white text-black font-mono font-black text-xs px-2.5 sm:px-3 py-1 rounded-lg">
              LCS = "{currentStep.lcsStr}" (Len: {currentStep.lcsLength})
            </div>
          )}
        </div>

        {/* 2D DP Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/90 p-2.5 sm:p-3 touch-scroll">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 text-[10px] sm:text-[11px]">
                <th className="py-2 px-2 sm:px-3 text-left">i \ j</th>
                <th className="py-2 px-1.5 sm:px-2">∅ (0)</th>
                {string2.split('').map((c, j) => (
                  <th key={j} className="py-2 px-1.5 sm:px-2 font-bold text-white">
                    {c} ({j + 1})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Array.from({ length: string1.length + 1 }, (_, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="py-2 px-3 text-left font-bold text-white">
                    {i === 0 ? '∅ (0)' : `${string1[i - 1]} (${i})`}
                  </td>
                  {Array.from({ length: string2.length + 1 }, (_, j) => {
                    const val = currentStep.dpTable ? currentStep.dpTable[i][j] : 0;
                    const isCurrentCell = currentStep.i === i && currentStep.w === j || (currentStep.i === i && currentStep.j === j);

                    return (
                      <td key={j} className="py-2 px-2">
                        <div className={`p-1.5 rounded-lg transition-all ${
                          isCurrentCell
                            ? 'bg-white text-black font-black shadow-md scale-105'
                            : val > 0
                            ? 'bg-zinc-900 text-white font-bold border border-white/10'
                            : 'text-zinc-600'
                        }`}>
                          {val}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Playback Controls */}
        <PlaybackControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onReset={() => {
            setCurrentStepIdx(0);
            setIsPlaying(false);
          }}
          onStepForward={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}
          onStepBackward={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
          currentStep={currentStepIdx}
          totalSteps={steps.length}
          speed={speed}
          onSpeedChange={setSpeed}
          onScrub={idx => {
            setCurrentStepIdx(idx);
            setIsPlaying(false);
          }}
          disabled={steps.length === 0}
        />
      </div>

      {/* Complexity Card */}
      <ComplexityCard algoKey="lcs" />
    </div>
  );
}
