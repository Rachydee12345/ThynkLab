
import React from 'react';
import { ArrowLeft, Download, PenTool, AlertCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const AxleAssemblyGuidePage: React.FC<Props> = ({ onBack }) => {

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
      ctx.fillText(`THYNKLAB 2026 © • YEAR 4 ENGINEERING • AXLE ASSEMBLY GUIDE`, width / 2, height - 60);
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

    drawText("Axle Assembly Guide", margin, 320, "800 70px Montserrat, sans-serif", "#7C3AED");
    drawText("Step-by-step instructions", margin, 400, "600 36px Montserrat, sans-serif", "#64748B");
    
    ctx.fillStyle = "#22D3EE";
    ctx.beginPath();
    ctx.roundRect(margin, 440, 150, 12, 6);
    ctx.fill();

    const diaY = 600;
    const centerX = width / 2;

    ctx.fillStyle = "#F1F5F9";
    ctx.strokeStyle = "#94A3B8";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(centerX - 300, diaY, 600, 150, 20);
    ctx.fill();
    ctx.stroke();
    drawText("CHASSIS (Cardboard)", centerX, diaY + 35, "700 24px Montserrat, sans-serif", "#94A3B8", "center");

    ctx.fillStyle = "#E0F2FE";
    ctx.strokeStyle = "#0EA5E9";
    ctx.beginPath();
    ctx.rect(centerX - 250, diaY + 150, 500, 60);
    ctx.fill();
    ctx.stroke();
    drawText("BEARING (Straw)", centerX, diaY + 190, "700 28px Montserrat, sans-serif", "#0369A1", "center");

    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(centerX - 400, diaY + 180);
    ctx.lineTo(centerX + 400, diaY + 180);
    ctx.stroke();
    drawText("AXLE (Skewer)", centerX - 420, diaY + 190, "700 24px Montserrat, sans-serif", "#475569", "right");

    const wheelW = 50;
    const wheelH = 180;
    ctx.fillStyle = "#1E293B";
    ctx.beginPath(); ctx.roundRect(centerX - 460, diaY + 90, wheelW, wheelH, 10); ctx.fill();
    ctx.beginPath(); ctx.roundRect(centerX + 410, diaY + 90, wheelW, wheelH, 10); ctx.fill();

    const gapY = diaY + 110;
    const arrowWidth = 50; 
    const gapCenterX = centerX - 330;
    // Define gapRightCenterX to fix the ReferenceError
    const gapRightCenterX = centerX + 330;
    ctx.strokeStyle = "#EF4444";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(gapCenterX - arrowWidth, gapY); ctx.lineTo(gapCenterX + arrowWidth, gapY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gapRightCenterX - arrowWidth, gapY); ctx.lineTo(gapRightCenterX + arrowWidth, gapY); ctx.stroke();

    const stepStart = 1050;
    const steps = [
      { num: "1", text: "Secure the straw (bearing) to the chassis using tape." },
      { num: "2", text: "Slide the wooden skewer (axle) through the straw." },
      { num: "3", text: "Push wheels onto both ends of the skewer." },
      { num: "4", text: "Leave a small gap between the wheel and the chassis." }
    ];

    let currentY = stepStart;
    steps.forEach(step => {
      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.arc(margin + 40, currentY - 15, 30, 0, Math.PI * 2);
      ctx.fill();
      drawText(step.num, margin + 40, currentY - 5, "700 30px Montserrat, sans-serif", "#FFFFFF", "center");
      drawText(step.text, margin + 100, currentY, "500 30px Montserrat, sans-serif", "#0F172A");
      currentY += 120;
    });

    const link = document.createElement('a');
    link.download = 'thynklab_axle_guide_year4.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-200 transition-all"><Download size={18} /> Download PNG</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
         <div className="bg-white shadow-2xl w-full max-w-[210mm] aspect-[1/1.414] p-[20mm] flex flex-col relative select-none">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 leading-none mb-1">THYNKLAB</h1>
              <p className="text-[10px] font-medium tracking-[0.2em] text-slate-500 uppercase">Where Future Skills Begin</p>
            </div>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-purple-600 leading-tight">Axle Assembly Guide</h2>
              <p className="text-slate-500 font-semibold mt-1">Step-by-step instructions</p>
              <div className="h-1.5 w-20 bg-cyan-400 rounded-full mt-4"></div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mb-10 flex-1 overflow-hidden">
                <p className="text-xs text-slate-400 font-bold uppercase mb-4">Official Component Map</p>
                <div className="relative w-full h-40 bg-white border border-slate-200 rounded-2xl flex items-center justify-center">
                    <div className="w-20 h-10 border-2 border-slate-300 bg-slate-50 rounded" />
                    <div className="absolute w-[80%] h-1 bg-slate-600 rounded-full" />
                </div>
            </div>
            <div className="mt-auto border-t-2 border-slate-100 pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
               <span>THYNKLAB 2026 ©</span>
               <span>Year 4 • Wheels & Axles</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AxleAssemblyGuidePage;
