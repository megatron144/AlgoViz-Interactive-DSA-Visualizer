import React, { useState, useEffect, useRef } from 'react';
import { SparseTableModel } from '../../algorithms/advanced/sparseTable';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { Table, Search, Zap, Layers } from 'lucide-react';

export default function SparseTableVisualizer({ onActiveLineChange }) {
  const [array, setArray] = useState([4, 2, 7, 1, 9, 3, 6, 8, 5]);
  const [model, setModel] = useState(() => new SparseTableModel([4, 2, 7, 1, 9, 3, 6, 8, 5]));
  const [queryL, setQueryL] = useState(1);
  const [queryR, setQueryR] = useState(7);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(120);

  const timerRef = useRef(null);

  const handleRunBuild = () => {
    const buildSteps = model.generateBuildSteps();
    setSteps(buildSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleRunQuery = () => {
    const qL = Math.max(0, Math.min(queryL, array.length - 1));
    const qR = Math.max(qL, Math.min(queryR, array.length - 1));
    const querySteps = model.generateQuerySteps(qL, qR);
    setSteps(querySteps);
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
          if (step && onActiveLineChange && step.line) {
            onActiveLineChange(step.line);
          }
          if (step?.val !== undefined) {
            soundPlayer.playTone(step.val * 8, 0, 100);
          }
          if (next === steps.length - 1) {
            setIsPlaying(false);
            confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
          }
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIdx, steps, speed]);

  const currentStep = steps[currentStepIdx] || null;

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Static Range Query Matrix</span>
            <h2 className="text-xl font-display font-black text-white">Sparse Table (RMQ) O(1) Engine</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunBuild}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-mono text-xs border border-white/15 hover:border-white/30 transition-all flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" /> Visualize Precomputation O(N log N)
            </button>
          </div>
        </div>

        {/* Range Query Form */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center gap-2 bg-zinc-900/90 p-2 rounded-xl border border-white/10">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Search className="w-3.5 h-3.5" /> Query Range [L, R]:
            </span>
            <input
              type="number"
              min="0"
              max={array.length - 1}
              value={queryL}
              onChange={e => setQueryL(Number(e.target.value))}
              className="w-14 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
              placeholder="L"
            />
            <span className="text-zinc-500 font-mono">to</span>
            <input
              type="number"
              min="0"
              max={array.length - 1}
              value={queryR}
              onChange={e => setQueryR(Number(e.target.value))}
              className="w-14 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
              placeholder="R"
            />
            <button
              onClick={handleRunQuery}
              className="px-4 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10"
            >
              Execute O(1) RMQ
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Array Strip on top, 2D Sparse Table matrix below */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
        {/* Step Description */}
        <div className="min-h-[45px] bg-black/80 rounded-xl p-3 border border-white/15 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-medium">
              {currentStep?.description || 'Click "Visualize Precomputation" or "Execute O(1) RMQ" to start.'}
            </span>
          </div>
          {currentStep?.result !== undefined && (
            <div className="bg-white text-black font-display font-black text-sm px-3 py-1 rounded-lg">
              Min = {currentStep.result}
            </div>
          )}
        </div>

        {/* Input Array Strip */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-zinc-400">Array Elements:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {array.map((val, idx) => {
              const inQuery = currentStep?.L !== undefined && idx >= currentStep.L && idx <= currentStep.R;
              const inBlock1 = currentStep?.block1 && idx >= currentStep.block1.L && idx <= currentStep.block1.R;
              const inBlock2 = currentStep?.block2 && idx >= currentStep.block2.L && idx <= currentStep.block2.R;

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center min-w-[50px] p-2.5 rounded-xl border font-mono transition-all ${
                    inBlock1 && inBlock2
                      ? 'bg-white text-black font-black border-white shadow-lg'
                      : inBlock1 || inBlock2
                      ? 'bg-zinc-800 text-white border-white/60'
                      : inQuery
                      ? 'bg-zinc-900 text-zinc-200 border-white/20'
                      : 'bg-black/60 text-zinc-400 border-white/5'
                  }`}
                >
                  <span className="text-sm font-bold">{val}</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2D Sparse Table Matrix ST[i][j] */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5" /> Sparse Table Matrix ST[i][j] (interval length 2^j)
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/90 p-3">
            <table className="w-full text-center text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 text-[11px]">
                  <th className="py-2 px-3 text-left">i (Index)</th>
                  {Array.from({ length: model.K }, (_, j) => (
                    <th key={j} className="py-2 px-3">
                      j={j} (len {1 << j})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Array.from({ length: model.n }, (_, i) => (
                  <tr key={i} className="hover:bg-white/5">
                    <td className="py-2 px-3 text-left font-bold text-zinc-300">
                      arr[{i}] = {array[i]}
                    </td>
                    {Array.from({ length: model.K }, (_, j) => {
                      const val = currentStep?.tableState ? currentStep.tableState[i][j] : model.st[i][j];
                      const isHighlighted = currentStep?.highlightCell?.i === i && currentStep?.highlightCell?.j === j;
                      const isComparing = currentStep?.comparingCells?.some(c => c.i === i && c.j === j);
                      const isBlock1 = currentStep?.block1?.cell?.i === i && currentStep?.block1?.cell?.j === j;
                      const isBlock2 = currentStep?.block2?.cell?.i === i && currentStep?.block2?.cell?.j === j;

                      return (
                        <td key={j} className="py-2 px-3">
                          <div className={`p-1.5 rounded-lg transition-all ${
                            isBlock1 || isBlock2
                              ? 'bg-white text-black font-black shadow-md'
                              : isHighlighted
                              ? 'bg-zinc-700 text-white font-bold border border-white/40'
                              : isComparing
                              ? 'bg-zinc-800 text-zinc-300 border border-white/20'
                              : 'text-zinc-400'
                          }`}>
                            {val !== null && val !== undefined ? val : '—'}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      <ComplexityCard algoKey="sparse-table" />
    </div>
  );
}
