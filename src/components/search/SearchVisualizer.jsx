import React, { useState, useEffect, useRef } from 'react';
import { generateSearchSteps } from '../../algorithms/search/searchAlgorithms';
import PlaybackControls from '../common/PlaybackControls';
import StatsDashboard from '../common/StatsDashboard';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { Search, Shuffle, Play } from 'lucide-react';

export default function SearchVisualizer({ onActiveLineChange }) {
  const [array, setArray] = useState([12, 23, 34, 45, 56, 67, 78, 89, 91, 105, 118, 129, 142, 155, 168]);
  const [target, setTarget] = useState(78);
  const [selectedAlgo, setSelectedAlgo] = useState('binary-search');
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(150);

  const timerRef = useRef(null);

  const handleStartSearch = (algo = selectedAlgo, targetVal = target) => {
    const s = generateSearchSteps(algo, array, Number(targetVal));
    setSteps(s);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const generateNewArray = () => {
    const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 150) + 10)
      .sort((a, b) => a - b);
    setArray(newArr);
    const randomTarget = newArr[Math.floor(Math.random() * newArr.length)];
    setTarget(randomTarget);
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
          if (step?.currentIndex !== null && step?.currentIndex !== undefined) {
            soundPlayer.playTone(step.array[step.currentIndex], 10, 160);
          } else if (step?.mid !== null && step?.mid !== undefined) {
            soundPlayer.playTone(step.array[step.mid], 10, 160);
          }

          if (step?.type === 'FOUND') {
            soundPlayer.playCompletionSweep();
            confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
          }

          if (next === steps.length - 1) {
            setIsPlaying(false);
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
    target,
    currentIndex: null,
    low: null,
    high: null,
    mid: null,
    foundIndex: null,
    comparisons: 0,
    description: ''
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Searching Techniques</span>
            <h2 className="text-xl font-display font-black text-white">Linear & Binary Search Visualizer</h2>
          </div>

          {/* Algorithm Mode Switcher */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                setSelectedAlgo('binary-search');
                setSteps([]);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedAlgo === 'binary-search'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Binary Search O(log N)
            </button>
            <button
              onClick={() => {
                setSelectedAlgo('linear-search');
                setSteps([]);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedAlgo === 'linear-search'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Linear Search O(N)
            </button>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900/90 p-1.5 sm:p-2 rounded-xl border border-white/10">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Target:</span>
            <input
              type="number"
              value={target}
              onChange={e => setTarget(Number(e.target.value))}
              className="w-14 sm:w-16 bg-black border border-white/15 rounded-lg px-1.5 sm:px-2 py-1 text-xs font-mono text-white text-center"
            />
            <button
              onClick={() => handleStartSearch(selectedAlgo, target)}
              className="px-3 sm:px-4 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10 flex items-center gap-1.5 touch-manipulation"
            >
              <Search className="w-3.5 h-3.5" /> Start
            </button>
          </div>

          <button
            onClick={generateNewArray}
            className="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-xs border border-white/10 hover:text-white transition-all flex items-center gap-1.5 touch-manipulation"
          >
            <Shuffle className="w-3.5 h-3.5" /> Randomize
          </button>
        </div>
      </div>

      {/* Main Search Stage */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border border-white/10 space-y-4 sm:space-y-6">
        {/* Description Banner */}
        <div className="min-h-[40px] sm:min-h-[45px] bg-black/80 rounded-xl p-2.5 sm:p-3 border border-white/15 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
            <span className="text-white font-medium">
              {currentStep.description || 'Enter a target value and click Start Search.'}
            </span>
          </div>
          <div className="bg-zinc-900 px-2.5 sm:px-3 py-1 rounded-lg border border-white/10 text-white font-bold text-xs">
            Comparisons: {currentStep.comparisons || 0}
          </div>
        </div>

        {/* Search Array Elements Visualizer */}
        <div className="space-y-4">
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto p-3 sm:p-6 bg-black/95 rounded-2xl border border-white/10 touch-scroll">
            {array.map((val, idx) => {
              const isCurrent = currentStep.currentIndex === idx;
              const isMid = currentStep.mid === idx;
              const isLow = currentStep.low === idx;
              const isHigh = currentStep.high === idx;
              const isFound = currentStep.foundIndex === idx;
              const isOutRange = (currentStep.low !== null && currentStep.high !== null) && (idx < currentStep.low || idx > currentStep.high);

              return (
                <div key={idx} className="flex flex-col items-center gap-1 flex-shrink-0">
                  {/* Top Pointer Badge */}
                  <div className="h-5 flex items-center">
                    {isFound ? (
                      <span className="text-[8px] sm:text-[10px] font-mono font-black text-black bg-white px-1 rounded">MATCH</span>
                    ) : isMid ? (
                      <span className="text-[8px] sm:text-[10px] font-mono font-bold text-white bg-zinc-700 px-1 rounded border border-white">MID</span>
                    ) : isLow ? (
                      <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400">LOW</span>
                    ) : isHigh ? (
                      <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400">HIGH</span>
                    ) : null}
                  </div>

                  {/* Element Box */}
                  <div
                    className={`w-9 h-11 xs:w-10 xs:h-12 sm:w-12 sm:h-14 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-150 ${
                      isFound
                        ? 'bg-white text-black font-black border-white shadow-[0_0_20px_rgba(255,255,255,0.9)] scale-110'
                        : isMid || isCurrent
                        ? 'bg-zinc-800 text-white font-bold border-2 border-white shadow-lg'
                        : isOutRange
                        ? 'bg-zinc-950 text-zinc-600 border-white/5 opacity-40'
                        : 'bg-zinc-900 text-zinc-300 border-white/15'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold">{val}</span>
                  </div>

                  {/* Bottom Index Tag */}
                  <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500">[{idx}]</span>
                </div>
              );
            })}
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
      <ComplexityCard algoKey={selectedAlgo} />
    </div>
  );
}
