
import React from 'react';

const MethodCycle: React.FC = () => {
  const nodes = [
    { label: 'MAKE IT', desc: 'Build first, plan later', angle: -90 },
    { label: 'THYNK IT', desc: 'Learn, reflect, connect', angle: 0 },
    { label: 'TWEAK IT', desc: 'Refine and improve', angle: 90 },
    { label: 'TEST IT', desc: 'Share and iterate', angle: 180 },
  ];

  return (
    <div className="relative w-full max-w-[500px] aspect-square flex flex-col items-center justify-center p-2 lg:p-8">
      {/* Diagram Title */}
      <div className="absolute top-0 left-0 right-0 flex justify-center z-40">
        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] text-gray-400 uppercase text-center bg-white px-4">
          a continuous cycle of learning
        </span>
      </div>

      <style>
        {`
          @keyframes rotateDots {
            from {
              stroke-dashoffset: 40;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          .dotted-path {
            animation: rotateDots 6.5s linear infinite;
            /* Move responsive radius logic to CSS as 'r' is a valid SVG CSS property */
            r: 160;
          }
          @media (min-width: 768px) {
            .dotted-path {
              r: 195;
            }
          }
        `}
      </style>

      {/* 1. CENTRAL CIRCLE - The Core (z-20) */}
      <div className="absolute w-32 h-32 md:w-56 md:h-56 rounded-full flex items-center justify-center z-20 bg-gray-50 shadow-sm border border-gray-100">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="centralCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#DB2777" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <circle 
            cx="100" cy="100" r="98" 
            fill="none" 
            stroke="url(#centralCircleGradient)" 
            strokeWidth="1.2" 
          />
        </svg>
        
        <div className="text-center z-20 px-4 md:px-8">
          <p className="text-[8px] md:text-[10px] font-normal text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.35em] mb-0.5 md:mb-1">The</p>
          <p className="text-[10px] md:text-[13px] font-bold text-gray-900 uppercase tracking-[0.15em] md:tracking-[0.25em] leading-tight">ThynkLab Method</p>
        </div>
      </div>

      {/* 2. DOTTED PATH - Layered behind everything (z-10) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="dottedPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DB2777" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* strokeWidth increased to 3 for 50% larger dots (original was 2) */}
        <circle 
          cx="250" cy="250" r="160" 
          fill="none" 
          stroke="url(#dottedPathGradient)" 
          strokeWidth="3" 
          strokeDasharray="1, 15" 
          strokeLinecap="round"
          className="dotted-path"
        />
      </svg>

      {/* 3. STAGE LABELS - Layered on top (z-30) */}
      {nodes.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        // Adjust radius based on screen size using a CSS variable or fixed ratio
        const x = Math.cos(rad) * 35; 
        const y = Math.sin(rad) * 35;

        return (
          <div 
            key={node.label}
            className="absolute flex flex-col items-center text-center z-30 pointer-events-none"
            style={{ 
              left: `${50 + x}%`, 
              top: `${50 + y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* White "Mask" wrapper to prevent dots showing through text */}
            <div className="bg-white/95 px-2 md:px-3 py-1 md:py-1.5 rounded-full md:rounded-md flex flex-col items-center shadow-sm md:shadow-none border border-gray-50 md:border-transparent">
              <h3 className="text-[9px] md:text-[12px] font-black tracking-[0.2em] md:tracking-[0.3em] text-black uppercase mb-0.5 md:mb-1 whitespace-nowrap">
                {node.label}
              </h3>
              <p className="hidden md:block text-[10px] text-gray-400 uppercase font-bold tracking-tight whitespace-nowrap">
                {node.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MethodCycle;
