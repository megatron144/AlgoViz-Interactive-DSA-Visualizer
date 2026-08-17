import React, { useState } from 'react';
import ComplexityCard from '../common/ComplexityCard';
import { soundPlayer } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  GitMerge, 
  Search, 
  Shuffle, 
  RotateCcw, 
  Network, 
  CheckCircle, 
  AlertTriangle,
  Link,
  ShieldCheck
} from 'lucide-react';

const NODE_COUNT = 8; // Nodes 0..7

export default function DSUVisualizer() {
  const [parent, setParent] = useState(Array.from({ length: NODE_COUNT }, (_, i) => i));
  const [rank, setRank] = useState(Array.from({ length: NODE_COUNT }, () => 0));
  const [nodeU, setNodeU] = useState(0);
  const [nodeV, setNodeV] = useState(1);
  const [findNode, setFindNode] = useState(0);
  const [highlightNodes, setHighlightNodes] = useState([]);
  const [log, setLog] = useState('Disjoint Set Union (DSU) initialized with 8 singleton sets {0} through {7}.');
  const [animating, setAnimating] = useState(false);

  // Find root with Path Compression
  const findRoot = (pArr, i, path = []) => {
    let curr = i;
    while (curr !== pArr[curr]) {
      path.push(curr);
      curr = pArr[curr];
    }
    path.push(curr);
    return curr;
  };

  const handleFind = async () => {
    if (animating) return;
    setAnimating(true);
    const u = Number(findNode);
    let path = [];
    const root = findRoot(parent, u, path);

    setHighlightNodes(path);
    soundPlayer.playTone((root + 1) * 60, 0, 150);
    setLog(`🔍 Find(${u}): Traced path [${path.join(' ➔ ')}]. Root leader is ${root}. Applying Path Compression...`);

    await new Promise(r => setTimeout(r, 600));

    // Path compression
    const nextParent = [...parent];
    path.forEach(node => {
      nextParent[node] = root;
    });
    setParent(nextParent);

    setTimeout(() => {
      setHighlightNodes([root]);
      setAnimating(false);
      setLog(`✨ Path Compression complete! Parent pointers for path nodes [${path.join(', ')}] now point directly to root ${root}.`);
      setTimeout(() => setHighlightNodes([]), 1000);
    }, 400);
  };

  const handleUnion = async () => {
    if (animating) return;
    setAnimating(true);
    const u = Number(nodeU);
    const v = Number(nodeV);

    let pathU = [];
    let pathV = [];
    const rootU = findRoot(parent, u, pathU);
    const rootV = findRoot(parent, v, pathV);

    setHighlightNodes([...pathU, ...pathV]);
    soundPlayer.playTone((rootU + 1) * 50, 0, 100);

    if (rootU === rootV) {
      setLog(`⚠️ Nodes ${u} and ${v} already belong to the same component (Root: ${rootU}). Union creates a cycle!`);
      soundPlayer.playTone(120, 0, 200);
      setTimeout(() => {
        setHighlightNodes([]);
        setAnimating(false);
      }, 900);
      return;
    }

    setLog(`🔗 Union(${u}, ${v}): Merging component of root ${rootU} (rank ${rank[rootU]}) with component of root ${rootV} (rank ${rank[rootV]})...`);
    await new Promise(r => setTimeout(r, 600));

    const nextParent = [...parent];
    const nextRank = [...rank];

    // Union by rank
    if (rank[rootU] < rank[rootV]) {
      nextParent[rootU] = rootV;
      setLog(`✅ Attached tree ${rootU} under root ${rootV} (Union by Rank).`);
    } else if (rank[rootU] > rank[rootV]) {
      nextParent[rootV] = rootU;
      setLog(`✅ Attached tree ${rootV} under root ${rootU} (Union by Rank).`);
    } else {
      nextParent[rootV] = rootU;
      nextRank[rootU] += 1;
      setLog(`✅ Roots had equal rank (${rank[rootU]}). Attached ${rootV} under ${rootU} and incremented rank of ${rootU} to ${nextRank[rootU]}.`);
    }

    setParent(nextParent);
    setRank(nextRank);
    soundPlayer.playTone(450, 0, 150);

    setTimeout(() => {
      setHighlightNodes([rootU, rootV]);
      setAnimating(false);
      // Advance inputs
      setNodeU((u + 1) % NODE_COUNT);
      setNodeV((v + 2) % NODE_COUNT);
      setTimeout(() => setHighlightNodes([]), 800);
    }, 400);
  };

  const handleRandomUnion = async () => {
    if (animating) return;
    const u = Math.floor(Math.random() * NODE_COUNT);
    let v = Math.floor(Math.random() * NODE_COUNT);
    while (v === u) v = Math.floor(Math.random() * NODE_COUNT);
    setNodeU(u);
    setNodeV(v);
    handleUnion();
  };

  const handleReset = () => {
    setParent(Array.from({ length: NODE_COUNT }, (_, i) => i));
    setRank(Array.from({ length: NODE_COUNT }, () => 0));
    setHighlightNodes([]);
    setLog('Disjoint Set Union reset: all elements are distinct singletons.');
  };

  // Group elements into connected components
  const componentsMap = {};
  for (let i = 0; i < NODE_COUNT; i++) {
    const root = findRoot(parent, i);
    if (!componentsMap[root]) componentsMap[root] = [];
    componentsMap[root].push(i);
  }
  const componentCount = Object.keys(componentsMap).length;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest">Forest & Graph Structures</span>
            <h2 className="text-lg sm:text-xl font-display font-black text-white">
              Disjoint Set Union (DSU / Union-Find)
            </h2>
          </div>

          {/* Component Count Metric */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 text-[11px] sm:text-xs">
              Connected: <strong className="text-white">{componentCount}</strong> / {NODE_COUNT}
            </span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-emerald-400 font-semibold flex items-center gap-1 text-[11px] sm:text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>O(α(N))</span>
            </span>
          </div>
        </div>

        {/* Input & Operations */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          {/* Union Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900 p-1 sm:p-1.5 rounded-xl border border-white/10 flex-wrap sm:flex-nowrap">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 pl-1 sm:pl-2">Union:</span>
            <select
              value={nodeU}
              onChange={(e) => setNodeU(Number(e.target.value))}
              className="bg-black text-white text-xs font-mono px-1.5 sm:px-2 py-1 rounded-lg border border-white/15 cursor-pointer"
            >
              {Array.from({ length: NODE_COUNT }, (_, i) => (
                <option key={i} value={i}>Node {i}</option>
              ))}
            </select>
            <span className="text-xs font-mono text-zinc-500">&</span>
            <select
              value={nodeV}
              onChange={(e) => setNodeV(Number(e.target.value))}
              className="bg-black text-white text-xs font-mono px-1.5 sm:px-2 py-1 rounded-lg border border-white/15 cursor-pointer"
            >
              {Array.from({ length: NODE_COUNT }, (_, i) => (
                <option key={i} value={i}>Node {i}</option>
              ))}
            </select>
            <button
              onClick={handleUnion}
              disabled={animating}
              className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-lg bg-white text-black font-display font-bold text-xs hover:bg-zinc-200 transition-all disabled:opacity-40 shadow-sm touch-manipulation"
            >
              <GitMerge className="w-3.5 h-3.5" />
              <span>Union</span>
            </button>
          </div>

          {/* Find Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900 p-1 sm:p-1.5 rounded-xl border border-white/10">
            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 pl-1 sm:pl-2">Find:</span>
            <select
              value={findNode}
              onChange={(e) => setFindNode(Number(e.target.value))}
              className="bg-black text-white text-xs font-mono px-1.5 sm:px-2 py-1 rounded-lg border border-white/15 cursor-pointer"
            >
              {Array.from({ length: NODE_COUNT }, (_, i) => (
                <option key={i} value={i}>Node {i}</option>
              ))}
            </select>
            <button
              onClick={handleFind}
              disabled={animating}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white text-xs font-mono border border-white/10 transition-all disabled:opacity-40 touch-manipulation"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Root</span>
            </button>
          </div>

          <button
            onClick={handleRandomUnion}
            disabled={animating}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 text-xs font-mono transition-all touch-manipulation"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random</span>
          </button>

          <button
            onClick={handleReset}
            disabled={animating}
            className="p-1.5 sm:p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-900/40 transition-all touch-manipulation"
            title="Reset DSU"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Log Bar */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 border border-white/5 font-mono text-[11px] sm:text-xs text-zinc-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
          <span className="leading-relaxed">{log}</span>
        </div>
      </div>

      {/* Visualizer Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Disjoint Sets Forest Canvas (Col 1-2) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-4 sm:p-6 border border-white/10 space-y-4 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2 text-white font-bold">
              <Network className="w-4 h-4" />
              <span>Connected Components</span>
            </span>
            <span className="hidden sm:inline">Path Compression & Rank</span>
          </div>

          {/* Forest Clusters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-2">
            {Object.entries(componentsMap).map(([rootKey, members]) => {
              const rootId = Number(rootKey);
              const isRootHighlighted = highlightNodes.includes(rootId);

              return (
                <div
                  key={rootKey}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isRootHighlighted
                      ? 'bg-zinc-800/90 border-white shadow-xl shadow-white/10'
                      : 'bg-zinc-950/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-zinc-400">Root Leader:</span>
                      <strong className="text-white text-sm">Node {rootId}</strong>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-lg border border-white/10">
                      Rank: {rank[rootId]}
                    </span>
                  </div>

                  {/* Nodes in this set */}
                  <div className="flex flex-wrap gap-2">
                    {members.map((nodeId) => {
                      const isHighlighted = highlightNodes.includes(nodeId);
                      const isLeader = nodeId === rootId;

                      return (
                        <div
                          key={nodeId}
                          className={`px-3 py-2 rounded-xl font-mono text-xs flex items-center gap-1.5 border transition-all ${
                            isHighlighted
                              ? 'bg-white text-black font-bold scale-105 shadow-md z-10'
                              : isLeader
                              ? 'bg-zinc-800 text-emerald-300 border-emerald-500/50 font-bold'
                              : 'bg-zinc-900 text-zinc-300 border-white/10'
                          }`}
                        >
                          <span>Node {nodeId}</span>
                          <span className="text-[9px] text-zinc-500 font-mono">
                            ➔ {parent[nodeId]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs font-mono text-zinc-500 text-center">
            <code>parent[i]</code> points to parent node in tree. Root nodes satisfy <code>parent[root] == root</code>.
          </div>
        </div>

        {/* Arrays Memory Inspection (Col 3) */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
              DSU State Arrays
            </div>

            {/* Parent Array Table */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Parent Array:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {parent.map((p, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border text-center font-mono text-xs transition-all ${
                      highlightNodes.includes(idx)
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-zinc-900 text-zinc-200 border-white/10'
                    }`}
                  >
                    <div className="text-[9px] text-zinc-500">[{idx}]</div>
                    <div className="font-bold">{p}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rank Array Table */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Rank Array:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {rank.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-zinc-950 border border-white/5 text-center font-mono text-xs text-zinc-400"
                  >
                    <div className="text-[9px] text-zinc-600">[{idx}]</div>
                    <div>{r}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Invariants */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/5 font-mono text-xs space-y-1 text-zinc-400">
            <div className="text-[10px] uppercase font-bold text-white">Complexity Invariant:</div>
            <div>Find / Union: <code className="text-emerald-300">O(α(N)) ≈ O(1)</code></div>
            <div>α(N) is the Inverse Ackermann function.</div>
          </div>
        </div>
      </div>

      {/* Complexity & Practice Problems Card */}
      <ComplexityCard algoKey="dsu" />
    </div>
  );
}
