import React, { useState } from 'react';
import ComplexityCard from '../common/ComplexityCard';
import { soundPlayer } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Trash2, 
  Shuffle, 
  Layers, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const MAX_CAPACITY = 8;

export default function StackVisualizer() {
  const [stack, setStack] = useState([15, 28, 42, 65]);
  const [inputValue, setInputValue] = useState(77);
  const [highlightIdx, setHighlightIdx] = useState(null);
  const [log, setLog] = useState('Stack initialized with 4 elements. Ready for operations.');
  const [animating, setAnimating] = useState(false);

  const handlePush = () => {
    if (animating) return;
    const val = Number(inputValue);
    if (isNaN(val)) return;

    if (stack.length >= MAX_CAPACITY) {
      setLog(`⚠️ Stack Overflow! Maximum capacity (${MAX_CAPACITY}) reached.`);
      soundPlayer.playTone(150, 0, 200);
      return;
    }

    setAnimating(true);
    soundPlayer.playTone(val, 0, 100);
    const nextStack = [...stack, val];
    setStack(nextStack);
    setHighlightIdx(nextStack.length - 1);
    setLog(`📥 Pushed element ${val} onto top of stack (Index ${nextStack.length - 1}).`);

    setTimeout(() => {
      setHighlightIdx(null);
      setAnimating(false);
      setInputValue(Math.floor(Math.random() * 90) + 10);
    }, 600);
  };

  const handlePop = () => {
    if (animating) return;
    if (stack.length === 0) {
      setLog('⚠️ Stack Underflow! Cannot pop from an empty stack.');
      soundPlayer.playTone(100, 0, 200);
      return;
    }

    setAnimating(true);
    const poppedVal = stack[stack.length - 1];
    setHighlightIdx(stack.length - 1);
    soundPlayer.playTone(poppedVal, 0, 100);
    setLog(`📤 Popping top element ${poppedVal} from stack...`);

    setTimeout(() => {
      setStack(prev => prev.slice(0, prev.length - 1));
      setHighlightIdx(null);
      setAnimating(false);
      setLog(`✅ Popped element ${poppedVal} successfully. Top is now ${stack.length > 1 ? stack[stack.length - 2] : 'None'}.`);
    }, 450);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setLog('ℹ️ Stack is empty. Peek returns null/empty.');
      return;
    }
    const topIdx = stack.length - 1;
    setHighlightIdx(topIdx);
    soundPlayer.playTone(stack[topIdx] * 2, 0, 100);
    setLog(`👀 Peek: Top element is ${stack[topIdx]} at index ${topIdx}.`);
    setTimeout(() => setHighlightIdx(null), 1200);
  };

  const handleClear = () => {
    setStack([]);
    setHighlightIdx(null);
    setLog('🧹 Stack cleared completely.');
  };

  const handleRandomFill = () => {
    const size = Math.floor(Math.random() * 4) + 3;
    const newItems = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 10);
    setStack(newItems);
    setHighlightIdx(null);
    setLog(`🎲 Populated stack with ${size} random elements.`);
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
  };

  const isFull = stack.length >= MAX_CAPACITY;
  const isEmpty = stack.length === 0;
  const topVal = !isEmpty ? stack[stack.length - 1] : null;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Linear Data Structures</span>
            <h2 className="text-xl font-display font-black text-white">Stack (LIFO - Last In, First Out)</h2>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300">
              Size: <strong className="text-white">{stack.length}</strong> / {MAX_CAPACITY}
            </span>
            <span className={`px-3 py-1.5 rounded-xl border font-semibold ${
              isFull ? 'bg-rose-950/40 text-rose-300 border-rose-800/50' : 
              isEmpty ? 'bg-amber-950/40 text-amber-300 border-amber-800/50' : 
              'bg-zinc-900 border-white/10 text-zinc-300'
            }`}>
              {isFull ? 'FULL' : isEmpty ? 'EMPTY' : 'ACTIVE'}
            </span>
          </div>
        </div>

        {/* Input & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-white/10">
            <span className="text-xs font-mono text-zinc-400 pl-2">Value:</span>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-16 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white text-center focus:outline-none focus:border-white"
            />
            <button
              onClick={handlePush}
              disabled={isFull || animating}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all disabled:opacity-40 shadow-sm"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Push</span>
            </button>
          </div>

          <button
            onClick={handlePop}
            disabled={isEmpty || animating}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-zinc-200 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono font-medium transition-all disabled:opacity-40"
          >
            <ArrowUp className="w-3.5 h-3.5 text-rose-400" />
            <span>Pop</span>
          </button>

          <button
            onClick={handlePeek}
            disabled={isEmpty || animating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-zinc-200 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono transition-all disabled:opacity-40"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Peek</span>
          </button>

          <button
            onClick={handleRandomFill}
            disabled={animating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random Fill</span>
          </button>

          <button
            onClick={handleClear}
            disabled={isEmpty || animating}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-900/40 transition-all disabled:opacity-40"
            title="Clear Stack"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Log Bar */}
        <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5 font-mono text-xs text-zinc-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>{log}</span>
        </div>
      </div>

      {/* Visualizer Canvas Area */}
      <div className="glass-card rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center min-h-[380px]">
        {/* Stack Container Tower */}
        <div className="relative w-72 flex flex-col-reverse items-center justify-start border-b-4 border-l-4 border-r-4 border-white/40 rounded-b-2xl p-2 bg-gradient-to-t from-zinc-950 to-black min-h-[300px] shadow-2xl">
          {isEmpty && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 font-mono text-xs gap-2">
              <Layers className="w-8 h-8 opacity-40" />
              <span>Stack is Empty</span>
            </div>
          )}

          {stack.map((val, idx) => {
            const isTop = idx === stack.length - 1;
            const isHighlighted = highlightIdx === idx;

            return (
              <div
                key={idx}
                className={`relative w-full my-1 h-10 rounded-xl flex items-center justify-between px-4 font-mono font-bold text-sm transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.6)] z-10'
                    : isTop
                    ? 'bg-zinc-800 text-white border-2 border-white/40 shadow-lg'
                    : 'bg-zinc-900/90 text-zinc-300 border border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 font-mono">[{idx}]</span>
                  <span>{val}</span>
                </div>

                {isTop && (
                  <span className={`text-[9px] uppercase px-2 py-0.5 rounded-md font-extrabold tracking-wider ${
                    isHighlighted ? 'bg-black text-white' : 'bg-white text-black'
                  }`}>
                    TOP
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-xs font-mono text-zinc-500 text-center">
          Stack Base (Index 0) ───▶ Top (Index {Math.max(0, stack.length - 1)})
        </div>
      </div>

      {/* Complexity & Practice Problems Card */}
      <ComplexityCard algoKey="stack" />
    </div>
  );
}
