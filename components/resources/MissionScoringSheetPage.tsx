
import React from 'react';
import { ArrowLeft, Download, Trophy, CheckCircle, Target, Shield, Zap } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const MissionScoringSheetPage: React.FC<Props> = ({ onBack }) => {

  const handleDownloadPNG = () => {
    const canvas = document.createElement('canvas');
    const width = 1240;
    const height = 1754;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    const margin = 100;

    const drawHeader = () => {
      ctx.fillStyle = "#0F172A";
      ctx.font = "900 60px Montserrat, sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText("THYNKLAB", margin, 120);
      
      ctx.fillStyle = "#64748B";
      ctx.font = "500 24px Montserrat, sans-serif";
      ctx.fillText("WHERE FUTURE SKILLS BEGIN", margin, 160);

      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.roundRect(margin, 200, width - (margin * 2), 6, 3);
      ctx.fill();
    };

    const drawFooter = () => {
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, height - 120, width, 120);
      
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margin, height - 120);
      ctx.lineTo(width - margin, height - 120);
      ctx.stroke();

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 18px Montserrat';
      ctx.textAlign = 'center';
      ctx.fillText(`THYNKLAB 2026 © • YEAR 4 ENGINEERING • MISSION SCORING`, width / 2, height - 60);
      ctx.textAlign = 'left';
    };

    drawHeader();
    drawFooter();

    const drawText = (text: string, x: number, y: number, font: string, color: string, align: CanvasTextAlign = 'left') => {
      ctx.fillStyle = color;
      ctx.font = font;
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
    };

    drawText("Mission Scoring Sheet", margin, 320, "800 70px Montserrat, sans-serif", "#7C3AED");
    drawText("Village Delivery", margin, 400, "800 50px Montserrat, sans-serif", "#7C3AED");
    
    ctx.fillStyle = "#22D3EE";
    ctx.beginPath();
    ctx.roundRect(margin, 440, 200, 15, 8);
    ctx.fill();

    const link = document.createElement('a');
    link.download = 'thynklab_mission_scoring.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in duration-300">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-200 transition-all"><Download size={18} /> Download as PNG</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
         <div className="bg-white shadow-2xl w-full max-w-[210mm] aspect-[1/1.414] p-[20mm] flex flex-col relative overflow-hidden">
            <div className="mb-8">
              <h1 className="text-4xl font-black text-slate-900 leading-none mb-1">THYNKLAB</h1>
              <p className="text-[10px] font-medium tracking-[0.2em] text-slate-500 uppercase">Where Future Skills Begin</p>
            </div>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-purple-600 leading-tight">Mission Scoring Sheet<br/>Village Delivery</h2>
              <div className="h-1.5 w-20 bg-cyan-400 rounded-full mt-4"></div>
            </div>
            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-8 mb-4 flex-1">
               <div className="flex items-center justify-between border-b pb-4 mb-4"><span className="text-xs font-black uppercase tracking-widest text-slate-400">Criteria</span><span className="text-xs font-black uppercase tracking-widest text-slate-400">Score</span></div>
               <div className="space-y-4">
                  <div className="flex justify-between font-bold text-sm"><span>Automation Path</span><span>/ 25</span></div>
                  <div className="flex justify-between font-bold text-sm"><span>Delivery Accuracy</span><span>/ 25</span></div>
                  <div className="flex justify-between font-bold text-sm"><span>System Synthesis</span><span>/ 50</span></div>
               </div>
            </div>
            <div className="mt-auto border-t-2 border-slate-100 pt-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
               <span>THYNKLAB 2026 ©</span>
               <span>Year 4 • Mission Scoring</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MissionScoringSheetPage;
