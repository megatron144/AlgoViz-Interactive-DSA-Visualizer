import React, { useState, useEffect, useRef } from 'react';
import { generateSortingSteps } from '../../algorithms/sorting/sortingAlgorithms';
import SortingBarChart from './SortingBarChart';
import { Swords, Play, RotateCcw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SortingDuel({ baseArray = [] }) {
  const [algo1, setAlgo1] = useState('quick-sort');
  const [algo2, setAlgo2] = useState('bubble-sort');
  const [steps1, setSteps1] = useState([]);
  const [steps2, setSteps2] = useState([]);
  const [idx1, setIdx1] = useState(0);
  const [idx2, setIdx2] = useState(0);
  const [isBattling, setIsBattling] = useState(false);
  const [winner, setWinner] = useState(null);

  const timerRef = useRef(null);

  const startDuel = () => {
    const s1 = generateSortingSteps(algo1, baseArray);
    const s2 = generateSortingSteps(algo2, baseArray);
    setSteps1(s1);
    setSteps2(s2);
    setIdx1(0);
    setIdx2(0);
    setWinner(null);
    setIsBattling(true);
  };

  const resetDuel = () => {
    setIdx1(0);
    setIdx2(0);
    setIsBattling(false);
    setWinner(null);
  };

  useEffect(() => {
    if (isBattling) {
      timerRef.current = setTimeout(() => {
        let next1 = idx1;
        let next2 = idx2;

        if (idx1 < steps1.length - 1) next1 = idx1 + 1;
        if (idx2 < steps2.length - 1) next2 = idx2 + 1;

        setIdx1(next1);
        setIdx2(next2);

        const done1 = next1 === steps1.length - 1;
        const done2 = next2 === steps2.length - 1;

        if (done1 && !done2 && !winner) {
          setWinner(algo1);
          confetti({ particleCount: 50, spread: 70, origin: { x: 0.3, y: 0.7 } });
        } else if (done2 && !done1 && !winner) {
          setWinner(algo2);
          confetti({ particleCount: 50, spread: 70, origin: { x: 0.7, y: 0.7 } });
        }

        if (done1 && done2) {
          setIsBattling(false);
        }
      }, 40);
    }
    return () => clearTimeout(timerRef.current);
  }, [isBattling, idx1, idx2, steps1, steps2, winner, algo1, algo2]);

  const step1 = steps1[idx1] || { array: baseArray, comparing: [], swapping: [], sorted: [] };
  const step2 = steps2[idx2] || { array: baseArray, comparing: [], swapping: [], sorted: [] };

  const sortingOptions = [
    { id: 'bubble-sort', label: 'Bubble Sort' },
    { id: 'selection-sort', label: 'Selection Sort' },
    { id: 'insertion-sort', label: 'Insertion Sort' },
    { id: 'merge-sort', label: 'Merge Sort' },
    { id: 'quick-sort', label: 'Quick Sort' },
    { id: 'heap-sort', label: 'Heap Sort' },
    { id: 'shell-sort', label: 'Shell Sort' },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
      {/* Header with duel selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-white" />
          <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">
            Algorithm Duel: Side-by-Side Arena
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={startDuel}
            disabled={isBattling}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10 disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>{isBattling ? 'Battling...' : 'Start Duel'}</span>
          </button>

          <button
            onClick={resetDuel}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 hover:text-white transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dual Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fighter 1 */}
        <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between">
            <select
              value={algo1}
              onChange={e => setAlgo1(e.target.value)}
              disabled={isBattling}
              className="bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs font-mono text-white font-bold"
            >
              {sortingOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>

            {winner === algo1 && (
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-black bg-white px-2 py-0.5 rounded shadow">
                <Trophy className="w-3.5 h-3.5" /> WINNER!
              </span>
            )}
          </div>

          <SortingBarChart
            array={step1.array}
            comparing={step1.comparing}
            swapping={step1.swapping}
            pivot={step1.pivot}
            sorted={step1.sorted}
            height={220}
            showLabels={false}
          />

          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Comparisons: {step1.stats?.comparisons || 0}</span>
            <span>Swaps: {step1.stats?.swaps || 0}</span>
          </div>
        </div>

        {/* Fighter 2 */}
        <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between">
            <select
              value={algo2}
              onChange={e => setAlgo2(e.target.value)}
              disabled={isBattling}
              className="bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs font-mono text-white font-bold"
            >
              {sortingOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>

            {winner === algo2 && (
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-black bg-white px-2 py-0.5 rounded shadow">
                <Trophy className="w-3.5 h-3.5" /> WINNER!
              </span>
            )}
          </div>

          <SortingBarChart
            array={step2.array}
            comparing={step2.comparing}
            swapping={step2.swapping}
            pivot={step2.pivot}
            sorted={step2.sorted}
            height={220}
            showLabels={false}
          />

          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Comparisons: {step2.stats?.comparisons || 0}</span>
            <span>Swaps: {step2.stats?.swaps || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
