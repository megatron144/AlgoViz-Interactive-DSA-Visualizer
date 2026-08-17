import React, { useState } from 'react';
import ComplexityCard from '../common/ComplexityCard';
import { soundPlayer } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  Trash2, 
  Shuffle, 
  Plus, 
  Minus,
  CornerDownLeft,
  CornerDownRight
} from 'lucide-react';

const MAX_CAPACITY = 8;

export default function DequeVisualizer() {
  const [deque, setDeque] = useState([24, 48, 72, 96]);
  const [inputValue, setInputValue] = useState(15);
  const [highlightIdx, setHighlightIdx] = useState(null);
  const [log, setLog] = useState('Deque initialized. Supports insertion and removal at both Front and Back.');
  const [animating, setAnimating] = useState(false);

  const handlePushFront = () => {
    if (animating) return;
    const val = Number(inputValue);
    if (isNaN(val)) return;

    if (deque.length >= MAX_CAPACITY) {
      setLog(`⚠️ Deque Overflow! Maximum capacity (${MAX_CAPACITY}) reached.`);
      soundPlayer.playTone(150, 0, 200);
      return;
    }

    setAnimating(true);
    soundPlayer.playTone(val, 0, 100);
    const nextDeque = [val, ...deque];
    setDeque(nextDeque);
    setHighlightIdx(0);
    setLog(`📥 Pushed element ${val} at FRONT (Index 0).`);

    setTimeout(() => {
      setHighlightIdx(null);
      setAnimating(false);
      setInputValue(Math.floor(Math.random() * 90) + 10);
    }, 550);
  };

  const handlePushBack = () => {
    if (animating) return;
    const val = Number(inputValue);
    if (isNaN(val)) return;

    if (deque.length >= MAX_CAPACITY) {
      setLog(`⚠️ Deque Overflow! Maximum capacity (${MAX_CAPACITY}) reached.`);
      soundPlayer.playTone(150, 0, 200);
      return;
    }

    setAnimating(true);
    soundPlayer.playTone(val, 0, 100);
    const nextDeque = [...deque, val];
    setDeque(nextDeque);
    setHighlightIdx(nextDeque.length - 1);
    setLog(`📥 Pushed element ${val} at BACK (Index ${nextDeque.length - 1}).`);

    setTimeout(() => {
      setHighlightIdx(null);
      setAnimating(false);
      setInputValue(Math.floor(Math.random() * 90) + 10);
    }, 550);
  };

  const handlePopFront = () => {
    if (animating || deque.length === 0) return;
    setAnimating(true);
    const val = deque[0];
    setHighlightIdx(0);
    soundPlayer.playTone(val, 0, 100);
    setLog(`📤 Popping element ${val} from FRONT...`);

    setTimeout(() => {
      setDeque(prev => prev.slice(1));
      setHighlightIdx(null);
      setAnimating(false);
      setLog(`✅ Popped element ${val} from FRONT.`);
    }, 450);
  };

  const handlePopBack = () => {
    if (animating || deque.length === 0) return;
    setAnimating(true);
    const lastIdx = deque.length - 1;
    const val = deque[lastIdx];
    setHighlightIdx(lastIdx);
    soundPlayer.playTone(val, 0, 100);
    setLog(`📤 Popping element ${val} from BACK...`);

    setTimeout(() => {
      setDeque(prev => prev.slice(0, prev.length - 1));
      setHighlightIdx(null);
      setAnimating(false);
      setLog(`✅ Popped element ${val} from BACK.`);
    }, 450);
  };

  const handlePeekFront = () => {
    if (deque.length === 0) return;
    setHighlightIdx(0);
    soundPlayer.playTone(deque[0] * 2, 0, 100);
    setLog(`👀 Peek Front: ${deque[0]} at index 0.`);
    setTimeout(() => setHighlightIdx(null), 1200);
  };

  const handlePeekBack = () => {
    if (deque.length === 0) return;
    const lastIdx = deque.length - 1;
    setHighlightIdx(lastIdx);
    soundPlayer.playTone(deque[lastIdx] * 2, 0, 100);
    setLog(`👀 Peek Back: ${deque[lastIdx]} at index ${lastIdx}.`);
    setTimeout(() => setHighlightIdx(null), 1200);
  };

  const handleClear = () => {
    setDeque([]);
    setHighlightIdx(null);
    setLog('🧹 Deque cleared completely.');
  };

  const handleRandomFill = () => {
    const size = Math.floor(Math.random() * 4) + 3;
    const newItems = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 10);
    setDeque(newItems);
    setHighlightIdx(null);
    setLog(`🎲 Populated deque with ${size} random elements.`);
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
  };

  const isFull = deque.length >= MAX_CAPACITY;
  const isEmpty = deque.length === 0;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest">Linear Data Structures</span>
            <h2 className="text-lg sm:text-xl font-display font-black text-white">Deque (Double-Ended Queue)</h2>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 text-[11px] sm:text-xs">
              Size: <strong className="text-white">{deque.length}</strong> / {MAX_CAPACITY}
            </span>
            <span className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border font-semibold text-[10px] sm:text-xs ${
              isFull ? 'bg-rose-950/40 text-rose-300 border-rose-800/50' : 
              isEmpty ? 'bg-amber-950/40 text-amber-300 border-amber-800/50' : 
              'bg-zinc-900 border-white/10 text-zinc-300'
            }`}>
              {isFull ? 'FULL' : isEmpty ? 'EMPTY' : 'ACTIVE'}
            </span>
          </div>
        </div>

        {/* Input & Operations */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900 p-1 sm:p-1.5 rounded-xl border border-white/10">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 pl-1 sm:pl-2">Value:</span>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-14 sm:w-16 bg-black border border-white/15 rounded-lg px-1.5 sm:px-2 py-1 text-xs font-mono text-white text-center focus:outline-none focus:border-white"
            />
          </div>

          {/* Front Operations */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-white/10">
            <button
              onClick={handlePushFront}
              disabled={isFull || animating}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white text-black font-display font-bold text-[11px] sm:text-xs hover:bg-zinc-200 transition-all disabled:opacity-40 flex items-center gap-1 touch-manipulation"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span>Push Front</span>
            </button>
            <button
              onClick={handlePopFront}
              disabled={isEmpty || animating}
              className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-zinc-800 text-rose-300 hover:text-white text-[11px] sm:text-xs font-mono transition-all disabled:opacity-40 touch-manipulation"
            >
              Pop
            </button>
            <button
              onClick={handlePeekFront}
              disabled={isEmpty || animating}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-all disabled:opacity-40 touch-manipulation"
              title="Peek Front"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Back Operations */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-white/10">
            <button
              onClick={handlePushBack}
              disabled={isFull || animating}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white text-black font-display font-bold text-[11px] sm:text-xs hover:bg-zinc-200 transition-all disabled:opacity-40 flex items-center gap-1 touch-manipulation"
            >
              <CornerDownRight className="w-3.5 h-3.5" />
              <span>Push Back</span>
            </button>
            <button
              onClick={handlePopBack}
              disabled={isEmpty || animating}
              className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-zinc-800 text-rose-300 hover:text-white text-[11px] sm:text-xs font-mono transition-all disabled:opacity-40 touch-manipulation"
            >
              Pop
            </button>
            <button
              onClick={handlePeekBack}
              disabled={isEmpty || animating}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-all disabled:opacity-40 touch-manipulation"
              title="Peek Back"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleRandomFill}
            disabled={animating}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono transition-all touch-manipulation"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random</span>
          </button>

          <button
            onClick={handleClear}
            disabled={isEmpty || animating}
            className="p-1.5 sm:p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-900/40 transition-all disabled:opacity-40 touch-manipulation"
            title="Clear Deque"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Log Bar */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 border border-white/5 font-mono text-[11px] sm:text-xs text-zinc-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
          <span className="leading-relaxed">{log}</span>
        </div>
      </div>

      {/* Visualizer Track Area */}
      <div className="glass-card rounded-2xl p-4 sm:p-8 border border-white/10 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[320px] space-y-4 sm:space-y-6">
        <div className="w-full flex items-center justify-between px-2 sm:px-4 font-mono text-[11px] sm:text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 sm:gap-2 text-cyan-400">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>FRONT (Push/Pop/Peek)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-amber-400">
            <span>BACK (Push/Pop/Peek)</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>

        {/* Deque Track */}
        <div className="w-full max-w-4xl min-h-[100px] sm:min-h-[110px] p-2.5 sm:p-3 rounded-2xl border-2 border-dashed border-white/20 bg-zinc-950/90 flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 overflow-x-auto shadow-inner touch-scroll">
          {isEmpty ? (
            <div className="w-full text-center text-zinc-600 font-mono text-xs py-6">
              Deque is Empty — Supports bidirectional O(1) push and pop from either boundary
            </div>
          ) : (
            deque.map((val, idx) => {
              const isFront = idx === 0;
              const isBack = idx === deque.length - 1;
              const isHighlighted = highlightIdx === idx;

              return (
                <div
                  key={idx}
                  className={`flex-shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.6)] z-10'
                      : isFront
                      ? 'bg-zinc-800 text-white border-2 border-cyan-500/60 shadow-lg'
                      : isBack
                      ? 'bg-zinc-800 text-white border-2 border-amber-500/60 shadow-lg'
                      : 'bg-zinc-900 text-zinc-300 border border-white/10'
                  }`}
                >
                  <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">[{idx}]</span>
                  <span className="text-sm sm:text-base">{val}</span>

                  {isFront && (
                    <span className="absolute -top-2.5 sm:-top-3 text-[7px] sm:text-[8px] uppercase tracking-wider px-1 sm:px-1.5 py-0.2 bg-cyan-500 text-black font-bold rounded">
                      FRONT
                    </span>
                  )}
                  {isBack && (
                    <span className="absolute -bottom-2.5 sm:-bottom-3 text-[7px] sm:text-[8px] uppercase tracking-wider px-1 sm:px-1.5 py-0.2 bg-amber-500 text-black font-bold rounded">
                      BACK
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="text-[11px] sm:text-xs font-mono text-zinc-500 text-center">
          Double-ended capability: Acts as both Stack and Queue simultaneously with O(1) amortized operations.
        </div>
      </div>

      {/* Complexity & Practice Problems Card */}
      <ComplexityCard algoKey="deque" />
    </div>
  );
}
