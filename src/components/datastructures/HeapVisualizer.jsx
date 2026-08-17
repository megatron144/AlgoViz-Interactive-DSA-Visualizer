import React, { useState } from 'react';
import ComplexityCard from '../common/ComplexityCard';
import { soundPlayer } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Plus, 
  ArrowUpCircle, 
  Shuffle, 
  Trash2, 
  Layers, 
  Eye,
  GitFork,
  ArrowDown
} from 'lucide-react';

const MAX_HEAP_CAPACITY = 15;

export default function HeapVisualizer() {
  const [heapType, setHeapType] = useState('max'); // 'max' | 'min'
  const [heap, setHeap] = useState([95, 75, 80, 55, 60, 50, 65, 20, 30]);
  const [inputValue, setInputValue] = useState(88);
  const [highlightIdxs, setHighlightIdxs] = useState([]);
  const [log, setLog] = useState('Heap initialized. Complete binary tree representation is maintained.');
  const [isProcessing, setIsProcessing] = useState(false);

  const compare = (parentVal, childVal) => {
    return heapType === 'max' ? parentVal < childVal : parentVal > childVal;
  };

  const handleInsert = async () => {
    if (isProcessing) return;
    const val = Number(inputValue);
    if (isNaN(val)) return;

    if (heap.length >= MAX_HEAP_CAPACITY) {
      setLog(`⚠️ Heap capacity limit (${MAX_HEAP_CAPACITY}) reached.`);
      return;
    }

    setIsProcessing(true);
    let arr = [...heap, val];
    let curr = arr.length - 1;
    setHeap([...arr]);
    setHighlightIdxs([curr]);
    soundPlayer.playTone(val, 0, 100);
    setLog(`📥 Inserted ${val} as new leaf at index ${curr}. Sifting up...`);

    await new Promise(r => setTimeout(r, 600));

    // Sift Up
    while (curr > 0) {
      let parent = Math.floor((curr - 1) / 2);
      if (compare(arr[parent], arr[curr])) {
        // Swap
        setHighlightIdxs([curr, parent]);
        soundPlayer.playTone(arr[curr], 0, 100);
        setLog(`🔄 Swapping child ${arr[curr]} (index ${curr}) with parent ${arr[parent]} (index ${parent}).`);
        let temp = arr[curr];
        arr[curr] = arr[parent];
        arr[parent] = temp;
        setHeap([...arr]);
        curr = parent;
        await new Promise(r => setTimeout(r, 600));
      } else {
        break;
      }
    }

    setHighlightIdxs([]);
    setIsProcessing(false);
    setLog(`✅ Element ${val} placed at valid position. Heap property satisfied.`);
    setInputValue(Math.floor(Math.random() * 90) + 10);
  };

  const handleExtractRoot = async () => {
    if (isProcessing || heap.length === 0) return;

    setIsProcessing(true);
    let arr = [...heap];
    const rootVal = arr[0];
    setHighlightIdxs([0]);
    soundPlayer.playTone(rootVal, 0, 120);
    setLog(`📤 Extracting root ${rootVal} (${heapType === 'max' ? 'Max' : 'Min'}). Replacing with last leaf ${arr[arr.length - 1]}...`);

    await new Promise(r => setTimeout(r, 600));

    if (arr.length === 1) {
      setHeap([]);
      setHighlightIdxs([]);
      setIsProcessing(false);
      setLog(`✅ Extracted root ${rootVal}. Heap is now empty.`);
      return;
    }

    // Replace root with last element
    arr[0] = arr.pop();
    setHeap([...arr]);
    setHighlightIdxs([0]);
    await new Promise(r => setTimeout(r, 500));

    // Sift Down / Heapify
    let curr = 0;
    const n = arr.length;

    while (curr < n) {
      let target = curr;
      let left = 2 * curr + 1;
      let right = 2 * curr + 2;

      if (left < n && compare(arr[target], arr[left])) {
        target = left;
      }
      if (right < n && compare(arr[target], arr[right])) {
        target = right;
      }

      if (target !== curr) {
        setHighlightIdxs([curr, target]);
        soundPlayer.playTone(arr[target], 0, 100);
        setLog(`🔄 Swapping ${arr[curr]} at index ${curr} with ${arr[target]} at index ${target} to restore heap order.`);
        let temp = arr[curr];
        arr[curr] = arr[target];
        arr[target] = temp;
        setHeap([...arr]);
        curr = target;
        await new Promise(r => setTimeout(r, 600));
      } else {
        break;
      }
    }

    setHighlightIdxs([]);
    setIsProcessing(false);
    setLog(`✅ Extracted root ${rootVal} successfully.`);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
  };

  const handleBuildRandom = () => {
    if (isProcessing) return;
    const size = Math.floor(Math.random() * 5) + 6;
    let arr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

    // Bottom up heapify
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
      let curr = i;
      while (curr < size) {
        let target = curr;
        let left = 2 * curr + 1;
        let right = 2 * curr + 2;
        if (left < size && compare(arr[target], arr[left])) target = left;
        if (right < size && compare(arr[target], arr[right])) target = right;
        if (target !== curr) {
          let temp = arr[curr];
          arr[curr] = arr[target];
          arr[target] = temp;
          curr = target;
        } else break;
      }
    }

    setHeap(arr);
    setHighlightIdxs([]);
    setLog(`🎲 Built a fresh random ${heapType === 'max' ? 'Max' : 'Min'}-Heap of ${size} elements.`);
  };

  const handleSwitchType = (type) => {
    if (type === heapType || isProcessing) return;
    setHeapType(type);
    // Convert current heap
    let arr = [...heap];
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      let curr = i;
      while (curr < arr.length) {
        let target = curr;
        let left = 2 * curr + 1;
        let right = 2 * curr + 2;
        const comp = type === 'max' ? (a, b) => a < b : (a, b) => a > b;
        if (left < arr.length && comp(arr[target], arr[left])) target = left;
        if (right < arr.length && comp(arr[target], arr[right])) target = right;
        if (target !== curr) {
          let temp = arr[curr];
          arr[curr] = arr[target];
          arr[target] = temp;
          curr = target;
        } else break;
      }
    }
    setHeap(arr);
    setLog(`Switched to ${type === 'max' ? 'Max-Heap' : 'Min-Heap'} and restored heap invariants.`);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Priority Queue & Tree Structures</span>
            <h2 className="text-xl font-display font-black text-white">
              Binary {heapType === 'max' ? 'Max-Heap' : 'Min-Heap'} Visualizer
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => handleSwitchType('max')}
              disabled={isProcessing}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                heapType === 'max'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Max-Heap
            </button>
            <button
              onClick={() => handleSwitchType('min')}
              disabled={isProcessing}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                heapType === 'min'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Min-Heap
            </button>
          </div>
        </div>

        {/* Action Buttons */}
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
              onClick={handleInsert}
              disabled={heap.length >= MAX_HEAP_CAPACITY || isProcessing}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all disabled:opacity-40 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Insert</span>
            </button>
          </div>

          <button
            onClick={handleExtractRoot}
            disabled={heap.length === 0 || isProcessing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-zinc-200 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono font-medium transition-all disabled:opacity-40"
          >
            <ArrowUpCircle className="w-4 h-4 text-emerald-400" />
            <span>Extract {heapType === 'max' ? 'Max' : 'Min'} Root</span>
          </button>

          <button
            onClick={handleBuildRandom}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random Heap</span>
          </button>

          <button
            onClick={() => { setHeap([]); setHighlightIdxs([]); setLog('Heap cleared.'); }}
            disabled={heap.length === 0 || isProcessing}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-900/40 transition-all disabled:opacity-40"
            title="Clear Heap"
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

      {/* Visualizer Dual View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree View (Col 1-2) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[360px] overflow-x-auto">
          <div className="w-full text-left text-xs font-mono text-zinc-400 mb-4 flex items-center gap-2">
            <GitFork className="w-4 h-4 text-white" />
            <span>Binary Tree Visualization</span>
          </div>

          {heap.length === 0 ? (
            <div className="text-zinc-600 font-mono text-xs py-16 text-center">
              Heap is empty. Insert elements to construct the binary tree.
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 w-full py-4 select-none">
              {/* Level 0: Root */}
              {heap.length > 0 && (
                <div className="flex justify-center">
                  <HeapNode idx={0} val={heap[0]} isHighlighted={highlightIdxs.includes(0)} isRoot />
                </div>
              )}

              {/* Level 1: [1, 2] */}
              {heap.length > 1 && (
                <div className="flex justify-center gap-20 sm:gap-28">
                  {heap[1] !== undefined && <HeapNode idx={1} val={heap[1]} isHighlighted={highlightIdxs.includes(1)} />}
                  {heap[2] !== undefined && <HeapNode idx={2} val={heap[2]} isHighlighted={highlightIdxs.includes(2)} />}
                </div>
              )}

              {/* Level 2: [3, 4, 5, 6] */}
              {heap.length > 3 && (
                <div className="flex justify-center gap-8 sm:gap-12">
                  {heap[3] !== undefined && <HeapNode idx={3} val={heap[3]} isHighlighted={highlightIdxs.includes(3)} />}
                  {heap[4] !== undefined && <HeapNode idx={4} val={heap[4]} isHighlighted={highlightIdxs.includes(4)} />}
                  {heap[5] !== undefined && <HeapNode idx={5} val={heap[5]} isHighlighted={highlightIdxs.includes(5)} />}
                  {heap[6] !== undefined && <HeapNode idx={6} val={heap[6]} isHighlighted={highlightIdxs.includes(6)} />}
                </div>
              )}

              {/* Level 3: [7..14] */}
              {heap.length > 7 && (
                <div className="flex justify-center gap-3 sm:gap-4 overflow-x-auto max-w-full">
                  {[7, 8, 9, 10, 11, 12, 13, 14].map(i => (
                    heap[i] !== undefined && (
                      <HeapNode key={i} idx={i} val={heap[i]} isHighlighted={highlightIdxs.includes(i)} isSmall />
                    )
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Array Representation (Col 3) */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
              <Layers className="w-4 h-4 text-white" />
              <span>Array Memory Representation</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {heap.map((val, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono transition-all ${
                    highlightIdxs.includes(idx)
                      ? 'bg-white text-black border-white scale-105 shadow-md shadow-white/30 font-bold'
                      : idx === 0
                      ? 'bg-zinc-800 text-white border-white/30 font-bold'
                      : 'bg-zinc-900 text-zinc-300 border-white/10'
                  }`}
                >
                  <span className="text-[9px] text-zinc-500 font-mono">[{idx}]</span>
                  <span className="text-xs font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Index Math formulas */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/5 font-mono text-xs space-y-1.5 text-zinc-400">
            <div className="text-[10px] uppercase font-bold text-white">Index Invariants:</div>
            <div>Parent(i) = <code className="text-zinc-200">floor((i - 1) / 2)</code></div>
            <div>Left Child(i) = <code className="text-zinc-200">2*i + 1</code></div>
            <div>Right Child(i) = <code className="text-zinc-200">2*i + 2</code></div>
          </div>
        </div>
      </div>

      {/* Complexity & Practice Problems Card */}
      <ComplexityCard algoKey={heapType === 'max' ? 'max-heap' : 'min-heap'} />
    </div>
  );
}

function HeapNode({ idx, val, isHighlighted, isRoot, isSmall }) {
  return (
    <div
      className={`relative rounded-2xl flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
        isSmall ? 'w-10 h-10 text-xs' : 'w-12 h-12 text-sm'
      } ${
        isHighlighted
          ? 'bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.7)] z-10'
          : isRoot
          ? 'bg-zinc-800 text-white border-2 border-white/50 shadow-lg'
          : 'bg-zinc-900 text-zinc-200 border border-white/15 hover:border-white/40'
      }`}
    >
      <span className="text-[8px] text-zinc-500 leading-none">[{idx}]</span>
      <span className="leading-tight">{val}</span>
    </div>
  );
}
