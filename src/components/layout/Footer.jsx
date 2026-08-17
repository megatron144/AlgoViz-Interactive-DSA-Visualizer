import React from 'react';
import { Terminal, Shield, Zap, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/90 py-8 px-4 lg:px-8 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <p>
            AlgoViz - Interactive DSA Visualiser // Developed with <span className="text-white font-semibold">React, Tailwind CSS & JavaScript</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-zinc-500">
          <div className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
            <Zap className="w-3.5 h-3.5 text-white" />
            <span>High-Speed 60fps Animation</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Web Audio Synthesizer</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>CP Verified Logic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
