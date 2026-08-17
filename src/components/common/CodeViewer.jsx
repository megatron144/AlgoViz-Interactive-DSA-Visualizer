import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../../utils/codeSnippets';
import { Copy, Check, Code2, Terminal, X } from 'lucide-react';

export default function CodeViewer({ algoKey, activeLine = 1, onClose }) {
  const [lang, setLang] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const snippetObj = CODE_SNIPPETS[algoKey] || {
    javascript: '// Algorithm implementation placeholder',
    python: '# Algorithm implementation placeholder',
    cpp: '// Algorithm implementation placeholder'
  };

  const codeText = snippetObj[lang] || snippetObj.javascript || '';
  const lines = codeText.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full shadow-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/95 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-white" />
          <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
            Synchronized Inspector
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-black/80 p-1 rounded-xl border border-white/10">
            {['javascript', 'python', 'cpp'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  lang === l
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {l === 'cpp' ? 'C++' : l === 'javascript' ? 'JS' : 'Py'}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Copy Code"
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Close button if modal/drawer */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Code Text Area with Line Highlighting */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs leading-5 bg-black/90 select-text max-h-[500px]">
        {lines.map((lineContent, idx) => {
          const lineNum = idx + 1;
          const isActive = lineNum === activeLine;
          return (
            <div
              key={lineNum}
              className={`flex items-center gap-3 py-0.5 px-2 rounded font-mono transition-colors duration-150 ${
                isActive
                  ? 'bg-white/15 text-white font-bold border-l-2 border-white'
                  : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
              }`}
            >
              <span className={`w-6 text-right select-none text-[10px] ${
                isActive ? 'text-white font-bold' : 'text-zinc-600'
              }`}>
                {lineNum}
              </span>
              <span className="flex-1 font-mono whitespace-pre">
                {lineContent || ' '}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
