
import React from 'react';

const ThynkLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
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

export default ThynkLogo;
