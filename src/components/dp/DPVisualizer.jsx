import React, { useState } from 'react';
import NQueensVisualizer from './NQueensVisualizer';
import KnapsackVisualizer from './KnapsackVisualizer';
import LCSVisualizer from './LCSVisualizer';
import { Crown, Package, AlignLeft } from 'lucide-react';

export default function DPVisualizer({ onActiveLineChange }) {
  const [subTab, setSubTab] = useState('n-queens');

  const subTabs = [
    { id: 'n-queens', label: 'N-Queens Backtracking', icon: Crown },
    { id: 'knapsack', label: '0/1 Knapsack DP', icon: Package },
    { id: 'lcs', label: 'Longest Common Subseq (LCS)', icon: AlignLeft },
  ];

  return (
    <div className="space-y-6">
      {/* DP Sub-Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 scrollbar-none shadow-lg">
        {subTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                isActive
                  ? 'bg-white text-black font-bold shadow-md scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SubTab Components */}
      {subTab === 'n-queens' && <NQueensVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'knapsack' && <KnapsackVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'lcs' && <LCSVisualizer onActiveLineChange={onActiveLineChange} />}
    </div>
  );
}
