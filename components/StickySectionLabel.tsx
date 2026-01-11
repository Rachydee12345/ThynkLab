
import React from 'react';
import { useSection } from '../context/SectionContext';

const StickySectionLabel: React.FC = () => {
  const { activeLabel, isVisible } = useSection();

  return (
    <div 
      className="fixed top-[60px] left-0 right-0 h-[40px] bg-white border-b border-gray-100 flex items-center z-[90] px-8 pointer-events-none"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? '0' : '-10px'}) translateZ(0)`,
        willChange: 'transform, opacity',
        transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center">
        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] text-gray-400 uppercase text-center">
          {activeLabel}
        </span>
      </div>
    </div>
  );
};

export default StickySectionLabel;
