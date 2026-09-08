import React, { useState, useEffect, useRef } from 'react';
import { MosAlgorithmModel } from '../../algorithms/advanced/mosAlgorithm';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { 
  Boxes, 
  Plus, 
  Layers, 
  ArrowRightLeft, 
  Sparkles, 
  Hash, 
  CheckCircle2, 
  Clock, 
  Trash2
} from 'lucide-react';

const PRESETS = [
  {
    name: 'Classic Distinct (Default)',
    array: [1, 2, 1, 3, 2, 1, 4, 3, 2],
    queries: [[1, 4], [0, 6], [2, 7], [3, 5], [0, 2]]
  },
  {
    name: 'Repeated Clusters',
    array: [3, 3, 2, 2, 1, 1, 4, 4, 5, 5],
    queries: [[0, 3], [2, 7], [4, 9], [1, 5]]
  },
  {
    name: 'High Variance (12 items)',
    array: [5, 1, 3, 5, 2, 4, 1, 3, 6, 2, 4, 5],
    queries: [[0, 4], [3, 8], [1, 7], [5, 11], [2, 6]]
  }
];

const BLOCK_THEMES = [
  { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
];

export default function MosAlgorithmVisualizer({ onActiveLineChange }) {
  const [array, setArray] = useState(PRESETS[0].array);
  const [queries, setQueries] = useState(PRESETS[0].queries);
  const [newL, setNewL] = useState(0);
  const [newR, setNewR] = useState(4);

  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(250);

  const timerRef = useRef(null);

  // Initialize steps when array or queries change
  const buildSteps = (arr = array, qs = queries) => {
    const m = new MosAlgorithmModel(arr, qs);
    const generatedSteps = m.generateSteps();
    setSteps(generatedSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    buildSteps(array, queries);
  }, [array, queries]);

  // Handle Playback Loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          const next = currentStepIdx + 1;
          setCurrentStepIdx(next);

          const step = steps[next];
          if (step && onActiveLineChange && step.line) {
            onActiveLineChange(step.line);
          }

          // Audio feedback
          if (step?.elementValue !== null && step?.elementValue !== undefined) {
            soundPlayer.playTone(step.elementValue * 45 + 180, 0, 70);
          }

          // Confetti on algorithm finish
          if (next === steps.length - 1 || step?.type === 'COMPLETE') {
            setIsPlaying(false);
            confetti({ particleCount: 50, spread: 70, origin: { y: 0.75 } });
          }
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIdx, steps, speed, onActiveLineChange]);

  const currentStep = steps[currentStepIdx] || steps[0] || null;

  // Add custom query
  const handleAddQuery = () => {
    const l = Math.max(0, Math.min(Number(newL), array.length - 1));
    const r = Math.max(l, Math.min(Number(newR), array.length - 1));
    const updated = [...queries, [l, r]];
    setQueries(updated);
  };

  // Remove query
  const handleRemoveQuery = (index) => {
    if (queries.length <= 1) return;
    const updated = queries.filter((_, idx) => idx !== index);
    setQueries(updated);
  };

  // Load Preset
  const handleLoadPreset = (preset) => {
    setArray(preset.array);
    setQueries(preset.queries);
    setNewL(0);
    setNewR(Math.min(preset.array.length - 1, 4));
  };

  // Reset to step 0
  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
    if (steps[0] && onActiveLineChange) {
      onActiveLineChange(steps[0].line);
    }
  };

  const blockSize = currentStep?.blockSize || Math.max(1, Math.floor(Math.sqrt(array.length)));
  const currL = currentStep?.currL ?? 0;
  const currR = currentStep?.currR ?? -1;
  const freqMap = currentStep?.freq || {};
  const distinctCount = currentStep?.distinctCount || 0;

  return (
    <div className="space-y-6">
      {/* Top Header Card & Configuration Bar */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-blue-400" />
                Square Root Decomposition & Two Pointers
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white">
              Mo's Algorithm Visualizer <span className="text-xs font-mono font-normal text-zinc-400 ml-2">O((N + Q)√N)</span>
            </h2>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Presets:</span>
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadPreset(preset)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 text-xs font-mono text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white transition-all shadow-sm"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Row: Query Builder & Array Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1.5 rounded-xl border border-white/10">
              <span className="text-[11px] font-mono text-zinc-400 pl-1">Add Query [L, R]:</span>
              <input
                type="number"
                min="0"
                max={array.length - 1}
                value={newL}
                onChange={e => setNewL(Number(e.target.value))}
                className="w-12 bg-black border border-white/15 rounded-lg px-1.5 py-1 text-xs font-mono text-white text-center"
              />
              <span className="text-zinc-500 font-mono text-xs">to</span>
              <input
                type="number"
                min={newL}
                max={array.length - 1}
                value={newR}
                onChange={e => setNewR(Number(e.target.value))}
                className="w-12 bg-black border border-white/15 rounded-lg px-1.5 py-1 text-xs font-mono text-white text-center"
              />
              <button
                onClick={handleAddQuery}
                className="px-2.5 py-1 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/70 px-3 py-2 rounded-xl border border-white/5">
              <span>Array Size (N): <strong className="text-white">{array.length}</strong></span>
              <span className="text-zinc-600">|</span>
              <span>Block Size (B = ⌊√N⌋): <strong className="text-blue-400">{blockSize}</strong></span>
              <span className="text-zinc-600">|</span>
              <span>Total Blocks: <strong className="text-white">{Math.ceil(array.length / blockSize)}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left / Top Stage: √N Blocked Array with Two-Pointer Window */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Status & Step Banner */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-md">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-white'}`} />
              <span className="text-white font-medium">
                {currentStep?.description || 'Press Play or Step Forward to start offline processing.'}
              </span>
            </div>

            {currentStep?.currentQuery && (
              <div className="flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5" />
                <span>Evaluating Query #{currentStep.currentQuery.id} [{currentStep.currentQuery.l}, {currentStep.currentQuery.r}]</span>
              </div>
            )}
          </div>

          {/* Visual Array Canvas with √N Decomposition */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-400" />
                <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Decomposed Array Canvas
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> currL: {currL}
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" /> currR: {currR}
                </span>
              </div>
            </div>

            {/* Array Cells grouped by √N Blocks */}
            <div className="overflow-x-auto pb-4 pt-2">
              <div className="flex items-end gap-2 sm:gap-3 min-w-max">
                {array.map((val, idx) => {
                  const blockIdx = Math.floor(idx / blockSize);
                  const theme = BLOCK_THEMES[blockIdx % BLOCK_THEMES.length];
                  const inWindow = currL <= idx && idx <= currR;
                  const isCurrL = idx === currL;
                  const isCurrR = idx === currR;
                  const isJustAdded = currentStep?.elementIndex === idx && currentStep?.activeAction?.startsWith('EXPAND');
                  const isJustRemoved = currentStep?.elementIndex === idx && currentStep?.activeAction?.startsWith('CONTRACT');

                  return (
                    <div key={idx} className="flex flex-col items-center space-y-1.5">
                      {/* Top Pointer Badges */}
                      <div className="h-6 flex items-center justify-center">
                        {isCurrL && isCurrR ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-gradient-to-r from-emerald-400 to-rose-400 text-black shadow-md animate-bounce">
                            L=R
                          </span>
                        ) : isCurrL ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-emerald-400 text-black shadow-md shadow-emerald-500/40 animate-pulse">
                            currL
                          </span>
                        ) : isCurrR ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-black bg-rose-400 text-black shadow-md shadow-rose-500/40 animate-pulse">
                            currR
                          </span>
                        ) : null}
                      </div>

                      {/* Element Box */}
                      <div
                        className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex flex-col items-center justify-between p-1.5 border transition-all duration-300 relative ${
                          inWindow
                            ? 'bg-zinc-800/90 border-white/70 shadow-lg shadow-white/10 scale-105 z-10'
                            : `${theme.bg} ${theme.border} opacity-75`
                        } ${isJustAdded ? 'ring-4 ring-emerald-400 scale-110' : ''} ${
                          isJustRemoved ? 'ring-4 ring-rose-500 scale-95 opacity-50' : ''
                        }`}
                      >
                        {/* Block indicator tag */}
                        <span className={`text-[9px] font-mono font-bold px-1 rounded ${theme.badge}`}>
                          B{blockIdx}
                        </span>

                        {/* Element Value */}
                        <span className={`font-mono text-base sm:text-lg font-black ${
                          inWindow ? 'text-white' : 'text-zinc-300'
                        }`}>
                          {val}
                        </span>

                        {/* Index */}
                        <span className="text-[10px] font-mono text-zinc-500">
                          #{idx}
                        </span>

                        {/* Active Window Bottom Bar Indicator */}
                        {inWindow && (
                          <div className="absolute -bottom-1 inset-x-2 h-0.5 bg-gradient-to-r from-emerald-400 via-white to-rose-400 rounded-full" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Block Legend Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-zinc-400">
              <span className="text-zinc-500">√N Block Partitioning:</span>
              {Array.from({ length: Math.ceil(array.length / blockSize) }).map((_, bIdx) => {
                const theme = BLOCK_THEMES[bIdx % BLOCK_THEMES.length];
                const start = bIdx * blockSize;
                const end = Math.min(array.length - 1, start + blockSize - 1);
                return (
                  <span key={bIdx} className={`px-2 py-0.5 rounded-md border ${theme.badge}`}>
                    Block {bIdx}: [{start}..{end}]
                  </span>
                );
              })}
            </div>
          </div>

          {/* Live Frequency Map & Distinct Elements Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Live Frequency Map */}
            <div className="sm:col-span-8 glass-card rounded-2xl p-4 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-emerald-400" /> Live Window Frequency Map: count[x]
                </span>
                <span className="text-[11px] font-mono text-zinc-500">Window: [{currL}..{currR}]</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 min-h-[44px]">
                {Object.keys(freqMap).length === 0 ? (
                  <span className="text-xs font-mono text-zinc-600 italic">
                    Window is empty (currL {'>'} currR). Frequency table is 0.
                  </span>
                ) : (
                  Object.entries(freqMap).map(([elementVal, count]) => (
                    <div
                      key={elementVal}
                      className="flex items-center gap-1.5 bg-zinc-900 border border-white/15 px-3 py-1.5 rounded-xl text-xs font-mono shadow-sm transition-all"
                    >
                      <span className="text-zinc-400">val(<strong>{elementVal}</strong>):</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {count}×
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Distinct Elements Big Metric Gauge */}
            <div className="sm:col-span-4 glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between items-center text-center bg-gradient-to-b from-white/[0.04] to-transparent">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Distinct Count
              </span>
              <div className="my-1">
                <span className="text-4xl font-display font-black text-white tracking-tight drop-shadow-md">
                  {distinctCount}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                Unique values in active range
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Offline Queries Queue (Original vs Mo's Sorted) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Mo's Sorted Queries
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-md border border-white/5">
                Block & Zig-Zag Order
              </span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {(currentStep?.sortedQueries && currentStep.sortedQueries.length > 0
                ? currentStep.sortedQueries
                : queries.map((q, idx) => ({ id: idx, l: q[0], r: q[1], block: Math.floor(q[0] / blockSize) }))
              ).map((q, qIndex) => {
                const isActive = currentStep?.currentQuery?.id === q.id;
                const isDone = q.ans !== null && q.ans !== undefined;
                const blockTheme = BLOCK_THEMES[q.block % BLOCK_THEMES.length];

                return (
                  <div
                    key={q.id}
                    className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between text-xs font-mono ${
                      isActive
                        ? 'bg-blue-500/20 border-blue-400 shadow-md shadow-blue-500/20 ring-1 ring-blue-400'
                        : isDone
                        ? 'bg-zinc-900/90 border-emerald-500/40 text-zinc-300'
                        : 'bg-zinc-900/60 border-white/5 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-400">#{q.id}</span>
                      <span className="text-white font-mono font-semibold">
                        [{q.l}, {q.r}]
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${blockTheme.badge}`}>
                        B{q.block}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Ans: {q.ans}
                        </span>
                      ) : isActive ? (
                        <span className="text-blue-300 font-bold animate-pulse">
                          Active...
                        </span>
                      ) : (
                        <span className="text-zinc-600">Pending</span>
                      )}

                      <button
                        onClick={() => handleRemoveQuery(qIndex)}
                        className="text-zinc-600 hover:text-rose-400 transition-colors p-1"
                        title="Remove Query"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/5">
              💡 Queries in the same block are sorted by R. In odd blocks, R is sorted in descending order (Zig-Zag) to eliminate unnecessary cursor traversal.
            </p>
          </div>
        </div>
      </div>

      {/* Playback Controls Component */}
      <PlaybackControls
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onReset={handleReset}
        onStepForward={() => {
          if (currentStepIdx < steps.length - 1) {
            const next = currentStepIdx + 1;
            setCurrentStepIdx(next);
            if (steps[next]?.line && onActiveLineChange) onActiveLineChange(steps[next].line);
          }
        }}
        onStepBackward={() => {
          if (currentStepIdx > 0) {
            const prev = currentStepIdx - 1;
            setCurrentStepIdx(prev);
            if (steps[prev]?.line && onActiveLineChange) onActiveLineChange(steps[prev].line);
          }
        }}
        currentStep={currentStepIdx}
        totalSteps={steps.length}
        speed={speed}
        onSpeedChange={val => setSpeed(Number(val))}
        onScrub={idx => {
          setCurrentStepIdx(idx);
          if (steps[idx]?.line && onActiveLineChange) onActiveLineChange(steps[idx].line);
        }}
      />

      {/* Embedded Complexity Analysis Card */}
      <ComplexityCard algoKey="mos-algorithm" />
    </div>
  );
}
