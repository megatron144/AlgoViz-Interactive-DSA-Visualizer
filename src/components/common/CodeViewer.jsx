import React, { useState, useEffect } from 'react';
import { CODE_SNIPPETS } from '../../utils/codeSnippets';
import { Copy, Check, Code2, Terminal, X, ChevronDown } from 'lucide-react';

const ALGORITHM_GROUPS = [
  {
    category: 'Fundamental Data Structures',
    items: [
      { id: 'stack', label: 'Stack (LIFO)' },
      { id: 'queue', label: 'Queue (FIFO)' },
      { id: 'deque', label: 'Deque (Double-Ended)' },
      { id: 'priority-queue', label: 'Priority Queue' },
      { id: 'max-heap', label: 'Binary Max-Heap' },
      { id: 'min-heap', label: 'Binary Min-Heap' },
      { id: 'dsu', label: 'Disjoint Set Union (DSU)' },
    ]
  },
  {
    category: 'Sorting Algorithms',
    items: [
      { id: 'quick-sort', label: 'Quick Sort' },
      { id: 'merge-sort', label: 'Merge Sort' },
      { id: 'heap-sort', label: 'Heap Sort' },
      { id: 'radix-sort', label: 'Radix Sort (LSD)' },
      { id: 'bubble-sort', label: 'Bubble Sort' },
      { id: 'selection-sort', label: 'Selection Sort' },
      { id: 'insertion-sort', label: 'Insertion Sort' },
      { id: 'shell-sort', label: 'Shell Sort' },
      { id: 'counting-sort', label: 'Counting Sort' },
    ]
  },
  {
    category: 'Advanced CP Structures',
    items: [
      { id: 'segment-tree', label: 'Segment Tree' },
      { id: 'binary-lifting', label: 'Binary Lifting (LCA)' },
      { id: 'sparse-table', label: 'Sparse Table (RMQ)' },
      { id: 'hld', label: 'Heavy-Light Decomposition' },
      { id: 'linear-basis', label: 'Linear Basis (XOR)' },
    ]
  },
  {
    category: 'Pathfinding & Graphs',
    items: [
      { id: 'astar', label: 'A* Search' },
      { id: 'dijkstra', label: "Dijkstra's Algorithm" },
      { id: 'bfs', label: 'Breadth-First Search (BFS)' },
      { id: 'dfs', label: 'Depth-First Search (DFS)' },
      { id: 'greedy-bfs', label: 'Greedy Best-First Search' },
    ]
  },
  {
    category: 'Trees & Balanced BST',
    items: [
      { id: 'avl', label: 'AVL Tree (Self-Balancing)' },
      { id: 'bst', label: 'Binary Search Tree (BST)' },
      { id: 'tree-traversal', label: 'Tree Traversals (In/Pre/Post)' },
    ]
  },
  {
    category: 'Dynamic Programming',
    items: [
      { id: 'n-queens', label: 'N-Queens Backtracking' },
      { id: 'knapsack', label: '0/1 Knapsack Problem' },
      { id: 'lcs', label: 'Longest Common Subsequence' },
    ]
  },
  {
    category: 'Searching Algorithms',
    items: [
      { id: 'binary-search', label: 'Binary Search' },
      { id: 'linear-search', label: 'Linear Search' },
    ]
  }
];

export default function CodeViewer({ algoKey, onClose }) {
  const [selectedAlgo, setSelectedAlgo] = useState(algoKey || 'quick-sort');
  const [lang, setLang] = useState('java');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (algoKey && CODE_SNIPPETS[algoKey]) {
      setSelectedAlgo(algoKey);
    }
  }, [algoKey]);

  const snippetObj = CODE_SNIPPETS[selectedAlgo] || {
    java: '// Java implementation for ' + selectedAlgo,
    cpp: '// C++ implementation for ' + selectedAlgo,
    python: '# Python implementation for ' + selectedAlgo
  };

  const codeText = snippetObj[lang] || snippetObj.java || '';
  const lines = codeText.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languages = [
    { id: 'java', label: 'Java' },
    { id: 'cpp', label: 'C++' },
    { id: 'python', label: 'Python' },
  ];

  return (
    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-900/95 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-white" />
            <span className="text-xs font-mono font-bold text-white tracking-wider uppercase hidden sm:inline">
              Code Inspector
            </span>
          </div>

          {/* Algorithm Selector Dropdown */}
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            className="bg-black text-white text-xs font-mono px-3 py-1.5 rounded-xl border border-white/20 focus:outline-none focus:border-white transition-all cursor-pointer"
          >
            {ALGORITHM_GROUPS.map((grp) => (
              <optgroup key={grp.category} label={grp.category} className="bg-zinc-900 text-zinc-400">
                {grp.items.map((item) => (
                  <option key={item.id} value={item.id} className="text-white bg-black">
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-black/80 p-1 rounded-xl border border-white/10">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  lang === l.id
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Copy Code"
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Close button if modal/drawer */}
          {onClose && (
            <button
              onClick={onClose}
              title="Close Panel"
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Code Text Area without distracting line highlights */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs leading-5 bg-black/90 select-text max-h-[500px]">
        {lines.map((lineContent, idx) => {
          const lineNum = idx + 1;
          return (
            <div
              key={lineNum}
              className="flex items-center gap-3 py-0.5 px-2 rounded font-mono text-zinc-300 hover:bg-white/5 transition-colors duration-150"
            >
              <span className="w-6 text-right select-none text-[10px] text-zinc-600 font-mono">
                {lineNum}
              </span>
              <span className="flex-1 font-mono whitespace-pre">
                {lineContent || ' '}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
