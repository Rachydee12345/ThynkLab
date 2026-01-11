
import React from 'react';
import { ArrowLeft, Download, Map as MapIcon, Flag, Home, Mountain } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const RouteMapPage: React.FC<Props> = ({ onBack }) => {

  const handleDownloadPNG = () => {
    const canvas = document.createElement('canvas');
    const width = 1754; 
    const height = 1240;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#fdf6e3';
    ctx.fillRect(0, 0, width, height);

    const margin = 100;

    const drawHeader = () => {
      ctx.fillStyle = "#5d4037";
      ctx.font = "900 60px Montserrat, sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText("THYNKLAB", margin, 120);
      
      ctx.fillStyle = "#8d6e63";
      ctx.font = "500 24px Montserrat, sans-serif";
      ctx.fillText("WHERE FUTURE SKILLS BEGIN", margin, 160);

      ctx.fillStyle = "#5d4037";
      ctx.beginPath();
      ctx.roundRect(margin, 200, width - (margin * 2), 6, 3);
      ctx.fill();
    };

    const drawFooter = () => {
      ctx.fillStyle = '#f5ecd1';
      ctx.fillRect(0, height - 120, width, 120);
      
      ctx.strokeStyle = "#d7ccc8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margin, height - 120);
      ctx.lineTo(width - margin, height - 120);
      ctx.stroke();

      ctx.fillStyle = '#5d4037';
      ctx.font = 'bold 18px Montserrat';
      ctx.textAlign = 'center';
      ctx.fillText(`THYNKLAB 2026 © • YEAR 4 ENGINEERING • VILLAGE MISSION MAP`, width / 2, height - 60);
      ctx.textAlign = 'left';
    };

    drawHeader();
    drawFooter();

    const link = document.createElement('a');
    link.download = 'thynklab_village_mission_map.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in duration-300">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-200 transition-all"><Download size={18} /> Download High-Res Map</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
        <div className="bg-[#fdf6e3] shadow-2xl w-full max-w-[297mm] aspect-[1.414/1] p-[20mm] flex flex-col relative border-[12px] border-[#8b5e3c]">
          <div className="mb-10 text-left">
            <h1 className="text-4xl font-black text-[#5d4037] leading-none mb-1">THYNKLAB</h1>
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#8d6e63] uppercase">Where Future Skills Begin</p>
          </div>
          <div className="text-center mb-10"><h1 className="text-4xl font-black text-[#5d4037] uppercase tracking-tight">Village Mission Map</h1></div>
          <div className="flex-1 border-2 border-dashed border-[#d7ccc8] rounded-3xl relative flex items-center justify-center">
             <MapIcon size={64} className="text-[#8d6e63] opacity-20" />
          </div>
          <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#8d6e63]">
             <span>THYNKLAB 2026 ©</span>
             <span>Year 4 • Village Map</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMapPage;
