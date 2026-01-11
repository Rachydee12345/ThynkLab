
import React, { useState, useEffect, useRef } from 'react';

// Using a reliable Pexels/Sample video for educational atmospheric feel
const PLACEHOLDER_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-children-in-a-classroom-setting-doing-science-experiments-41133-large.mp4";

interface VideoBandProps {
  caption?: string;
  displayDuration?: number; // ms
}

const VideoBand: React.FC<VideoBandProps> = ({ 
  caption = "Real classrooms. Real making. Real thinking.",
  displayDuration = 5000 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 my-16 animate-in fade-in duration-1000">
      <div className="relative aspect-video md:aspect-[21/9] rounded-[40px] overflow-hidden bg-gray-900 shadow-2xl border border-gray-100">
        
        <video
          ref={videoRef}
          src={PLACEHOLDER_VIDEO}
          muted
          loop
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100 z-10 saturate-[0.8]"
          onLoadedData={() => setIsReady(true)}
        />

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none" />
        
        {/* Initial Loading State */}
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-30">
            <div className="w-8 h-8 border-2 border-thynk-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {caption && (
        <p className="mt-6 text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase text-center md:text-left md:px-4">
          {caption}
        </p>
      )}
    </div>
  );
};

export default VideoBand;
