import React, { useState } from 'react';
import StackVisualizer from './StackVisualizer';
import QueueVisualizer from './QueueVisualizer';
import DequeVisualizer from './DequeVisualizer';
import PriorityQueueVisualizer from './PriorityQueueVisualizer';
import HeapVisualizer from './HeapVisualizer';
import DSUVisualizer from './DSUVisualizer';
import { 
  Layers, 
  ArrowDownUp, 
  ArrowLeftRight, 
  Flame, 
  GitFork, 
  Network 
} from 'lucide-react';

export default function DataStructuresVisualizer() {
  const [subTab, setSubTab] = useState('stack');

  const subTabs = [
    { id: 'stack', label: 'Stack (LIFO)', icon: Layers },
    { id: 'queue', label: 'Queue (FIFO)', icon: ArrowDownUp },
    { id: 'deque', label: 'Deque (Double-Ended)', icon: ArrowLeftRight },
    { id: 'priority-queue', label: 'Priority Queue', icon: Flame },
    { id: 'heap', label: 'Binary Heaps (Max/Min)', icon: GitFork },
    { id: 'dsu', label: 'Disjoint Set Union (DSU)', icon: Network },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Track Bar with Bigger Height & Dynamic Expanding Pills */}
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
      {subTab === 'stack' && <StackVisualizer />}
      {subTab === 'queue' && <QueueVisualizer />}
      {subTab === 'deque' && <DequeVisualizer />}
      {subTab === 'priority-queue' && <PriorityQueueVisualizer />}
      {subTab === 'heap' && <HeapVisualizer />}
      {subTab === 'dsu' && <DSUVisualizer />}
    </div>
  );
}
