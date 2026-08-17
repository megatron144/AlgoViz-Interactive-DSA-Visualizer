import React, { useState, useEffect, useRef } from 'react';
import { BinaryLiftingModel } from '../../algorithms/advanced/binaryLifting';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { GitCommit, ArrowUp, Zap, HelpCircle } from 'lucide-react';

export default function BinaryLiftingVisualizer({ onActiveLineChange }) {
  const [model] = useState(() => new BinaryLiftingModel());
  const [mode, setMode] = useState('lca'); // 'lca' | 'kth'
  const [nodeU, setNodeU] = useState(10);
  const [nodeV, setNodeV] = useState(12);
  const [targetK, setTargetK] = useState(3);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(150);

  const timerRef = useRef(null);

  const handleStart = () => {
    let generated = [];
    if (mode === 'lca') {
      generated = model.generateLCASteps(Number(nodeU), Number(nodeV));
    } else {
      generated = model.generateKthAncestorSteps(Number(nodeU), Number(targetK));
    }
    setSteps(generated);
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
          if (step?.curNode || step?.u) {
            soundPlayer.playTone((step.curNode || step.u) * 8, 0, 100);
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
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Tree Dynamic Programming</span>
            <h2 className="text-xl font-display font-black text-white">Binary Lifting & LCA Engine</h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setMode('lca')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                mode === 'lca' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Lowest Common Ancestor (LCA)
            </button>
            <button
              onClick={() => setMode('kth')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                mode === 'kth' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              k-th Ancestor Query
            </button>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {mode === 'lca' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">Node u:</span>
                <select
                  value={nodeU}
                  onChange={e => setNodeU(Number(e.target.value))}
                  className="bg-black border border-white/15 rounded-lg px-3 py-1 text-xs font-mono text-white"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>Node {n} (depth {model.depth[n]})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">Node v:</span>
                <select
                  value={nodeV}
                  onChange={e => setNodeV(Number(e.target.value))}
                  className="bg-black border border-white/15 rounded-lg px-3 py-1 text-xs font-mono text-white"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>Node {n} (depth {model.depth[n]})</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">Target Node:</span>
                <select
                  value={nodeU}
                  onChange={e => setNodeU(Number(e.target.value))}
                  className="bg-black border border-white/15 rounded-lg px-3 py-1 text-xs font-mono text-white"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>Node {n} (depth {model.depth[n]})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">k (ancestor distance):</span>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={targetK}
                  onChange={e => setTargetK(Number(e.target.value))}
                  className="w-16 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
                />
              </div>
            </>
          )}

          <button
            onClick={handleStart}
            className="px-5 py-2 rounded-xl bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
          >
            Execute {mode === 'lca' ? 'LCA Search' : 'Ancestor Jump'}
          </button>
        </div>
      </div>

      {/* Main Visualizer Area: Grid Layout with Tree on Left, Binary Lifting Table on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tree Canvas */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="min-h-[45px] bg-black/80 rounded-xl p-3 border border-white/15 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white font-medium">
                {currentStep?.description || 'Select nodes and click Execute to observe power-of-2 tree jumps.'}
              </span>
            </div>
          </div>

          <div className="w-full h-[360px] bg-black/95 rounded-xl border border-white/10 overflow-hidden relative flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 760 340">
              {/* Render Tree Edges */}
              {Object.keys(model.adj).map(uStr => {
                const u = Number(uStr);
                const posU = model.nodePositions[u];
                return (model.adj[u] || []).map(v => {
                  const posV = model.nodePositions[v];
                  return (
                    <line
                      key={`edge-${u}-${v}`}
                      x1={posU.x}
                      y1={posU.y}
                      x2={posV.x}
                      y2={posV.y}
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="2"
                    />
                  );
                });
              })}

              {/* Render Tree Nodes */}
              {Object.keys(model.nodePositions).map(nStr => {
                const n = Number(nStr);
                const pos = model.nodePositions[n];
                const isU = (currentStep?.u === n || (mode === 'kth' && currentStep?.curNode === n));
                const isV = currentStep?.v === n;
                const isLCA = currentStep?.lca === n;
                const isHighlighted = currentStep?.highlightedNodes?.includes(n);

                let fillColor = '#09090b';
                let strokeColor = 'rgba(255, 255, 255, 0.3)';
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
                  <g key={`tree-node-${n}`} className="transition-all duration-200">
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="18"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isU || isV || isLCA ? '3' : '1.5'}
                      className={isU || isV || isLCA ? 'filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' : ''}
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
                      fill="#71717a"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                    >
                      d={model.depth[n]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Column: Binary Lifting 2^i Up-Table */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> 2^i Binary Lifting Jump Table (up[u][i])
              </span>
              <p className="text-[10px] text-zinc-400 font-mono">up[u][i] = 2^i-th ancestor of u</p>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[360px] scrollbar-thin">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 text-[10px]">
                  <th className="py-1 px-2">Node</th>
                  <th className="py-1 px-2">2^0 (1)</th>
                  <th className="py-1 px-2">2^1 (2)</th>
                  <th className="py-1 px-2">2^2 (4)</th>
                  <th className="py-1 px-2">2^3 (8)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(nodeId => {
                  const isNodeActive = currentStep?.tableHighlight?.node === nodeId;
                  return (
                    <tr
                      key={nodeId}
                      className={isNodeActive ? 'bg-white/10 font-bold text-white' : 'text-zinc-400'}
                    >
                      <td className="py-1 px-2 font-bold text-white">Node {nodeId}</td>
                      {Array.from({ length: 4 }, (_, power) => {
                        const val = model.up[nodeId][power];
                        const isCellActive = isNodeActive && currentStep?.tableHighlight?.power === power;
                        return (
                          <td
                            key={power}
                            className={`py-1 px-2 rounded ${
                              isCellActive
                                ? 'bg-white text-black font-black'
                                : 'text-zinc-300'
                            }`}
                          >
                            {val !== null ? `Node ${val}` : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

      {/* Theory Card */}
      <ComplexityCard algoKey="binary-lifting" />
    </div>
  );
}
