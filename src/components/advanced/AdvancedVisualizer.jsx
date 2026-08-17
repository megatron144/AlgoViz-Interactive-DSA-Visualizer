import React, { useState } from 'react';
import SegmentTreeVisualizer from './SegmentTreeVisualizer';
import BinaryLiftingVisualizer from './BinaryLiftingVisualizer';
import SparseTableVisualizer from './SparseTableVisualizer';
import HLDVisualizer from './HLDVisualizer';
import LinearBasisVisualizer from './LinearBasisVisualizer';
import { Cpu, GitBranch, Table, GitFork, Binary } from 'lucide-react';

export default function AdvancedVisualizer({ onActiveLineChange }) {
  const [subTab, setSubTab] = useState('segment-tree');

  const subTabs = [
    { id: 'segment-tree', label: 'Segment Tree', icon: Cpu },
    { id: 'binary-lifting', label: 'Binary Lifting (LCA)', icon: GitBranch },
    { id: 'sparse-table', label: 'Sparse Table (RMQ)', icon: Table },
    { id: 'hld', label: 'Heavy-Light Decomp.', icon: GitFork },
    { id: 'linear-basis', label: 'Linear Basis (XOR)', icon: Binary },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-Navigation for Advanced CP Algorithms */}
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

      {/* SubTab Views */}
      {subTab === 'segment-tree' && <SegmentTreeVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'binary-lifting' && <BinaryLiftingVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'sparse-table' && <SparseTableVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'hld' && <HLDVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'linear-basis' && <LinearBasisVisualizer onActiveLineChange={onActiveLineChange} />}
    </div>
  );
}
