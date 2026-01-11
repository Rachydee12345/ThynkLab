
import React from 'react';

const ThynkLogo = ({ size = "32" }: { size?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
       xmlns="http://www.w3.org/2000/svg" aria-label="ThynkLab">
    <defs>
      <linearGradient id="thynkGradientSubtleWarm" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7C3AED"/>
        <stop offset="55%" stopColor="#EC4899"/>
        <stop offset="80%" stopColor="#F97316"/>
        <stop offset="100%" stopColor="#FACC15"/>
      </linearGradient>
    </defs>

    <path d="M4 4 L16 16 L16 30"
          stroke="url(#thynkGradientSubtleWarm)"
          strokeWidth="6"
          strokeLinecap="square"/>

    <path d="M28 4 L16 16"
          stroke="url(#thynkGradientSubtleWarm)"
          strokeWidth="6"
          strokeLinecap="square"/>
  </svg>
);

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", showTagline = false }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-3">
        <div className="hover:scale-110 transition-transform duration-300 transform -rotate-3 hover:rotate-0">
          <ThynkLogo size="40" />
        </div>
        <span className="text-thynk-black font-black text-3xl tracking-tighter">
          THYNK<span className="text-thynk-purple">LAB</span>
        </span>
      </div>
      {showTagline && (
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mt-1">
          Where Future Skills Begin
        </span>
      )}
    </div>
  );
};

export default Logo;
