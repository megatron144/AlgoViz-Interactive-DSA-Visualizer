import React, { useState, useEffect, useRef } from 'react';
import { generateKnapsackSteps } from '../../algorithms/dp/dpAlgorithms';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { Package, Plus, Check } from 'lucide-react';

export default function KnapsackVisualizer({ onActiveLineChange }) {
  const [items] = useState([
    { name: 'Item 1', weight: 2, value: 3 },
    { name: 'Item 2', weight: 3, value: 4 },
    { name: 'Item 3', weight: 4, value: 5 },
    { name: 'Item 4', weight: 5, value: 8 },
  ]);
  const [capacity, setCapacity] = useState(7);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(80);

  const timerRef = useRef(null);

  const handleStartKnapsack = () => {
    const s = generateKnapsackSteps(items, Number(capacity));
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
          if (step?.chosenVal !== undefined) {
            soundPlayer.playTone(step.chosenVal * 8, 0, 100);
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
    dpTable: Array.from({ length: items.length + 1 }, () => new Array(capacity + 1).fill(0)),
    description: ''
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">2D Dynamic Programming</span>
            <h2 className="text-xl font-display font-black text-white">0/1 Knapsack Problem Visualizer</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-900/90 p-1.5 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-zinc-400 px-1">Max Capacity W:</span>
              {[5, 6, 7, 8, 9].map(w => (
                <button
                  key={w}
                  onClick={() => {
                    setCapacity(w);
                    setSteps([]);
                    setCurrentStepIdx(0);
                    setIsPlaying(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    capacity === w
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {w}kg
                </button>
              ))}
            </div>

            <button
              onClick={handleStartKnapsack}
              className="px-5 py-2 rounded-xl bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10"
            >
              Solve DP Matrix
            </button>
          </div>
        </div>

        {/* Item List Display */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {items.map((item, idx) => (
            <div key={idx} className="bg-zinc-900/90 p-2.5 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white">{item.name}</span>
              <div className="text-zinc-400">
                <span>wt: <b className="text-white">{item.weight}</b></span> | <span>val: <b className="text-white">{item.value}</b></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main DP Table Matrix */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        {/* Description Banner */}
        <div className="min-h-[45px] bg-black/80 rounded-xl p-3 border border-white/15 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-medium">
              {currentStep.description || 'Click Solve DP Matrix to begin table filling.'}
            </span>
          </div>
          {currentStep.maxValue !== undefined && (
            <div className="bg-white text-black font-mono font-black text-xs px-3 py-1 rounded-lg">
              Max Value = ${currentStep.maxValue}
            </div>
          )}
        </div>

        {/* 2D DP Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/90 p-3">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 text-[11px]">
                <th className="py-2 px-3 text-left">i / Item</th>
                {Array.from({ length: capacity + 1 }, (_, w) => (
                  <th key={w} className="py-2 px-2">
                    w={w}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Array.from({ length: items.length + 1 }, (_, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="py-2 px-3 text-left font-bold text-zinc-300">
                    {i === 0 ? 'Base (0)' : `${items[i - 1].name} (w:${items[i - 1].weight}, v:${items[i - 1].value})`}
                  </td>
                  {Array.from({ length: capacity + 1 }, (_, w) => {
                    const val = currentStep.dpTable ? currentStep.dpTable[i][w] : 0;
                    const isCurrentCell = currentStep.i === i && currentStep.w === w;

                    return (
                      <td key={w} className="py-2 px-2">
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
      <ComplexityCard algoKey="knapsack" />
    </div>
  );
}
