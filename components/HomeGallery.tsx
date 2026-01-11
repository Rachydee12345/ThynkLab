
import React from 'react';

const STATIC_IMAGE = "https://res.cloudinary.com/dgtyimmup/image/upload/v1768046098/gallery-4_gxin5n.jpg";

const HomeGallery: React.FC = () => {
  return (
    <div className="w-full max-w-[540px] relative group px-2 md:px-0">
      {/* Main Image Container */}
      <div className="rounded-[40px] md:rounded-[48px] overflow-hidden bg-gray-50 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-gray-100 aspect-[4/5] lg:aspect-auto relative min-h-[350px] md:min-h-[550px]">
        <div className="absolute inset-0">
          <img
            src={STATIC_IMAGE}
            alt="ThynkLab Pupil in action"
            className="w-full h-full object-cover saturate-[0.85] contrast-[0.98] brightness-[1.02] transition-transform duration-[10000ms] ease-out transform scale-100 group-hover:scale-105"
          />
          {/* Subtle Brand Filter */}
          <div className="absolute inset-0 bg-thynk-purple/5 mix-blend-multiply pointer-events-none" />
        </div>
        
        {/* Subtle Decorative Accent */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
          <div className="w-8 md:w-12 h-0.5 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Static Caption */}
      <div className="mt-6 md:mt-8 flex flex-col items-center lg:items-start lg:px-6">
        <p className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] text-gray-400 uppercase text-center lg:text-left">
          THYNKLAB METHOD IN PRACTICE
        </p>
        <p className="mt-1 md:mt-2 text-[10px] md:text-[11px] font-medium text-gray-300 uppercase tracking-widest text-center lg:text-left">
          Real pupils, real thinking, real making
        </p>
      </div>
    </div>
  );
};

export default HomeGallery;
