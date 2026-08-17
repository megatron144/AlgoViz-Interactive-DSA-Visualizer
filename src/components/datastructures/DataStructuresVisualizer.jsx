import React, { useState } from 'react';
import StackVisualizer from './StackVisualizer';
import QueueVisualizer from './QueueVisualizer';
import HeapVisualizer from './HeapVisualizer';
import { Layers, Database, GitFork, ArrowDownUp } from 'lucide-react';

export default function DataStructuresVisualizer() {
  const [subTab, setSubTab] = useState('stack');

  const subTabs = [
    { id: 'stack', label: 'Stack (LIFO)', icon: Layers },
    { id: 'queue', label: 'Queue (FIFO)', icon: ArrowDownUp },
    { id: 'heap', label: 'Binary Heaps (Max/Min)', icon: GitFork },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-Navigation */}
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
      {subTab === 'stack' && <StackVisualizer />}
      {subTab === 'queue' && <QueueVisualizer />}
      {subTab === 'heap' && <HeapVisualizer />}
    </div>
  );
}
