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
      {/* Sub-Navigation for Advanced CP Algorithms with Bigger Height & Dynamic Expanding Pills */}
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

      {/* SubTab Views */}
      {subTab === 'segment-tree' && <SegmentTreeVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'binary-lifting' && <BinaryLiftingVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'sparse-table' && <SparseTableVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'hld' && <HLDVisualizer onActiveLineChange={onActiveLineChange} />}
      {subTab === 'linear-basis' && <LinearBasisVisualizer onActiveLineChange={onActiveLineChange} />}
    </div>
  );
}
