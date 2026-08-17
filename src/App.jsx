import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdvancedVisualizer from './components/advanced/AdvancedVisualizer';
import SortingVisualizer from './components/sorting/SortingVisualizer';
import PathfindingVisualizer from './components/pathfinding/PathfindingVisualizer';
import TreeVisualizer from './components/tree/TreeVisualizer';
import DPVisualizer from './components/dp/DPVisualizer';
import SearchVisualizer from './components/search/SearchVisualizer';
import CodeViewer from './components/common/CodeViewer';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Compass, 
  GitBranch, 
  Grid, 
  Search, 
  Code2, 
  BookOpen, 
  Zap, 
  X 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('advanced');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCodeDrawer, setShowCodeDrawer] = useState(false);
  const [activeLine, setActiveLine] = useState(1);

  // Map active category to default algorithm key for code inspector
  const getAlgoKeyForTab = () => {
    switch (activeTab) {
      case 'advanced': return 'segment-tree';
      case 'sorting': return 'quick-sort';
      case 'pathfinding': return 'astar';
      case 'tree': return 'avl';
      case 'dp': return 'n-queens';
      case 'search': return 'binary-search';
      default: return 'quick-sort';
    }
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col justify-between bg-grid-pattern transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenCodeDrawer={() => setShowCodeDrawer(!showCodeDrawer)}
        showCodeDrawer={showCodeDrawer}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sole Heading: AlgoViz */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Algo<span className="text-zinc-400">Viz</span>
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-1.5 flex flex-wrap items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Interactive DSA Visualiser</span>
              <span className="text-zinc-600">—</span>
              <span className="text-zinc-300">
                {activeTab === 'advanced' && 'Advanced Data Structures & CP Trees'}
                {activeTab === 'sorting' && 'High-Performance Sorting Algorithms'}
                {activeTab === 'pathfinding' && 'Graph & Grid Pathfinding Engines'}
                {activeTab === 'tree' && 'Self-Balancing BST & Tree Traversal'}
                {activeTab === 'dp' && 'Dynamic Programming & Backtracking'}
                {activeTab === 'search' && 'Searching Algorithms & Pointer Mechanics'}
              </span>
            </p>
          </div>

          {/* Quick Code Drawer Toggle Button */}
          <button
            onClick={() => setShowCodeDrawer(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 text-xs font-mono text-zinc-300 border border-white/10 hover:border-white/25 hover:text-white transition-all shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Open Code Panel</span>
          </button>
        </div>

        {/* Active Visualizer Tab Content */}
        <div className="w-full">
          {activeTab === 'advanced' && (
            <AdvancedVisualizer onActiveLineChange={setActiveLine} />
          )}
          {activeTab === 'sorting' && (
            <SortingVisualizer onActiveLineChange={setActiveLine} />
          )}
          {activeTab === 'pathfinding' && (
            <PathfindingVisualizer onActiveLineChange={setActiveLine} />
          )}
          {activeTab === 'tree' && (
            <TreeVisualizer onActiveLineChange={setActiveLine} />
          )}
          {activeTab === 'dp' && (
            <DPVisualizer onActiveLineChange={setActiveLine} />
          )}
          {activeTab === 'search' && (
            <SearchVisualizer onActiveLineChange={setActiveLine} />
          )}
        </div>
      </main>

      {/* Floating / Slide-Over Synchronized Code Inspector Modal */}
      {showCodeDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-wave-grow">
          <div className="w-full max-w-3xl max-h-[85vh] h-[550px] shadow-2xl relative">
            <CodeViewer
              algoKey={getAlgoKeyForTab()}
              activeLine={activeLine}
              onClose={() => setShowCodeDrawer(false)}
            />
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
