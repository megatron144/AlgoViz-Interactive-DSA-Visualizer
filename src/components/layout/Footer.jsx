import React from 'react';
import { Terminal, Shield, Zap, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/90 py-6 sm:py-8 px-3 sm:px-6 lg:px-8 mt-8 sm:mt-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2.5 sm:gap-3.5 text-xs font-mono text-center">
        {/* Line 1: Brand & Subtitle */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" />
          <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
            AlgoViz – Interactive DSA Visualiser
          </p>
        </div>

        {/* Line 2: Tech Stack (Directly below) */}
        <p className="text-[11px] sm:text-xs text-zinc-400">
          Developed with <span className="text-zinc-200 font-semibold">React, Tailwind CSS & JavaScript</span>
        </p>

        {/* Line 3: Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-zinc-400 text-[11px] sm:text-xs pt-1 sm:pt-2">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Zap className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <span>High-Speed 60fps</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <span>Web Audio Synthesizer</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Shield className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <span>CP Verified Logic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
