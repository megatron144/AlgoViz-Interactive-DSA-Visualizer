import React, { useState, useEffect, useRef } from 'react';
import { HLDModel } from '../../algorithms/advanced/hld';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { GitFork, ArrowRight, Zap } from 'lucide-react';

export default function HLDVisualizer({ onActiveLineChange }) {
  const [model] = useState(() => new HLDModel());
  const [nodeU, setNodeU] = useState(8);
  const [nodeV, setNodeV] = useState(11);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(150);

  const timerRef = useRef(null);

  const handleStartQuery = () => {
    const querySteps = model.generatePathQuerySteps(Number(nodeU), Number(nodeV));
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
          if (step?.u || step?.v) {
            soundPlayer.playTone((step.u || 1) * 8, 0, 100);
          }
          if (next === steps.length - 1) {
            setIsPlaying(false);
            confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
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
      {/* Configuration Header */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Advanced Tree Decomposition</span>
            <h2 className="text-xl font-display font-black text-white">Heavy-Light Decomposition (HLD) Engine</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <span className="w-4 h-1 bg-white inline-block rounded" />
              <span>Heavy Edge</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <span className="w-4 h-0.5 border-b border-dashed border-zinc-500 inline-block" />
              <span>Light Edge</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Path from:</span>
            <select
              value={nodeU}
              onChange={e => setNodeU(Number(e.target.value))}
              className="bg-black border border-white/15 rounded-lg px-2 sm:px-3 py-1 text-xs font-mono text-white"
            >
              {Array.from({ length: 11 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>Node {n} (Head: {model.head[n]})</option>
              ))}
            </select>
          </div>

          <span className="text-zinc-500 font-mono text-xs">➔</span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">To:</span>
            <select
              value={nodeV}
              onChange={e => setNodeV(Number(e.target.value))}
              className="bg-black border border-white/15 rounded-lg px-2 sm:px-3 py-1 text-xs font-mono text-white"
            >
              {Array.from({ length: 11 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>Node {n} (Head: {model.head[n]})</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStartQuery}
            className="px-4 sm:px-5 py-1.5 rounded-xl bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10 touch-manipulation"
          >
            Decompose Path
          </button>
        </div>
      </div>

      {/* Main Layout: Tree SVG and Heavy Chain Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Tree SVG */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
          <div className="min-h-[40px] sm:min-h-[45px] bg-black/80 rounded-xl p-2.5 sm:p-3 border border-white/15 flex items-center justify-between text-[11px] sm:text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
              <span className="text-white font-medium">
                {currentStep?.description || 'Select path nodes u and v, then click Decompose Path.'}
              </span>
            </div>
          </div>

          <div className="w-full h-[280px] sm:h-[360px] bg-black/95 rounded-xl border border-white/10 overflow-x-auto touch-scroll relative flex items-center justify-start sm:justify-center">
            <svg className="w-full min-w-[500px] sm:min-w-[650px] md:min-w-[760px] h-full" viewBox="0 0 760 340">
              {/* Render Tree Edges */}
              {Object.keys(model.adj).map(uStr => {
                const u = Number(uStr);
                const posU = model.nodePositions[u];
                return (model.adj[u] || []).map(v => {
                  const posV = model.nodePositions[v];
                  const isHeavy = model.heavy[u] === v;
                  return (
                    <line
                      key={`edge-${u}-${v}`}
                      x1={posU.x}
                      y1={posU.y}
                      x2={posV.x}
                      y2={posV.y}
                      stroke={isHeavy ? '#ffffff' : 'rgba(255, 255, 255, 0.25)'}
                      strokeWidth={isHeavy ? '3.5' : '1.5'}
                      strokeDasharray={isHeavy ? 'none' : '4,4'}
                      className={isHeavy ? 'filter drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' : ''}
                    />
                  );
                });
              })}

              {/* Render Tree Nodes */}
              {Object.keys(model.nodePositions).map(nStr => {
                const n = Number(nStr);
                const pos = model.nodePositions[n];
                const isU = currentStep?.u === n;
                const isV = currentStep?.v === n;
                const isLCA = currentStep?.lca === n;
                const isActive = isU || isV || isLCA;

                let fillColor = '#09090b';
                let strokeColor = 'rgba(255, 255, 255, 0.4)';
                let textColor = '#ffffff';

                if (isLCA) {
                  fillColor = '#ffffff';
                  strokeColor = '#ffffff';
                  textColor = '#000000';
                } else if (isU || isV) {
                  fillColor = '#27272a';
                  strokeColor = '#ffffff';
                }

                return (
                  <g key={`hld-node-${n}`}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="18"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isActive ? '3' : '1.5'}
                      className={isActive ? 'filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' : ''}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="Space Grotesk"
                    >
                      {n}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y - 22}
                      textAnchor="middle"
                      fill="#a1a1aa"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                    >
                      sz={model.subSize[n]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Info: Chain Mapping & Continuous Segments */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Euler Linear Segments
            </span>
            <p className="text-[10px] text-zinc-400 font-mono">Tree flattened to contiguous array ranges</p>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[300px]">
            {Array.from({ length: 11 }, (_, i) => i + 1).map(nodeId => (
              <div
                key={nodeId}
                className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80 border border-white/5 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span className="font-bold text-white">Node {nodeId}</span>
                </div>
                <div className="text-right text-[11px] text-zinc-400">
                  <span>Head: {model.head[nodeId]}</span> | <span className="text-white">Pos: {model.pos[nodeId]}</span>
                </div>
              </div>
            ))}
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
      <ComplexityCard algoKey="hld" />
    </div>
  );
}
