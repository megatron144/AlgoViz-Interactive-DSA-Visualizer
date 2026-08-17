import React, { useState, useEffect, useRef } from 'react';
import { generateNQueensSteps } from '../../algorithms/dp/dpAlgorithms';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { Crown, Sparkles, Play, ShieldAlert } from 'lucide-react';

export default function NQueensVisualizer({ onActiveLineChange }) {
  const [boardSize, setBoardSize] = useState(6);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(80);

  const timerRef = useRef(null);

  const handleStartSolve = () => {
    const s = generateNQueensSteps(Number(boardSize));
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
          if (step?.type === 'PLACE_QUEEN') {
            soundPlayer.playTone((step.row + 1) * 15, 0, 100);
          } else if (step?.type === 'SOLUTION_FOUND') {
            soundPlayer.playCompletionSweep();
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
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
    board: Array.from({ length: boardSize }, () => new Array(boardSize).fill(0)),
    queens: [],
    solutionsCount: 0,
    description: ''
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Constraint Backtracking</span>
            <h2 className="text-xl font-display font-black text-white">N-Queens Problem Visualizer</h2>
          </div>

          {/* Board Size Selector & Solve Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-900/90 p-1.5 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-zinc-400 px-1">Board Size N:</span>
              {[4, 5, 6, 7, 8].map(n => (
                <button
                  key={n}
                  onClick={() => {
                    setBoardSize(n);
                    setSteps([]);
                    setCurrentStepIdx(0);
                    setIsPlaying(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    boardSize === n
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {n}×{n}
                </button>
              ))}
            </div>

            <button
              onClick={handleStartSolve}
              className="px-5 py-2 rounded-xl bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10"
            >
              Solve N-Queens
            </button>
          </div>
        </div>
      </div>

      {/* Main Chessboard Stage */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        {/* Description Banner */}
        <div className="min-h-[45px] bg-black/80 rounded-xl p-3 border border-white/15 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-medium">
              {currentStep.description || 'Select board size and click Solve N-Queens.'}
            </span>
          </div>
          <div className="bg-zinc-900 px-3 py-1 rounded-lg border border-white/10 text-white font-bold">
            Solutions: {currentStep.solutionsCount || 0}
          </div>
        </div>

        {/* Dynamic Chessboard Canvas */}
        <div className="flex justify-center p-4 bg-black/95 rounded-xl border border-white/10">
          <div 
            className="grid gap-1 bg-zinc-900 p-2 rounded-xl border border-white/10 shadow-2xl"
            style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
          >
            {currentStep.board.map((row, r) =>
              row.map((cell, c) => {
                const isBlackSquare = (r + c) % 2 === 1;
                const hasQueen = cell === 1;
                const isChecking = currentStep.row === r && currentStep.col === c;
                const isConflict = currentStep.type === 'CONFLICT' && isChecking;

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-mono text-xs transition-all duration-150 ${
                      isConflict
                        ? 'bg-zinc-700 border-2 border-white animate-pulse'
                        : hasQueen
                        ? 'bg-white text-black font-black shadow-[0_0_15px_rgba(255,255,255,0.7)]'
                        : isChecking
                        ? 'bg-zinc-800 border border-white/50'
                        : isBlackSquare
                        ? 'bg-zinc-950 border border-white/5'
                        : 'bg-zinc-900 border border-white/10'
                    }`}
                  >
                    {hasQueen ? (
                      <Crown className="w-6 h-6 fill-black text-black animate-wave-grow" />
                    ) : isChecking ? (
                      <span className="w-2 h-2 rounded-full bg-white/60" />
                    ) : null}
                  </div>
                );
              })
            )}
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
      <ComplexityCard algoKey="n-queens" />
    </div>
  );
}
