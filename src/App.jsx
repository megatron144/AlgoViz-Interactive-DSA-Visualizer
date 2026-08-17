import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DataStructuresVisualizer from './components/datastructures/DataStructuresVisualizer';
import AdvancedVisualizer from './components/advanced/AdvancedVisualizer';
import SortingVisualizer from './components/sorting/SortingVisualizer';
import PathfindingVisualizer from './components/pathfinding/PathfindingVisualizer';
import TreeVisualizer from './components/tree/TreeVisualizer';
import DPVisualizer from './components/dp/DPVisualizer';
import SearchVisualizer from './components/search/SearchVisualizer';
import CodeViewer from './components/common/CodeViewer';
import { Code2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('datastructures');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCodeDrawer, setShowCodeDrawer] = useState(false);
  const [activeLine, setActiveLine] = useState(1);

  // Map active category to default algorithm key for code inspector
  const getAlgoKeyForTab = () => {
    switch (activeTab) {
      case 'datastructures': return 'stack';
      case 'advanced': return 'segment-tree';
      case 'sorting': return 'quick-sort';
      case 'pathfinding': return 'astar';
      case 'tree': return 'avl';
      case 'dp': return 'n-queens';
      case 'search': return 'binary-search';
      default: return 'stack';
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
        onOpenCode={() => setShowCodeDrawer(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-4 sm:space-y-6">
        {/* Active Visualizer Tab Content */}
        <div className="w-full">
          {activeTab === 'datastructures' && (
            <DataStructuresVisualizer />
          )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-wave-grow">
          <div className="w-full max-w-3xl h-[88vh] sm:h-[550px] max-h-[90vh] shadow-2xl relative">
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
