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
      {/* DP Sub-Navigation Track Bar with Bigger Height & Dynamic Expanding Pills */}
      <div className="dock-track-bar scrollbar-none shadow-2xl touch-scroll">
        {subTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`dock-pill ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
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
