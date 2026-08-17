import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  Gauge, 
  Sliders
} from 'lucide-react';

export default function PlaybackControls({
  isPlaying,
  onPlayPause,
  onReset,
  onStepForward,
  onStepBackward,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  onScrub,
  disabled = false
}) {
  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="glass-card rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 border border-white/10 shadow-2xl">
      {/* Playback Buttons */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full md:w-auto">
        <button
          onClick={onReset}
          title="Reset"
          disabled={disabled}
          className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white disabled:opacity-40 transition-all touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onStepBackward}
          title="Step Backward"
          disabled={disabled || currentStep <= 0}
          className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white disabled:opacity-30 transition-all touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={onPlayPause}
          disabled={disabled || (currentStep >= totalSteps - 1 && totalSteps > 0)}
          className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all duration-200 shadow-md touch-manipulation min-h-[38px] ${
            isPlaying
              ? 'bg-zinc-800 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
              : 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02]'
          } disabled:opacity-40`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-black" />
              <span>{currentStep >= totalSteps - 1 && totalSteps > 0 ? 'Finished' : 'Play'}</span>
            </>
          )}
        </button>

        <button
          onClick={onStepForward}
          title="Step Forward"
          disabled={disabled || currentStep >= totalSteps - 1}
          className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white disabled:opacity-30 transition-all touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Timeline Scrubber */}
      <div className="flex-1 w-full flex items-center gap-2 sm:gap-3 px-1 sm:px-2">
        <span className="text-[11px] sm:text-xs font-mono text-zinc-400 min-w-[50px] sm:min-w-[55px]">
          {totalSteps > 0 ? `${currentStep + 1}/${totalSteps}` : '0/0'}
        </span>

        <div className="relative flex-1 flex items-center py-2">
          <input
            type="range"
            min="0"
            max={Math.max(0, totalSteps - 1)}
            value={currentStep}
            onChange={(e) => onScrub && onScrub(Number(e.target.value))}
            disabled={disabled || totalSteps <= 1}
            className="w-full h-2 sm:h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white disabled:opacity-40 touch-manipulation"
          />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-2 sm:h-1.5 bg-white rounded-lg pointer-events-none transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Speed Slider / Multiplier */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 w-full md:w-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-zinc-400">
          <Gauge className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
          <span>Delay: {speed}ms</span>
        </div>

        <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/10">
          {[
            { label: 'Fast', value: 10 },
            { label: 'Med', value: 80 },
            { label: 'Slow', value: 300 }
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => onSpeedChange(s.value)}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-medium transition-all touch-manipulation ${
                speed === s.value
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
