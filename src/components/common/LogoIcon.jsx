import React from 'react';

export default function LogoIcon({ className = "w-8 h-8", withBackground = true }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Black Circle */}
      {withBackground && (
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="#000000"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
        />
      )}

      {/* Network Edges (Thick White Lines) */}
      <line
        x1="100"
        y1="54"
        x2="56"
        y2="136"
        stroke="#FFFFFF"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="100"
        y1="54"
        x2="144"
        y2="136"
        stroke="#FFFFFF"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="56"
        y1="136"
        x2="144"
        y2="136"
        stroke="#FFFFFF"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Network Node Vertices (Solid White Circles) */}
      <circle cx="100" cy="54" r="18" fill="#FFFFFF" />
      <circle cx="56" cy="136" r="18" fill="#FFFFFF" />
      <circle cx="144" cy="136" r="18" fill="#FFFFFF" />
    </svg>
  );
}
