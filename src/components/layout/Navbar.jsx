import React from 'react';
import { 
  Code2, 
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

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  soundEnabled, 
  setSoundEnabled,
  onOpenCodeDrawer,
  showCodeDrawer
}) {
  const tabs = [
    { id: 'advanced', label: 'Advanced CP', icon: Cpu, badge: 'PRO' },
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/85 border-b border-white/10 px-4 lg:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-display font-extrabold text-lg shadow-[0_0_20px_rgba(255,255,255,0.35)] tracking-tighter">
            AV
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg tracking-tight text-white">
              Algo<span className="text-zinc-400">Viz</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-2xl border border-white/10 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black shadow-lg shadow-white/10 font-bold scale-[1.02]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold ${
                    isActive ? 'bg-black text-white' : 'bg-white/20 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? 'Mute Audio Synthesizer' : 'Enable Audio Synthesizer'}
            className={`p-2.5 rounded-xl border transition-all duration-200 ${
              soundEnabled
                ? 'bg-zinc-900/90 text-zinc-200 border-white/20 hover:border-white/40 hover:text-white'
                : 'bg-zinc-900/40 text-zinc-500 border-zinc-800 hover:text-zinc-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Toggle Synchronized Code Panel - Subtle & Clean */}
          <button
            onClick={onOpenCodeDrawer}
            title="Inspect Code"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-medium border whitespace-nowrap transition-all duration-200 ${
              showCodeDrawer
                ? 'bg-zinc-800 text-white border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.08)]'
                : 'bg-zinc-900/80 text-zinc-400 border-white/10 hover:border-white/25 hover:text-zinc-200 hover:bg-zinc-800/80'
            }`}
          >
            <Code2 className="w-4 h-4 text-zinc-300" />
            <span className="hidden sm:inline">Code</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Scrollbar */}
      <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none border-t border-white/5 mt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                isActive
                  ? 'bg-white text-black font-bold'
                  : 'bg-zinc-900 text-zinc-400 border border-white/5'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
