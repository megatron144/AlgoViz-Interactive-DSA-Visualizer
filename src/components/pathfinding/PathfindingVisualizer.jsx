import React, { useState, useEffect, useRef } from 'react';
import { 
  getInitialGrid, 
  generatePathfindingSteps, 
  generateMaze, 
  GRID_ROWS, 
  GRID_COLS 
} from '../../algorithms/pathfinding/pathfindingAlgorithms';
import GridCanvas from './GridCanvas';
import PlaybackControls from '../common/PlaybackControls';
import StatsDashboard from '../common/StatsDashboard';
import ComplexityCard from '../common/ComplexityCard';
import confetti from 'canvas-confetti';
import { soundPlayer } from '../../utils/audio';
import { 
  Compass, 
  Layers, 
  Trash2, 
  Navigation, 
  Flag, 
  Square, 
  ShieldAlert, 
  Eraser, 
  Sparkles 
} from 'lucide-react';

export default function PathfindingVisualizer({ onActiveLineChange }) {
  const [startNode, setStartNode] = useState({ row: 10, col: 8 });
  const [targetNode, setTargetNode] = useState({ row: 10, col: 36 });
  const [grid, setGrid] = useState(() => getInitialGrid({ row: 10, col: 8 }, { row: 10, col: 36 }));
  const [selectedAlgo, setSelectedAlgo] = useState('astar');
  const [tool, setTool] = useState('wall'); // 'wall' | 'weight' | 'start' | 'target' | 'eraser'
  const [isMousePressed, setIsMousePressed] = useState(false);

  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [shortestPath, setShortestPath] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(15);
  const [stats, setStats] = useState({ visitedCount: 0, pathLength: 0, cost: 0 });

  const timerRef = useRef(null);

  const handleCellInteraction = (r, c) => {
    if (isPlaying) return;

    if (tool === 'start') {
      if (grid[r][c].isWall || grid[r][c].isTarget) return;
      const newGrid = grid.map(row => row.map(cell => ({ ...cell, isStart: cell.row === r && cell.col === c })));
      setStartNode({ row: r, col: c });
      setGrid(newGrid);
      return;
    }

    if (tool === 'target') {
      if (grid[r][c].isWall || grid[r][c].isStart) return;
      const newGrid = grid.map(row => row.map(cell => ({ ...cell, isTarget: cell.row === r && cell.col === c })));
      setTargetNode({ row: r, col: c });
      setGrid(newGrid);
      return;
    }

    if (grid[r][c].isStart || grid[r][c].isTarget) return;

    const newGrid = grid.map((row, rowIdx) =>
      row.map((cell, colIdx) => {
        if (rowIdx === r && colIdx === c) {
          if (tool === 'wall') return { ...cell, isWall: !cell.isWall, weight: 1 };
          if (tool === 'weight') return { ...cell, weight: cell.weight > 1 ? 1 : 5, isWall: false };
          if (tool === 'eraser') return { ...cell, isWall: false, weight: 1 };
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const handleMouseDown = (r, c) => {
    setIsMousePressed(true);
    handleCellInteraction(r, c);
  };

  const handleMouseEnter = (r, c) => {
    if (!isMousePressed) return;
    handleCellInteraction(r, c);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const handleGenerateMaze = (type) => {
    clearSearchVisuals();
    const walls = generateMaze(type, startNode, targetNode);
    const wallSet = new Set(walls.map(w => `${w.row},${w.col}`));

    const newGrid = grid.map(row =>
      row.map(cell => {
        if (cell.isStart || cell.isTarget) return cell;
        return {
          ...cell,
          isWall: wallSet.has(`${cell.row},${cell.col}`),
          weight: 1
        };
      })
    );
    setGrid(newGrid);
  };

  const clearSearchVisuals = () => {
    setVisitedNodes([]);
    setShortestPath([]);
    setSteps([]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    setStats({ visitedCount: 0, pathLength: 0, cost: 0 });
  };

  const clearAllWalls = () => {
    clearSearchVisuals();
    const newGrid = grid.map(row => row.map(cell => ({ ...cell, isWall: false, weight: 1 })));
    setGrid(newGrid);
  };

  const runVisualizer = () => {
    clearSearchVisuals();
    const generatedSteps = generatePathfindingSteps(selectedAlgo, grid, startNode, targetNode);
    setSteps(generatedSteps);
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
          if (step.type === 'VISIT') {
            setVisitedNodes(prev => [...prev, step.node]);
            setStats(prev => ({ ...prev, visitedCount: step.visitedCount }));
            if (next % 3 === 0) {
              soundPlayer.playTone(step.node.row * 4 + step.node.col, 0, 100, 0.02);
            }
          } else if (step.type === 'FINISHED') {
            setShortestPath(step.path || []);
            setStats({
              visitedCount: step.visitedCount,
              pathLength: step.pathLength,
              cost: step.cost
            });
            setIsPlaying(false);
            if (step.found) {
              soundPlayer.playCompletionSweep();
              confetti({ particleCount: 45, spread: 60, origin: { y: 0.8 } });
            }
          }
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIdx, steps, speed]);

  const currentStep = steps[currentStepIdx] || null;

  const algoOptions = [
    { id: 'astar', label: 'A* (A-Star) Search' },
    { id: 'dijkstra', label: "Dijkstra's Algorithm" },
    { id: 'bfs', label: 'Breadth-First Search (BFS)' },
    { id: 'dfs', label: 'Depth-First Search (DFS)' },
    { id: 'greedy-bfs', label: 'Greedy Best-First' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Algo Selector */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest">Graph & Grid Traversal</span>
            <h2 className="text-lg sm:text-xl font-display font-black text-white">Pathfinding & Maze Visualizer</h2>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={runVisualizer}
              disabled={isPlaying}
              className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-white text-black font-display font-black text-xs hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 disabled:opacity-40 touch-manipulation"
            >
              Find Shortest Path
            </button>
          </div>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 sm:p-1.5 bg-zinc-900/90 rounded-2xl border border-white/10 scrollbar-none touch-scroll">
          {algoOptions.map(opt => {
            const isActive = selectedAlgo === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setSelectedAlgo(opt.id);
                  clearSearchVisuals();
                }}
                className={`flex-shrink-0 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono transition-all touch-manipulation ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Tools and Maze Generators */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 pt-1 sm:pt-2">
          {/* Drawing Tools */}
          <div className="flex flex-wrap items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/10">
            {[
              { id: 'wall', label: 'Wall', icon: Square },
              { id: 'weight', label: 'Weight', icon: ShieldAlert },
              { id: 'start', label: 'Start', icon: Navigation },
              { id: 'target', label: 'Target', icon: Flag },
              { id: 'eraser', label: 'Eraser', icon: Eraser },
            ].map(t => {
              const Icon = t.icon;
              const isActive = tool === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono transition-all touch-manipulation ${
                    isActive
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Maze Presets & Clear */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400">Mazes:</span>
            {[
              { id: 'recursive-division', label: 'Div' },
              { id: 'random', label: 'Random' },
              { id: 'stair', label: 'Stair' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => handleGenerateMaze(m.id)}
                className="px-2 sm:px-2.5 py-1 rounded-lg bg-zinc-900 text-[10px] sm:text-xs font-mono text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white transition-all touch-manipulation"
              >
                {m.label}
              </button>
            ))}

            <button
              onClick={clearAllWalls}
              className="p-1 sm:p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 transition-all touch-manipulation"
              title="Clear Walls & Board"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="glass-card rounded-2xl p-3 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
        {/* Description Banner */}
        <div className="min-h-[45px] bg-black/80 rounded-xl p-3 border border-white/15 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-medium">
              {currentStep?.description || 'Draw obstacles, place weights, or generate a maze, then click Find Shortest Path.'}
            </span>
          </div>
        </div>

        {/* Interactive Grid Canvas */}
        <GridCanvas
          grid={grid}
          visitedNodes={visitedNodes}
          shortestPath={shortestPath}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
          mode={tool}
        />

        {/* Stats Dashboard */}
        <StatsDashboard
          stats={stats}
          isRunning={isPlaying}
          isFinished={shortestPath.length > 0}
        />

        {/* Playback Controls */}
        <PlaybackControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onReset={clearSearchVisuals}
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

      {/* Theory Card */}
      <ComplexityCard algoKey={selectedAlgo} />
    </div>
  );
}
