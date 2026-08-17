import React from 'react';
import { 
  Database,
  Layers, 
  Volume2, 
  VolumeX, 
  Compass, 
  GitBranch, 
  Cpu, 
  Search, 
  Grid
} from 'lucide-react';
import { soundPlayer } from '../../utils/audio';
import LogoIcon from '../common/LogoIcon';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  soundEnabled, 
  setSoundEnabled
}) {
  const tabs = [
    { id: 'datastructures', label: 'Data Structures', icon: Database },
    { id: 'advanced', label: 'Advanced CP', icon: Cpu },
    { id: 'sorting', label: 'Sorting & Duel', icon: Layers },
    { id: 'pathfinding', label: 'Pathfinding & Mazes', icon: Compass },
    { id: 'tree', label: 'Trees & AVL', icon: GitBranch },
    { id: 'dp', label: 'Dynamic Prog.', icon: Grid },
    { id: 'search', label: 'Searching', icon: Search },
  ];

  const handleSoundToggle = () => {
    const newState = soundPlayer.toggleSound();
    setSoundEnabled(newState);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/85 border-b border-white/10 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 transition-colors duration-200 overflow-visible">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 overflow-visible">
        {/* Brand Logo with macOS Dock Spring Effect */}
        <div 
          onClick={() => setActiveTab('datastructures')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none dock-nav-item touch-manipulation"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 bg-white/25 rounded-full blur-md group-hover:bg-white/60 transition duration-300"></div>
            <LogoIcon className="relative w-7 h-7 sm:w-9 sm:h-9" />
          </div>
          <span className="font-display font-black text-base sm:text-lg tracking-tight text-white group-hover:text-white transition-colors">
            Algo<span className="text-zinc-400">Viz</span>
          </span>
        </div>

        {/* Tab Navigation with macOS Dock Spring Magnification & Dynamic Expanding Pills for Desktop */}
        <nav className="hidden lg:flex dock-track-bar shadow-2xl backdrop-blur-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`dock-pill ${isActive ? 'active' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-black' : 'text-zinc-400 group-hover:text-white'}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 overflow-visible">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? 'Mute Audio Synthesizer' : 'Enable Audio Synthesizer'}
            className={`dock-nav-item p-2 sm:p-2.5 rounded-xl border select-none touch-manipulation ${
              soundEnabled
                ? 'bg-zinc-900/90 text-zinc-100 border-white/20 hover:border-white/40 hover:text-white shadow-sm'
                : 'bg-zinc-900/40 text-zinc-500 border-zinc-800 hover:text-zinc-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Dock Scrollbar with Touch Momentum */}
      <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pt-2.5 pb-1 px-0.5 scrollbar-none border-t border-white/5 mt-2 overflow-y-visible touch-scroll">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all touch-manipulation ${
                isActive
                  ? 'bg-white text-black border border-white font-bold shadow-md shadow-white/20 scale-[1.02]'
                  : 'bg-zinc-900/90 text-zinc-400 border border-white/10 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
