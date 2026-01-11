
import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Check, X } from 'lucide-react';

interface Props {
  onCapture: (imageData: string) => void;
}

const SafeCamera: React.FC<Props> = ({ onCapture }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false 
      });
      setStream(mediaStream);
      setIsActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Please allow camera access to capture evidence.");
    }
  };

  // Effect to attach stream to video element once it becomes available in the DOM
  useEffect(() => {
    if (isActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play().catch(e => console.error("Video play failed", e));
      };
    }
  }, [isActive, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
  };

  const captureStill = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Use video dimensions for canvas
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(dataUrl);
        setIsCaptured(true);
        stopCamera();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  if (!isActive && !isCaptured) {
    return (
      <button 
        onClick={startCamera}
        className="flex items-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-200 active:scale-95"
      >
        <Camera size={20} />
        Open Evidence Camera
      </button>
    );
  }

  if (isCaptured) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
          <Check size={14} /> Evidence Captured Successfully
        </div>
        <button 
          onClick={() => { setIsCaptured(false); startCamera(); }}
          className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
        >
          <RefreshCw size={12} /> Retake Photo
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-black rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/10 aspect-video">
        {/* Added muted and playsInline for auto-play compatibility */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Capture Controls Overlaid */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8 z-10">
          <button 
            onClick={stopCamera}
            className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20"
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={captureStill}
            className="w-20 h-20 rounded-full bg-white border-[6px] border-white/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <Camera size={28} />
            </div>
          </button>
          
          <div className="w-14" /> {/* UI Balance Spacer */}
        </div>

        {/* Framing Guide */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-white/20 rounded-full border-dashed" />
        </div>
      </div>
      <p className="text-white/80 text-sm mt-6 font-bold tracking-wide flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        LIVE PREVIEW: Centre your project and capture
      </p>
    </div>
  );
};

export default SafeCamera;
