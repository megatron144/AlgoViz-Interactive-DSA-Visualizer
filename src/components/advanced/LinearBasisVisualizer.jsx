import React, { useState, useEffect, useRef } from 'react';
import { LinearBasisModel } from '../../algorithms/advanced/linearBasis';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { Binary, Plus, ShieldCheck, Zap, RotateCcw } from 'lucide-react';

export default function LinearBasisVisualizer({ onActiveLineChange }) {
  const [model, setModel] = useState(() => new LinearBasisModel(6));
  const [inputVal, setInputVal] = useState(25);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(150);

  const timerRef = useRef(null);

  const handleInsert = (val = inputVal) => {
    const insertSteps = model.generateInsertSteps(Number(val));
    setSteps(insertSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleMaxXor = () => {
    const maxXorSteps = model.generateMaxXorSteps();
    setSteps(maxXorSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    model.reset();
    setModel(new LinearBasisModel(6));
    setSteps([]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
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
          if (step?.mask !== undefined) {
            soundPlayer.playTone(step.mask * 5, 0, 100);
          }
          if (next === steps.length - 1) {
            setIsPlaying(false);
            if (step?.type === 'BASIS_INSERTED' || step?.type === 'MAX_XOR_COMPLETE') {
              confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
            }
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
      {/* Top Configuration Bar */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Vector Space & GF(2)</span>
            <h2 className="text-xl font-display font-black text-white">Linear Basis (XOR Basis) Engine</h2>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Insert Sample Set:</span>
            {[14, 25, 41, 10, 53].map(num => (
              <button
                key={num}
                onClick={() => {
                  setInputVal(num);
                  handleInsert(num);
                }}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 text-xs font-mono text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white transition-all"
              >
                +{num}
              </button>
            ))}
          </div>
        </div>

        {/* Input & Action Row */}
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900/90 p-1.5 sm:p-2 rounded-xl border border-white/10">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Num (0-63):</span>
            <input
              type="number"
              min="0"
              max="63"
              value={inputVal}
              onChange={e => setInputVal(Number(e.target.value))}
              className="w-14 sm:w-16 bg-black border border-white/15 rounded-lg px-1.5 py-1 text-xs font-mono text-white text-center"
            />
            <button
              onClick={() => handleInsert(inputVal)}
              className="px-3 sm:px-4 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10 flex items-center gap-1.5 touch-manipulation"
            >
              <Plus className="w-3.5 h-3.5" /> Insert
            </button>
          </div>

          <button
            onClick={handleMaxXor}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-900 text-white font-mono text-xs border border-white/15 hover:border-white/30 transition-all flex items-center gap-1.5 touch-manipulation"
          >
            <Zap className="w-3.5 h-3.5" /> Max XOR
          </button>

          <button
            onClick={handleReset}
            className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white transition-all touch-manipulation"
            title="Reset Basis"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column: Live Step Inspection & Bit Visualizer */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
          <div className="min-h-[40px] sm:min-h-[45px] bg-black/80 rounded-xl p-2.5 sm:p-3 border border-white/15 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
              <span className="text-white font-medium">
                {currentStep?.description || 'Enter a number and click Insert Vector to inspect Gaussian bit elimination.'}
              </span>
            </div>
            {currentStep?.maxXor !== undefined && (
              <div className="bg-white text-black font-mono font-black text-xs px-2.5 py-1 rounded">
                Max XOR = {currentStep.maxXor}
              </div>
            )}
          </div>

          {/* Active Vector Mask Binary Grid */}
          <div className="p-3 sm:p-4 rounded-xl bg-black/90 border border-white/10 space-y-2 sm:space-y-3">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Current Vector Mask:</span>
            {currentStep?.mask !== undefined ? (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto touch-scroll py-1">
                {Array.from({ length: 6 }, (_, i) => 5 - i).map(bit => {
                  const isBitSet = (currentStep.mask & (1 << bit)) !== 0;
                  const isCurrentBit = currentStep.currentBit === bit;
                  return (
                    <div
                      key={bit}
                      className={`flex flex-col items-center justify-center w-10 h-12 sm:w-12 sm:h-14 rounded-xl border font-mono transition-all ${
                        isCurrentBit
                          ? 'bg-white text-black font-black border-white shadow-lg'
                          : isBitSet
                          ? 'bg-zinc-800 text-white border-white/40'
                          : 'bg-zinc-950 text-zinc-600 border-white/5'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-bold">{isBitSet ? '1' : '0'}</span>
                      <span className="text-[8px] sm:text-[9px] text-zinc-500 mt-0.5 sm:mt-1">2^{bit}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-xs font-mono text-zinc-500">
                No active vector reduction in progress.
              </div>
            )}
          </div>

          {/* History of Inserted Numbers */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Inserted Set:</span>
            {model.history.length > 0 ? (
              model.history.map((num, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-white">
                  {num} ({num.toString(2).padStart(6, '0')}₂)
                </span>
              ))
            ) : (
              <span className="text-zinc-600">Empty</span>
            )}
          </div>
        </div>

        {/* Right Column: Basis Array Vectors Table */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Binary className="w-3.5 h-3.5" /> Basis Array (basis[0..5])
            </span>
            <p className="text-[10px] text-zinc-400 font-mono">basis[i] holds vector with MSB at bit i</p>
          </div>

          <div className="space-y-2">
            {Array.from({ length: 6 }, (_, i) => 5 - i).map(bit => {
              const basisState = currentStep?.basisState || model.basis;
              const val = basisState[bit];
              const isOccupied = val > 0;
              const isTargetSlot = currentStep?.insertedSlot === bit;

              return (
                <div
                  key={bit}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all ${
                    isTargetSlot
                      ? 'bg-white text-black font-bold border-white shadow-lg'
                      : isOccupied
                      ? 'bg-zinc-900/90 text-white border-white/20'
                      : 'bg-black/40 text-zinc-600 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">basis[{bit}]:</span>
                    <span className="font-bold">{isOccupied ? val : '—'}</span>
                  </div>

                  <div className="font-mono text-[11px] tracking-widest text-zinc-400">
                    {isOccupied ? val.toString(2).padStart(6, '0') : '000000'}
                  </div>
                </div>
              );
            })}
          </div>
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

      {/* Complexity Card */}
      <ComplexityCard algoKey="linear-basis" />
    </div>
  );
}
