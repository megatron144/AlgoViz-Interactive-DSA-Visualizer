import React, { useState, useEffect, useRef } from 'react';
import { SegmentTreeModel } from '../../algorithms/advanced/segmentTree';
import PlaybackControls from '../common/PlaybackControls';
import StatsDashboard from '../common/StatsDashboard';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { Sparkles, Edit3, Search, RefreshCw } from 'lucide-react';

export default function SegmentTreeVisualizer({ onActiveLineChange }) {
  const [array, setArray] = useState([3, 1, 5, 7, 2, 4, 8, 6]);
  const [model, setModel] = useState(() => new SegmentTreeModel([3, 1, 5, 7, 2, 4, 8, 6]));
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(80);

  // Operation parameters
  const [queryL, setQueryL] = useState(1);
  const [queryR, setQueryR] = useState(5);
  const [updateIdx, setUpdateIdx] = useState(3);
  const [updateVal, setUpdateVal] = useState(10);
  const [customArrayInput, setCustomArrayInput] = useState('3, 1, 5, 7, 2, 4, 8, 6');

  const timerRef = useRef(null);

  // Initialize or re-create model
  const resetTree = (newArr = array) => {
    const m = new SegmentTreeModel(newArr);
    setModel(m);
    setSteps([]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    if (onActiveLineChange) onActiveLineChange(1);
  };

  const handleApplyCustomArray = () => {
    const parsed = customArrayInput
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));
    if (parsed.length >= 2 && parsed.length <= 16) {
      setArray(parsed);
      resetTree(parsed);
    }
  };

  const handleStartQuery = () => {
    const qL = Math.max(0, Math.min(queryL, array.length - 1));
    const qR = Math.max(qL, Math.min(queryR, array.length - 1));
    const querySteps = model.generateQuerySteps(qL, qR);
    setSteps(querySteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleStartUpdate = () => {
    const idx = Math.max(0, Math.min(updateIdx, array.length - 1));
    const updateSteps = model.generateUpdateSteps(idx, Number(updateVal));
    setSteps(updateSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIdx < steps.length - 1) {
          const nextIdx = currentStepIdx + 1;
          setCurrentStepIdx(nextIdx);

          const step = steps[nextIdx];
          if (step && onActiveLineChange && step.line) {
            onActiveLineChange(step.line);
          }
          if (step && step.node) {
            soundPlayer.playTone(step.node * 5, 0, 100);
          }
          if (nextIdx === steps.length - 1) {
            setIsPlaying(false);
            confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
          }
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIdx, steps, speed]);

  const currentStep = steps[currentStepIdx] || null;

  // Node position calculation for SVG tree
  const getNodeCoordinates = (node, start, end, depth = 0, xMin = 40, xMax = 760) => {
    const x = (xMin + xMax) / 2;
    const y = 50 + depth * 75;
    const coords = [{ id: node, start, end, x, y, depth }];

    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      const leftCoords = getNodeCoordinates(2 * node, start, mid, depth + 1, xMin, x);
      const rightCoords = getNodeCoordinates(2 * node + 1, mid + 1, end, depth + 1, x, xMax);
      return coords.concat(leftCoords).concat(rightCoords);
    }
    return coords;
  };

  const nodeCoords = getNodeCoordinates(1, 0, array.length - 1);
  const coordsMap = {};
  nodeCoords.forEach(c => { coordsMap[c.id] = c; });

  const isNodeContained = currentStep?.resultNodes?.includes(currentStep?.activeNode);

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Advanced Tree Structure</span>
            <h2 className="text-xl font-display font-black text-white">Segment Tree Range & Point Engine</h2>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2">
            {[
              { label: '8 Elements', arr: [3, 1, 5, 7, 2, 4, 8, 6] },
              { label: 'Powers of 2', arr: [1, 2, 4, 8, 16, 32, 64, 128] },
              { label: 'Alternating', arr: [10, 2, 10, 2, 10, 2, 10, 2] }
            ].map(p => (
              <button
                key={p.label}
                onClick={() => {
                  setArray(p.arr);
                  setCustomArrayInput(p.arr.join(', '));
                  resetTree(p.arr);
                }}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 text-xs font-mono text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Trigger Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {/* Range Query Panel */}
          <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Range Sum Query [L, R]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={array.length - 1}
                value={queryL}
                onChange={e => setQueryL(parseInt(e.target.value, 10) || 0)}
                className="w-16 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
                placeholder="L"
              />
              <span className="text-zinc-500 font-mono">to</span>
              <input
                type="number"
                min="0"
                max={array.length - 1}
                value={queryR}
                onChange={e => setQueryR(parseInt(e.target.value, 10) || 0)}
                className="w-16 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
                placeholder="R"
              />
              <button
                onClick={handleStartQuery}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10"
              >
                Query Sum
              </button>
            </div>
          </div>

          {/* Point Update Panel */}
          <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5" /> Point Update arr[idx] = val
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={array.length - 1}
                value={updateIdx}
                onChange={e => setUpdateIdx(parseInt(e.target.value, 10) || 0)}
                className="w-16 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
                placeholder="idx"
              />
              <span className="text-zinc-500 font-mono">➔</span>
              <input
                type="number"
                value={updateVal}
                onChange={e => setUpdateVal(parseInt(e.target.value, 10) || 0)}
                className="w-20 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white text-center"
                placeholder="newVal"
              />
              <button
                onClick={handleStartUpdate}
                className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-800 text-white border border-white/20 font-display font-bold text-xs hover:bg-zinc-700 transition-all"
              >
                Update
              </button>
            </div>
          </div>

          {/* Custom Array Input */}
          <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Custom Array
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customArrayInput}
                onChange={e => setCustomArrayInput(e.target.value)}
                className="flex-1 bg-black border border-white/15 rounded-lg px-2.5 py-1 text-xs font-mono text-white"
                placeholder="e.g. 3, 1, 5, 7, 2"
              />
              <button
                onClick={handleApplyCustomArray}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 text-white border border-white/20 font-mono text-xs hover:bg-zinc-700 transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        {/* Step Description Banner */}
        <div className="min-h-[50px] bg-black/80 rounded-xl p-3 border border-white/15 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-medium">
              {currentStep?.description || 'Select an operation above (Query or Update) to begin step-by-step visualization.'}
            </span>
          </div>
          {currentStep?.currentSum !== undefined && (
            <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-lg border border-white/20">
              <span className="text-[11px] font-mono text-zinc-400">Sum Accumulator:</span>
              <span className="text-sm font-display font-black text-white">{currentStep.currentSum}</span>
            </div>
          )}
        </div>

        {/* Interactive SVG Tree Canvas */}
        <div className="w-full h-[380px] bg-black/95 rounded-xl border border-white/10 overflow-hidden relative flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 800 360">
            {/* Edges */}
            {nodeCoords.map(node => {
              if (node.start === node.end) return null;
              const leftChild = coordsMap[2 * node.id];
              const rightChild = coordsMap[2 * node.id + 1];
              return (
                <g key={`edge-${node.id}`}>
                  {leftChild && (
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={leftChild.x}
                      y2={leftChild.y}
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="2"
                    />
                  )}
                  {rightChild && (
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={rightChild.x}
                      y2={rightChild.y}
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })}

            {/* Tree Nodes */}
            {nodeCoords.map(node => {
              const nodeData = model.nodes[node.id];
              const isActive = currentStep?.activeNode === node.id;
              const isContained = currentStep?.resultNodes?.includes(node.id);
              const isDisjoint = currentStep?.type === 'DISJOINT' && currentStep?.node === node.id;
              const isVisited = currentStep?.visitedNodes?.includes(node.id);

              let fillColor = '#09090b';
              let strokeColor = 'rgba(255, 255, 255, 0.3)';
              let textColor = '#ffffff';

              if (isContained) {
                fillColor = '#ffffff';
                strokeColor = '#ffffff';
                textColor = '#000000';
              } else if (isActive) {
                fillColor = '#27272a';
                strokeColor = '#ffffff';
              } else if (isDisjoint) {
                fillColor = '#18181b';
                strokeColor = 'rgba(255, 255, 255, 0.1)';
                textColor = '#71717a';
              } else if (isVisited) {
                fillColor = '#18181b';
                strokeColor = 'rgba(255, 255, 255, 0.5)';
              }

              return (
                <g key={`node-${node.id}`} className="transition-all duration-200">
                  {/* Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isActive || isContained ? '3' : '1.5'}
                    className={isActive ? 'filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''}
                  />

                  {/* Node Value */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily="Space Grotesk"
                  >
                    {nodeData ? (currentStep?.treeState ? currentStep.treeState[node.id] : nodeData.value) : ''}
                  </text>

                  {/* Interval Tag [L, R] */}
                  <text
                    x={node.x}
                    y={node.y - 27}
                    textAnchor="middle"
                    fill="#a1a1aa"
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                  >
                    [{node.start}, {node.end}]
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bottom Array Elements Alignment */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-zinc-400">Underlying Array:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {array.map((val, idx) => {
              const inQuery = currentStep?.qL !== undefined && idx >= currentStep.qL && idx <= currentStep.qR;
              const isUpdated = currentStep?.idx === idx;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border font-mono transition-all ${
                    isUpdated
                      ? 'bg-white text-black font-black border-white shadow-lg'
                      : inQuery
                      ? 'bg-zinc-800 text-white border-white/50'
                      : 'bg-zinc-900/80 text-zinc-300 border-white/10'
                  }`}
                >
                  <span className="text-xs font-bold">{val}</span>
                  <span className="text-[9px] text-zinc-500 mt-0.5">idx: {idx}</span>
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

      {/* Complexity and Theory Card */}
      <ComplexityCard algoKey="segment-tree" />
    </div>
  );
}
