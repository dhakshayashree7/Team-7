import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'light';
  className?: string;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', height = 48 }) => {
  if (variant === 'compact') {
    // Top-left header logo of Image 2 (Orange rounded square icon + "BuildTrack")
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Rounded square orange icon */}
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
          <svg viewBox="0 0 100 100" className="w-6 h-6 text-white" fill="currentColor">
            {/* Minimalist building silhouette inside */}
            <path d="M20 80V50h15v30h30V35h15v45h10V90H10V80h10z" />
            <rect x="25" y="55" width="5" height="5" />
            <rect x="25" y="65" width="5" height="5" />
            <rect x="45" y="40" width="6" height="6" />
            <rect x="45" y="52" width="6" height="6" />
            <rect x="45" y="64" width="6" height="6" />
            <rect x="70" y="40" width="5" height="5" />
            <rect x="70" y="50" width="5" height="5" />
            <rect x="70" y="60" width="5" height="5" />
            <path d="M40 30h10v5H40z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        {/* BuildTrack Text */}
        <span className="font-display text-2xl font-bold tracking-tight text-white flex items-center">
          Build<span className="text-orange-400">Track</span>
        </span>
      </div>
    );
  }

  if (variant === 'light') {
    // White version of full logo (for dark backgrounds)
    return (
      <div className={`flex items-center gap-4 ${className}`} style={{ height }}>
        {/* Exact same vector elements as the full logo, adapted for dark backgrounds */}
        <svg viewBox="0 0 160 120" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base foundation ground line */}
          <rect x="10" y="105" width="140" height="4" rx="2" fill="#FFFFFF" />
          
          {/* Tallest background building outline (slanted roof, white outlines) */}
          <path d="M94 32 L116 32 L116 105 L94 105 Z" fill="rgba(255, 255, 255, 0.08)" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M94 32 L116 18 L116 32 Z" fill="rgba(255, 255, 255, 0.2)" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          
          {/* Horizontal building slit lines on the tall background building */}
          <line x1="122" y1="50" x2="135" y2="50" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="122" y1="58" x2="135" y2="58" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="122" y1="66" x2="135" y2="66" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="122" y1="74" x2="135" y2="74" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="122" y1="82" x2="135" y2="82" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="122" y1="90" x2="135" y2="90" stroke="#FFFFFF" strokeWidth="2" />

          {/* Medium building in the middle with white window grids */}
          <rect x="58" y="50" width="30" height="55" fill="rgba(255, 255, 255, 0.15)" stroke="#FFFFFF" strokeWidth="2" />
          {/* Window grids on mid building */}
          <rect x="64" y="58" width="5" height="8" fill="#FFFFFF" rx="0.5" />
          <rect x="64" y="70" width="5" height="8" fill="#FFFFFF" rx="0.5" />
          <rect x="64" y="82" width="5" height="8" fill="#FFFFFF" rx="0.5" />
          <rect x="64" y="94" width="5" height="8" fill="#FFFFFF" rx="0.5" />
          
          <rect x="77" y="58" width="5" height="8" fill="#FFFFFF" rx="0.5" />
          <rect x="77" y="70" width="5" height="8" fill="#FFFFFF" rx="0.5" />
          <rect x="77" y="82" width="5" height="8" fill="#FFFFFF" rx="0.5" />
          <rect x="77" y="94" width="5" height="8" fill="#FFFFFF" rx="0.5" />

          {/* Foreground Left building (Bright Orange) */}
          <rect x="22" y="65" width="28" height="40" fill="#FF9500" stroke="#FFFFFF" strokeWidth="2" />
          {/* Grid windows on orange building */}
          <rect x="28" y="72" width="6" height="5" fill="#FFFFFF" />
          <rect x="28" y="82" width="6" height="5" fill="#FFFFFF" />
          <rect x="28" y="92" width="6" height="5" fill="#FFFFFF" />
          
          <rect x="38" y="72" width="6" height="5" fill="#FFFFFF" />
          <rect x="38" y="82" width="6" height="5" fill="#FFFFFF" />
          <rect x="38" y="92" width="6" height="5" fill="#FFFFFF" />

          {/* Construction Crane Tower (Orange steel trusses) */}
          <path d="M50 105 L50 45" stroke="#FF9500" strokeWidth="3.5" />
          <path d="M50 45 L50 40 L88 30" stroke="#FF9500" strokeWidth="2.5" />
          <path d="M50 45 L88 45" stroke="#FF9500" strokeWidth="2.5" />
          {/* Truss cross lattice */}
          <line x1="50" y1="100" x2="55" y2="90" stroke="#FF9500" strokeWidth="1.5" />
          <line x1="50" y1="85" x2="55" y2="75" stroke="#FF9500" strokeWidth="1.5" />
          <line x1="50" y1="70" x2="55" y2="60" stroke="#FF9500" strokeWidth="1.5" />
          <line x1="50" y1="55" x2="55" y2="45" stroke="#FF9500" strokeWidth="1.5" />

          {/* Crane boom extending left lifting */}
          <line x1="26" y1="45" x2="50" y2="45" stroke="#FF9500" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="45" x2="26" y2="58" stroke="#FF9500" strokeWidth="1.5" />
          {/* Lifting hook */}
          <path d="M24 58 C24 61, 28 61, 28 58 C28 56, 26 55, 26 55" stroke="#FF9500" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="flex flex-col select-none">
          <span className="font-display text-3xl font-extrabold tracking-tight text-white leading-none flex items-center">
            Build<span className="text-orange-400">Track</span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.25em] text-gray-300 mt-2 uppercase whitespace-nowrap">
            Construction Expense Tracker
          </span>
        </div>
      </div>
    );
  }

  // Full original brand logo (Image 1 - Light background)
  return (
    <div className={`flex items-center gap-4 ${className}`} style={{ height }}>
      {/* Precision high-fidelity SVG illustration representing Image 1 */}
      <svg viewBox="0 0 160 120" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Base foundation ground line */}
        <rect x="10" y="105" width="140" height="4" rx="2" fill="#1F2937" />
        
        {/* Tallest background building outline (slanted roof, black outlines) */}
        <path d="M94 32 L116 32 L116 105 L94 105 Z" fill="#F3F4F6" stroke="#1F2937" strokeWidth="2" />
        <path d="M94 32 L116 18 L116 32 Z" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" strokeLinejoin="round" />
        
        {/* Horizontal building slit lines on the tall background building */}
        <line x1="122" y1="50" x2="135" y2="50" stroke="#1F2937" strokeWidth="2" />
        <line x1="122" y1="58" x2="135" y2="58" stroke="#1F2937" strokeWidth="2" />
        <line x1="122" y1="66" x2="135" y2="66" stroke="#1F2937" strokeWidth="2" />
        <line x1="122" y1="74" x2="135" y2="74" stroke="#1F2937" strokeWidth="2" />
        <line x1="122" y1="82" x2="135" y2="82" stroke="#1F2937" strokeWidth="2" />
        <line x1="122" y1="90" x2="135" y2="90" stroke="#1F2937" strokeWidth="2" />

        {/* Medium building in the middle with white window grids */}
        <rect x="58" y="50" width="30" height="55" fill="#2E3033" stroke="#1F2937" strokeWidth="2" />
        {/* Window grids on mid building */}
        <rect x="64" y="58" width="5" height="8" fill="#FFFFFF" rx="0.5" />
        <rect x="64" y="70" width="5" height="8" fill="#FFFFFF" rx="0.5" />
        <rect x="64" y="82" width="5" height="8" fill="#FFFFFF" rx="0.5" />
        <rect x="64" y="94" width="5" height="8" fill="#FFFFFF" rx="0.5" />
        
        <rect x="77" y="58" width="5" height="8" fill="#FFFFFF" rx="0.5" />
        <rect x="77" y="70" width="5" height="8" fill="#FFFFFF" rx="0.5" />
        <rect x="77" y="82" width="5" height="8" fill="#FFFFFF" rx="0.5" />
        <rect x="77" y="94" width="5" height="8" fill="#FFFFFF" rx="0.5" />

        {/* Foreground Left building (Bright Orange) */}
        <rect x="22" y="65" width="28" height="40" fill="#FF9500" stroke="#1F2937" strokeWidth="2" />
        {/* Grid windows on orange building */}
        <rect x="28" y="72" width="6" height="5" fill="#FFFFFF" />
        <rect x="28" y="82" width="6" height="5" fill="#FFFFFF" />
        <rect x="28" y="92" width="6" height="5" fill="#FFFFFF" />
        
        <rect x="38" y="72" width="6" height="5" fill="#FFFFFF" />
        <rect x="38" y="82" width="6" height="5" fill="#FFFFFF" />
        <rect x="38" y="92" width="6" height="5" fill="#FFFFFF" />

        {/* Construction Crane Tower (Orange steel trusses) */}
        <path d="M50 105 L50 45" stroke="#FF9500" strokeWidth="3.5" />
        <path d="M50 45 L50 40 L88 30" stroke="#FF9500" strokeWidth="2.5" />
        <path d="M50 45 L88 45" stroke="#FF9500" strokeWidth="2.5" />
        {/* Truss cross lattice */}
        <line x1="50" y1="100" x2="55" y2="90" stroke="#FF9500" strokeWidth="1.5" />
        <line x1="50" y1="85" x2="55" y2="75" stroke="#FF9500" strokeWidth="1.5" />
        <line x1="50" y1="70" x2="55" y2="60" stroke="#FF9500" strokeWidth="1.5" />
        <line x1="50" y1="55" x2="55" y2="45" stroke="#FF9500" strokeWidth="1.5" />

        {/* Crane boom extending left lifting */}
        <line x1="26" y1="45" x2="50" y2="45" stroke="#FF9500" strokeWidth="3" strokeLinecap="round" />
        <line x1="26" y1="45" x2="26" y2="58" stroke="#FF9500" strokeWidth="1.5" />
        {/* Lifting hook */}
        <path d="M24 58 C24 61, 28 61, 28 58 C28 56, 26 55, 26 55" stroke="#FF9500" strokeWidth="1.5" fill="none" />
      </svg>
      <div className="flex flex-col select-none">
        <span className="font-display text-4xl font-extrabold tracking-tight text-gray-900 leading-none flex items-center">
          Build<span className="text-orange-500">Track</span>
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] text-gray-500 mt-2 uppercase whitespace-nowrap">
          Construction Expense Tracker
        </span>
      </div>
    </div>
  );
};
