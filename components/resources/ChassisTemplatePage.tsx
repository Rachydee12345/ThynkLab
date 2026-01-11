
import React from 'react';
import { ArrowLeft, Download, Scissors } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const ChassisTemplatePage: React.FC<Props> = ({ onBack }) => {

  const drawLogoOnCanvas = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const scale = size / 32;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    const grad = ctx.createLinearGradient(4, 4, 28, 28);
    grad.addColorStop(0, '#7C3AED');
    grad.addColorStop(0.55, '#EC4899');
    grad.addColorStop(0.80, '#F97316');
    grad.addColorStop(1, '#FACC15');
    
    ctx.strokeStyle = grad;
    ctx.lineWidth = 6;
    ctx.lineCap = 'square';
    
    ctx.beginPath();
    ctx.moveTo(4, 4);
    ctx.lineTo(16, 16);
    ctx.lineTo(16, 30);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(28, 4);
    ctx.lineTo(16, 16);
    ctx.stroke();
    
    ctx.restore();
  };

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
      // Draw Logo
      drawLogoOnCanvas(ctx, margin, 75, 48);
      
      ctx.fillStyle = "#0F172A";
      ctx.font = "900 60px Montserrat, sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText("THYNKLAB", margin + 65, 120);
      
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
      ctx.fillText(`THYNKLAB 2026 © • YEAR 4 ENGINEERING • CHASSIS TEMPLATE`, width / 2, height - 60);
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

    drawText("Chassis Template", margin, 320, "800 70px Montserrat, sans-serif", "#7C3AED");
    drawText("Wheels & Axles", margin, 400, "800 50px Montserrat, sans-serif", "#7C3AED");
    
    ctx.fillStyle = "#22D3EE";
    ctx.beginPath();
    ctx.roundRect(margin, 440, 200, 15, 8);
    ctx.fill();

    const boxTop = 500;
    const boxHeight = 420;
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#F8FAFC";
    
    ctx.beginPath();
    ctx.roundRect(margin, boxTop, width - (margin * 2), boxHeight, 40);
    ctx.fill();
    ctx.stroke();

    drawText("CONSTRUCTION GUIDE", margin + 50, boxTop + 70, "800 28px Montserrat, sans-serif", "#64748B");
    
    const steps = [
      "Print this page on A4 paper (Scale: 100%).",
      "Cut out the template along the dashed lines.",
      "Trace the shape onto your corrugated cardboard.",
      "Carefully cut the cardboard using safety scissors."
    ];

    let stepY = boxTop + 130;
    steps.forEach(step => {
      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.arc(margin + 60, stepY - 10, 8, 0, Math.PI * 2);
      ctx.fill();
      drawText(step, margin + 90, stepY, "500 32px Montserrat, sans-serif", "#0F172A");
      stepY += 60;
    });

    const diagramTop = 1000;
    const diagramW = 500;
    const diagramH = 550;
    const diaX = (width - diagramW) / 2;
    
    drawText("NOT TO SCALE", width - margin, diagramTop, "700 24px Montserrat, sans-serif", "#94A3B8", "right");

    ctx.save();
    ctx.strokeStyle = "#0F172A";
    ctx.lineWidth = 6;
    ctx.setLineDash([20, 15]);
    ctx.strokeRect(diaX, diagramTop + 40, diagramW, diagramH);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = -diagramH; i < diagramW + diagramH; i += 30) {
      ctx.moveTo(diaX + i, diagramTop + 40);
      ctx.lineTo(diaX + i + 500, diagramTop + 40 + 500);
    }
    ctx.rect(diaX, diagramTop + 40, diagramW, diagramH);
    ctx.clip();
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = "#0F172A";
    ctx.lineWidth = 8;
    const markLen = 40;
    ctx.beginPath(); ctx.moveTo(diaX, diagramTop + 40 + markLen); ctx.lineTo(diaX, diagramTop + 40); ctx.lineTo(diaX + markLen, diagramTop + 40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(diaX + diagramW - markLen, diagramTop + 40); ctx.lineTo(diaX + diagramW, diagramTop + 40); ctx.lineTo(diaX + diagramW, diagramTop + 40 + markLen); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(diaX, diagramTop + 40 + diagramH - markLen); ctx.lineTo(diaX, diagramTop + 40 + diagramH); ctx.lineTo(diaX + markLen, diagramTop + 40 + diagramH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(diaX + diagramW - markLen, diagramTop + 40 + diagramH); ctx.lineTo(diaX + diagramW, diagramTop + 40 + diagramH); ctx.lineTo(diaX + diagramW, diagramTop + 40 + diagramH - markLen); ctx.stroke();

    drawText("FRONT", width / 2, diagramTop + 100, "800 30px Montserrat, sans-serif", "#94A3B8", "center");
    drawText("BACK", width / 2, diagramTop + diagramH, "800 30px Montserrat, sans-serif", "#94A3B8", "center");

    ctx.save();
    ctx.translate(width / 2, diagramTop + 40 + (diagramH / 2));
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#CBD5E1";
    ctx.font = "700 40px Montserrat, sans-serif";
    ctx.fillText("CARDBOARD CHASSIS", 0, 0);
    ctx.restore();

    const link = document.createElement('a');
    link.download = 'thynklab_chassis_template_year4.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-200 transition-all"><Download size={18} /> Download as PNG</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
         <div className="bg-white shadow-2xl w-full max-w-[210mm] aspect-[1/1.414] p-[20mm] flex flex-col relative select-none">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 leading-none mb-1">THYNKLAB</h1>
              <p className="text-[10px] font-medium tracking-[0.2em] text-slate-500 uppercase">Where Future Skills Begin</p>
            </div>
            <div className="mb-10">
              <h2 className="text-3xl font-extrabold text-purple-600 leading-tight">Chassis Template<br/>Wheels & Axles</h2>
              <div className="h-1.5 w-20 bg-cyan-400 rounded-full mt-4"></div>
            </div>
            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-8 mb-12 flex-1">
               <div className="flex items-center gap-2 mb-4 text-slate-500">
                 <Scissors size={18} />
                 <h3 className="font-bold text-xs uppercase tracking-widest">Construction Guide</h3>
               </div>
               <ul className="space-y-4">
                 {[
                   "Print this image on A4 paper (Scale: 100%).",
                   "Cut out the template along the dashed lines.",
                   "Trace the shape onto your corrugated cardboard.",
                   "Carefully cut the cardboard using safety scissors."
                 ].map((t, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 shrink-0" />
                     <span className="text-slate-800 font-medium text-sm leading-relaxed">{t}</span>
                   </li>
                 ))}
               </ul>
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

export default ChassisTemplatePage;
