import React, { useState, useEffect, useRef } from 'react';
import { generateSortingSteps } from '../../algorithms/sorting/sortingAlgorithms';
import SortingBarChart from './SortingBarChart';
import SortingDuel from './SortingDuel';
import PlaybackControls from '../common/PlaybackControls';
import StatsDashboard from '../common/StatsDashboard';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { Swords, RefreshCw, Shuffle, SlidersHorizontal } from 'lucide-react';

export default function SortingVisualizer({ onActiveLineChange }) {
  const [selectedAlgo, setSelectedAlgo] = useState('quick-sort');
  const [arraySize, setArraySize] = useState(28);
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(40);
  const [isDuelMode, setIsDuelMode] = useState(false);

  const timerRef = useRef(null);

  // Generate Array Preset
  const generateArray = (size = arraySize, preset = 'random') => {
    let newArr = [];
    if (preset === 'random') {
      newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    } else if (preset === 'reversed') {
      newArr = Array.from({ length: size }, (_, i) => Math.floor(100 - (i * 90) / size));
    } else if (preset === 'nearly-sorted') {
      newArr = Array.from({ length: size }, (_, i) => Math.floor(10 + (i * 85) / size));
      // Swap a few random pairs
      for (let k = 0; k < Math.floor(size / 6); k++) {
        const i1 = Math.floor(Math.random() * size);
        const i2 = Math.floor(Math.random() * size);
        [newArr[i1], newArr[i2]] = [newArr[i2], newArr[i1]];
      }
    } else if (preset === 'few-unique') {
      const distinct = [20, 45, 70, 95];
      newArr = Array.from({ length: size }, () => distinct[Math.floor(Math.random() * distinct.length)]);
    }

    setArray(newArr);
    const initialSteps = generateSortingSteps(selectedAlgo, newArr);
    setSteps(initialSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    generateArray(arraySize, 'random');
  }, [arraySize, selectedAlgo]);

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
          if (step?.comparing?.length > 0) {
            const idx = step.comparing[0];
            soundPlayer.playTone(step.array[idx], 10, 100);
          } else if (step?.swapping?.length > 0) {
            const idx = step.swapping[0];
            soundPlayer.playTone(step.array[idx], 10, 100);
          }

          if (next === steps.length - 1) {
            setIsPlaying(false);
            soundPlayer.playCompletionSweep();
            confetti({ particleCount: 40, spread: 70, origin: { y: 0.8 } });
          }
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIdx, steps, speed]);

  const currentStep = steps[currentStepIdx] || {
    array,
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: [],
    stats: { comparisons: 0, swaps: 0, accesses: 0 },
    description: ''
  };

  const subTabs = [
    { id: 'quick-sort', label: 'Quick Sort' },
    { id: 'merge-sort', label: 'Merge Sort' },
    { id: 'heap-sort', label: 'Heap Sort' },
    { id: 'bubble-sort', label: 'Bubble Sort' },
    { id: 'selection-sort', label: 'Selection Sort' },
    { id: 'insertion-sort', label: 'Insertion Sort' },
    { id: 'shell-sort', label: 'Shell Sort' },
    { id: 'radix-sort', label: 'Radix Sort' },
    { id: 'duel', label: 'Duel Arena ⚔️' },
  ];

  return (
    <div className="space-y-6">
      {/* Standalone Sub-Navigation Track Bar at Top */}
      <div className="dock-track-bar scrollbar-none shadow-2xl touch-scroll">
        {subTabs.map((tab) => {
          const isDuelTab = tab.id === 'duel';
          const isActive = isDuelTab ? isDuelMode : (!isDuelMode && selectedAlgo === tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isDuelTab) {
                  setIsDuelMode(true);
                } else {
                  setIsDuelMode(false);
                  setSelectedAlgo(tab.id);
                }
              }}
              className={`dock-pill ${isActive ? 'active' : ''}`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Configuration Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest">
              {isDuelMode ? 'Real-Time Benchmark' : 'Foundational & Hybrid Sorting'}
            </span>
            <h2 className="text-lg sm:text-xl font-display font-black text-white">
              {isDuelMode ? 'Algorithm Duel Arena' : `${subTabs.find(t => t.id === selectedAlgo)?.label || 'Sorting'} Visualizer`}
            </h2>
          </div>
        </div>

        {/* Controls: Size slider & Presets */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 pt-1 sm:pt-2">
          {/* Presets */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Presets:</span>
            {[
              { id: 'random', label: 'Random' },
              { id: 'reversed', label: 'Inverted' },
              { id: 'nearly-sorted', label: 'Nearly Sorted' },
              { id: 'few-unique', label: 'Few Unique' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => generateArray(arraySize, p.id)}
                className="px-2 sm:px-2.5 py-1 rounded-lg bg-zinc-900 text-[10px] sm:text-xs font-mono text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white transition-all touch-manipulation"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Array Size Slider */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Size: {arraySize}</span>
            <input
              type="range"
              min="10"
              max="60"
              value={arraySize}
              onChange={e => setArraySize(Number(e.target.value))}
              disabled={isPlaying}
              className="w-24 sm:w-28 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white touch-manipulation"
            />
          </div>
        </div>
      </div>

      {/* Main Area: Either Duel or Single Visualizer */}
      {isDuelMode ? (
        <SortingDuel baseArray={array} />
      ) : (
        <div className="glass-card rounded-2xl p-3.5 sm:p-6 border border-white/10 space-y-3 sm:space-y-4">
          {/* Step Description */}
          <div className="min-h-[40px] sm:min-h-[45px] bg-black/80 rounded-xl p-2.5 sm:p-3 border border-white/15 flex items-center justify-between text-[11px] sm:text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
              <span className="text-white font-medium">
                {currentStep.description || 'Click Play to begin sorting visualization.'}
              </span>
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <SortingBarChart
            array={currentStep.array}
            comparing={currentStep.comparing}
            swapping={currentStep.swapping}
            pivot={currentStep.pivot}
            sorted={currentStep.sorted}
            height={300}
            showLabels={array.length <= 32}
          />

          {/* Stats Bar */}
          <StatsDashboard
            stats={currentStep.stats}
            isRunning={isPlaying}
            isFinished={currentStepIdx === steps.length - 1 && steps.length > 0}
          />

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
          />
        </div>
      )}

      {/* Theoretical Complexity Card */}
      <ComplexityCard algoKey={selectedAlgo} />
    </div>
  );
}
