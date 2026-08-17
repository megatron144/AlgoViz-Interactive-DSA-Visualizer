import React, { useState } from 'react';
import ComplexityCard from '../common/ComplexityCard';
import { soundPlayer } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ArrowUpCircle, 
  Plus, 
  Trash2, 
  Shuffle, 
  Layers, 
  Flame, 
  Eye,
  Sliders
} from 'lucide-react';

const INITIAL_TASKS = [
  { id: 1, name: 'Render UI Frame', priority: 95, color: 'border-rose-500/50' },
  { id: 2, name: 'Process Sensor Data', priority: 80, color: 'border-amber-500/50' },
  { id: 3, name: 'Sync Cloud State', priority: 60, color: 'border-blue-500/50' },
  { id: 4, name: 'Background Cleanup', priority: 25, color: 'border-emerald-500/50' },
];

export default function PriorityQueueVisualizer() {
  const [pq, setPq] = useState(INITIAL_TASKS);
  const [orderMode, setOrderMode] = useState('max'); // 'max' (highest priority first) | 'min' (lowest priority first)
  const [taskName, setTaskName] = useState('Network Ping');
  const [priorityVal, setPriorityVal] = useState(70);
  const [highlightId, setHighlightId] = useState(null);
  const [log, setLog] = useState('Priority Queue initialized. Items sorted dynamically by Priority Weight.');

  const sortItems = (items, mode) => {
    return [...items].sort((a, b) => mode === 'max' ? b.priority - a.priority : a.priority - b.priority);
  };

  const handleEnqueue = () => {
    if (!taskName.trim()) return;
    const p = Number(priorityVal);
    if (isNaN(p)) return;

    if (pq.length >= 8) {
      setLog('⚠️ Priority Queue is full (Max 8 tasks).');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      priority: p,
      color: p >= 80 ? 'border-rose-500/50' : p >= 50 ? 'border-amber-500/50' : 'border-blue-500/50'
    };

    soundPlayer.playTone(p * 5, 0, 100);
    const nextList = sortItems([...pq, newTask], orderMode);
    setPq(nextList);
    setHighlightId(newTask.id);
    setLog(`📥 Enqueued task "${newTask.name}" with priority ${p}. Placed at index ${nextList.findIndex(t => t.id === newTask.id)}.`);

    setTimeout(() => {
      setHighlightId(null);
      setTaskName('Task ' + (Math.floor(Math.random() * 800) + 100));
      setPriorityVal(Math.floor(Math.random() * 95) + 5);
    }, 600);
  };

  const handleDequeue = () => {
    if (pq.length === 0) return;
    const topTask = pq[0];
    setHighlightId(topTask.id);
    soundPlayer.playTone(topTask.priority * 5, 0, 120);
    setLog(`📤 Serving highest priority task "${topTask.name}" (Priority: ${topTask.priority})...`);

    setTimeout(() => {
      setPq(prev => prev.slice(1));
      setHighlightId(null);
      setLog(`✅ Task "${topTask.name}" executed. Next task in queue is "${pq.length > 1 ? pq[1].name : 'None'}".`);
      confetti({ particleCount: 20, spread: 50, origin: { y: 0.8 } });
    }, 500);
  };

  const handleRandomFill = () => {
    const defaultNames = ['GPU Dispatch', 'Kernel Lock', 'Audio Buffer', 'Garbage Collect', 'HTTP Request', 'Disk IO'];
    const randomTasks = Array.from({ length: 5 }, (_, i) => {
      const p = Math.floor(Math.random() * 90) + 10;
      return {
        id: Date.now() + i,
        name: defaultNames[i % defaultNames.length],
        priority: p,
        color: p >= 80 ? 'border-rose-500/50' : p >= 50 ? 'border-amber-500/50' : 'border-blue-500/50'
      };
    });
    setPq(sortItems(randomTasks, orderMode));
    setHighlightId(null);
    setLog('🎲 Populated Priority Queue with 5 random scheduled tasks.');
  };

  const handleSwitchMode = (mode) => {
    setOrderMode(mode);
    setPq(sortItems(pq, mode));
    setLog(`Switched priority order to ${mode === 'max' ? 'Max-Priority (Highest First)' : 'Min-Priority (Lowest First)'}.`);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest">Scheduling Data Structures</span>
            <h2 className="text-lg sm:text-xl font-display font-black text-white">Priority Queue (Scheduler Engine)</h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => handleSwitchMode('max')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-bold transition-all touch-manipulation ${
                orderMode === 'max' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Max Priority
            </button>
            <button
              onClick={() => handleSwitchMode('min')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-mono font-bold transition-all touch-manipulation ${
                orderMode === 'min' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Min Priority
            </button>
          </div>
        </div>

        {/* Input & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900 p-1 sm:p-1.5 rounded-xl border border-white/10 flex-wrap sm:flex-nowrap">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 pl-1 sm:pl-2">Task:</span>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-24 sm:w-28 bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-white"
            />
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 pl-1">Priority:</span>
            <input
              type="number"
              value={priorityVal}
              onChange={(e) => setPriorityVal(e.target.value)}
              className="w-12 sm:w-14 bg-black border border-white/15 rounded-lg px-1.5 py-1 text-xs font-mono text-white text-center focus:outline-none focus:border-white"
            />
            <button
              onClick={handleEnqueue}
              disabled={pq.length >= 8}
              className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all disabled:opacity-40 touch-manipulation"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enqueue</span>
            </button>
          </div>

          <button
            onClick={handleDequeue}
            disabled={pq.length === 0}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-zinc-900 text-zinc-200 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono font-medium transition-all disabled:opacity-40 touch-manipulation"
          >
            <ArrowUpCircle className="w-4 h-4 text-emerald-400" />
            <span>Serve Next (Top)</span>
          </button>

          <button
            onClick={handleRandomFill}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono transition-all touch-manipulation"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random Fill</span>
          </button>

          <button
            onClick={() => { setPq([]); setLog('Priority Queue cleared.'); }}
            disabled={pq.length === 0}
            className="p-1.5 sm:p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-900/40 transition-all disabled:opacity-40 touch-manipulation"
            title="Clear Queue"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Log Bar */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 border border-white/5 font-mono text-[11px] sm:text-xs text-zinc-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
          <span className="leading-relaxed">{log}</span>
        </div>
      </div>

      {/* Visualizer Queue Canvas */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border border-white/10 space-y-4 min-h-[300px] sm:min-h-[340px] flex flex-col justify-center">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-zinc-400">
          <span className="text-emerald-400 font-bold uppercase tracking-wider">▲ NEXT TO SERVE (Index 0)</span>
          <span className="text-zinc-500">LOWEST PRIORITY ▼</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {pq.length === 0 ? (
            <div className="col-span-full text-center text-zinc-600 font-mono text-xs py-12">
              Priority Queue is empty. Enqueue tasks with custom priority weights.
            </div>
          ) : (
            pq.map((task, idx) => {
              const isHead = idx === 0;
              const isHighlight = highlightId === task.id;

              return (
                <div
                  key={task.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-24 sm:h-28 relative ${
                    isHighlight
                      ? 'bg-white text-black border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.7)] z-10'
                      : isHead
                      ? 'bg-zinc-800 text-white border-2 border-emerald-500/80 shadow-lg'
                      : `bg-zinc-900 text-zinc-300 ${task.color} border hover:border-white/30`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">
                      Rank #{idx + 1}
                    </span>
                    <span className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full font-extrabold ${
                      task.priority >= 80 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      task.priority >= 50 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    }`}>
                      Priority: {task.priority}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-display font-bold truncate">{task.name}</h4>
                  </div>

                  {isHead && (
                    <span className="absolute -top-2.5 right-4 text-[7px] sm:text-[8px] uppercase tracking-wider px-2 py-0.5 bg-emerald-500 text-black font-extrabold rounded-md shadow-sm">
                      TOP PRIORITY
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Complexity & Practice Problems Card */}
      <ComplexityCard algoKey="priority-queue" />
    </div>
  );
}
