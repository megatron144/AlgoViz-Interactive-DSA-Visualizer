import React, { useState, useEffect, useRef } from 'react';
import { TreeModel } from '../../algorithms/tree/treeAlgorithms';
import PlaybackControls from '../common/PlaybackControls';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { GitBranch, Plus, Search, RotateCw, Play } from 'lucide-react';

export default function TreeVisualizer({ onActiveLineChange }) {
  const [isAVL, setIsAVL] = useState(true);
  const [treeModel, setTreeModel] = useState(() => {
    const tm = new TreeModel(true);
    [50, 25, 75, 10, 30, 60, 90].forEach(v => tm.insert(v));
    return tm;
  });
  const [inputValue, setInputValue] = useState(40);
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(250);

  const timerRef = useRef(null);

  const handleInsert = () => {
    const val = Number(inputValue);
    if (isNaN(val)) return;
    const insertSteps = treeModel.insert(val);
    // Force re-render of tree structure
    setTreeModel(Object.assign(Object.create(Object.getPrototypeOf(treeModel)), treeModel));
    setSteps(insertSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleSearch = () => {
    const val = Number(inputValue);
    if (isNaN(val)) return;
    const searchSteps = treeModel.generateSearchSteps(val);
    setSteps(searchSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleTraversal = (type) => {
    const traversalSteps = treeModel.generateTraversalSteps(type);
    setSteps(traversalSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  const handleReset = (avlMode = isAVL) => {
    const tm = new TreeModel(avlMode);
    [50, 25, 75, 10, 30, 60, 90].forEach(v => tm.insert(v));
    setTreeModel(tm);
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
          if (step?.node || step?.val) {
            soundPlayer.playTone((step.node || step.val), 0, 100);
          }
          if (next === steps.length - 1) {
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

  // Flatten tree for SVG coordinates
  const getTreeLayout = (node, depth = 0, xMin = 40, xMax = 760, y = 50) => {
    if (!node) return [];
    const x = (xMin + xMax) / 2;
    const current = { val: node.val, height: node.height, x, y };

    let leftList = [];
    let rightList = [];
    if (node.left) {
      leftList = getTreeLayout(node.left, depth + 1, xMin, x, y + 70);
    }
    if (node.right) {
      rightList = getTreeLayout(node.right, depth + 1, x, xMax, y + 70);
    }
    return [current, ...leftList, ...rightList];
  };

  // Get Edges
  const getTreeEdges = (node, depth = 0, xMin = 40, xMax = 760, y = 50) => {
    if (!node) return [];
    const x = (xMin + xMax) / 2;
    const edges = [];

    if (node.left) {
      const leftX = (xMin + x) / 2;
      const leftY = y + 70;
      edges.push({ x1: x, y1: y, x2: leftX, y2: leftY });
      edges.push(...getTreeEdges(node.left, depth + 1, xMin, x, leftY));
    }
    if (node.right) {
      const rightX = (x + xMax) / 2;
      const rightY = y + 70;
      edges.push({ x1: x, y1: y, x2: rightX, y2: rightY });
      edges.push(...getTreeEdges(node.right, depth + 1, x, xMax, rightY));
    }
    return edges;
  };

  const treeNodes = getTreeLayout(treeModel.root);
  const treeEdges = getTreeEdges(treeModel.root);

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest">Self-Balancing & Binary Trees</span>
            <h2 className="text-lg sm:text-xl font-display font-black text-white">BST & AVL Tree Visualizer</h2>
          </div>

          {/* AVL vs Standard BST toggle */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                setIsAVL(true);
                handleReset(true);
              }}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono transition-all touch-manipulation ${
                isAVL ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              AVL (Balancing)
            </button>
            <button
              onClick={() => {
                setIsAVL(false);
                handleReset(false);
              }}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono transition-all touch-manipulation ${
                !isAVL ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Standard BST
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900/90 p-1 sm:p-1.5 rounded-xl border border-white/10">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 pl-1">Value:</span>
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(Number(e.target.value))}
              className="w-14 sm:w-16 bg-black border border-white/15 rounded-lg px-1.5 sm:px-2 py-1 text-xs font-mono text-white text-center"
            />
            <button
              onClick={handleInsert}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all shadow-md shadow-white/10 flex items-center gap-1 touch-manipulation"
            >
              <Plus className="w-3.5 h-3.5" /> Insert
            </button>
            <button
              onClick={handleSearch}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-800 text-white font-mono text-xs hover:bg-zinc-700 transition-all border border-white/10 flex items-center gap-1 touch-manipulation"
            >
              <Search className="w-3.5 h-3.5" /> Search
            </button>
          </div>

          {/* Traversals */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 bg-zinc-900/80 p-1 sm:p-1.5 rounded-xl border border-white/10">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 px-1">Traversals:</span>
            {['inorder', 'preorder', 'postorder', 'bfs'].map(t => (
              <button
                key={t}
                onClick={() => handleTraversal(t)}
                className="px-2 sm:px-2.5 py-1 rounded-lg bg-black text-[10px] sm:text-xs font-mono text-zinc-300 border border-white/10 hover:text-white transition-all touch-manipulation"
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border border-white/10 space-y-3 sm:space-y-4">
        {/* Description Banner */}
        <div className="min-h-[40px] sm:min-h-[45px] bg-black/80 rounded-xl p-2.5 sm:p-3 border border-white/15 flex items-center justify-between text-[11px] sm:text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
            <span className="text-white font-medium">
              {currentStep?.description || 'Insert a value or select a traversal to watch rotations and search paths.'}
            </span>
          </div>
        </div>

        {/* Traversal Output Strip */}
        {currentStep?.sequence && (
          <div className="flex items-center gap-2 bg-zinc-900/90 p-2.5 sm:p-3 rounded-xl border border-white/10 touch-scroll">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Sequence:</span>
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto">
              {currentStep.sequence.map((val, idx) => (
                <span key={idx} className="px-2 sm:px-2.5 py-0.5 rounded bg-white text-black font-mono font-bold text-xs shadow">
                  {val}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tree SVG Canvas */}
        <div className="w-full h-[280px] sm:h-[360px] bg-black/95 rounded-xl border border-white/10 overflow-x-auto touch-scroll relative flex items-center justify-start sm:justify-center">
          <svg className="w-full min-w-[560px] sm:min-w-[700px] h-full" viewBox="0 0 800 340">
            {/* Edges */}
            {treeEdges.map((e, idx) => (
              <line
                key={`edge-${idx}`}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="2"
              />
            ))}

            {/* Tree Nodes */}
            {treeNodes.map((n) => {
              const isActive = currentStep?.node === n.val;
              const isFound = currentStep?.type === 'SEARCH_FOUND' && currentStep?.node === n.val;
              const isRotated = currentStep?.type === 'ROTATE' && currentStep?.node === n.val;

              let fillColor = '#09090b';
              let strokeColor = 'rgba(255, 255, 255, 0.3)';
              let textColor = '#ffffff';

              if (isFound) {
                fillColor = '#ffffff';
                strokeColor = '#ffffff';
                textColor = '#000000';
              } else if (isActive || isRotated) {
                fillColor = '#27272a';
                strokeColor = '#ffffff';
              }

              return (
                <g key={`treenode-${n.val}`}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="20"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isActive || isFound ? '3' : '1.5'}
                    className={isActive || isFound ? 'filter drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]' : ''}
                  />
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="Space Grotesk"
                  >
                    {n.val}
                  </text>
                  <text
                    x={n.x}
                    y={n.y - 25}
                    textAnchor="middle"
                    fill="#71717a"
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                  >
                    h={n.height}
                  </text>
                </g>
              );
            })}
          </svg>
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
      <ComplexityCard algoKey={isAVL ? 'avl' : 'bst'} />
    </div>
  );
}
