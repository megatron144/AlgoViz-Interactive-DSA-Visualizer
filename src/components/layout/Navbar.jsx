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
  Grid,
  Code2
} from 'lucide-react';
import { soundPlayer } from '../../utils/audio';
import LogoIcon from '../common/LogoIcon';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  soundEnabled, 
  setSoundEnabled,
  onOpenCode
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
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/90 border-b border-white/10 px-3 sm:px-6 lg:px-8 pt-3.5 pb-3 sm:pt-6 sm:pb-4 transition-colors duration-200 space-y-4 sm:space-y-5">
      {/* 1. Dedicated Grand Top Section: Logo & AlgoViz as topmost, spacious tagline just below */}
      <div className="max-w-7xl mx-auto relative flex items-center justify-center min-h-[64px] sm:min-h-[80px] px-1 sm:px-2">
        {/* Centered Brand Logo & Name stacked with spacious subtitle directly below */}
        <div 
          onClick={() => setActiveTab('datastructures')}
          className="flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer group select-none touch-manipulation text-center py-1"
        >
          {/* Topmost Element: Logo & AlgoViz */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg group-hover:bg-white/50 transition duration-300"></div>
              <LogoIcon className="relative w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14" />
            </div>
            <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white group-hover:text-white transition-colors leading-none">
              Algo<span className="text-zinc-400">Viz</span>
            </span>
          </div>

          {/* Just below it: Interactive DSA Visualiser (Bigger, Bolder, with generous tracking) */}
          <p className="text-xs sm:text-base font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] sm:tracking-[0.28em] leading-none mt-1 sm:mt-1.5">
            Interactive DSA Visualiser
          </p>
        </div>

        {/* Quick Action Buttons (Right-Pinned) */}
        <div className="absolute right-0 flex items-center gap-2 sm:gap-2.5">
          {/* Quick Code Drawer Toggle Button */}
          {onOpenCode && (
            <button
              onClick={onOpenCode}
              title="Open Interactive Code Inspector"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-900/90 text-xs sm:text-sm font-mono text-zinc-200 border border-white/10 hover:border-white/30 hover:text-white shadow-sm select-none touch-manipulation transition-all"
            >
              <Code2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white flex-shrink-0" />
              <span className="hidden md:inline font-medium">Code Panel</span>
            </button>
          )}

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? 'Mute Audio Synthesizer' : 'Enable Audio Synthesizer'}
            className={`p-2 sm:p-2.5 rounded-xl border select-none touch-manipulation transition-all ${
              soundEnabled
                ? 'bg-zinc-900 text-zinc-100 border-white/20 hover:border-white/40 hover:text-white shadow-sm'
                : 'bg-zinc-900/40 text-zinc-500 border-zinc-800 hover:text-zinc-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" /> : <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-zinc-400" />}
          </button>
        </div>
      </div>

      {/* 2. Dedicated Navigation Dock Section with Generous Space Above */}
      <div className="max-w-7xl mx-auto flex items-center justify-start lg:justify-center overflow-x-auto scrollbar-none touch-scroll pt-1 sm:pt-2">
        <nav className="dock-track-bar shadow-2xl backdrop-blur-xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`dock-pill ${isActive ? 'active' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors flex-shrink-0 ${isActive ? 'text-black' : 'text-zinc-400 group-hover:text-white'}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
