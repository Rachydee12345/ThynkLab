
import React, { useState, useEffect } from 'react';
import { DesignStage, ProjectState } from '../types';
import { BlueprintCycle } from '../blueprint';
import SafeCamera from './features/Camera/SafeCamera';
import JSZip from 'https://esm.sh/jszip';
import { GoogleGenAI } from "@google/genai";
import { 
  Truck, Box, Scissors, MoveHorizontal, Circle, CircleDot, Settings, TrendingDown, 
  AlignJustify, Minimize2, Weight, Maximize, ArrowRight, Package, FileText, 
  Download, Video, Mic, CheckCircle2, RefreshCw, HelpCircle, Droplets, Wind, Plus, Camera,
  Eye, EyeOff, Radio, Code, Shield, Target, ArrowUp, Zap, ChevronDown, ChevronUp, Link, ExternalLink, Play,
  Trophy, ListChecks, ArrowLeft, ChevronLeft, ChevronRight, X, Loader2, Sparkles, Image as ImageIcon,
  Cpu, Layout, Volume2, PenTool, Lightbulb, Rocket, Flag, Star, Info, Globe, BrainCircuit
} from 'lucide-react';

interface Props {
  stage: DesignStage;
  cycle: BlueprintCycle;
  projectState: ProjectState;
  setProjectState: (state: ProjectState) => void;
  onOpenResource?: (resourceId: string) => void;
}

const IconMap: Record<string, React.ElementType> = {
  Truck, Box, Scissors, MoveHorizontal, Circle, CircleDot, Settings, TrendingDown, 
  AlignJustify, Minimize2, Weight, Maximize, ArrowRight, Package, RefreshCw, Droplets, Wind,
  Zap, Radio, Code, Shield, Target, ArrowUp, Link, Trophy, ListChecks, Cpu, Ruler: Layout, Volume2, PenTool, Lightbulb, Rocket, Flag
};

// --- STATIC SCHEMATIC COMPONENT ---
const DynamicSchematic: React.FC<{ cycle: BlueprintCycle }> = ({ cycle }) => {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 p-2 shadow-sm mb-10 overflow-hidden relative group">
      <div className="aspect-video bg-slate-50 rounded-[28px] flex items-center justify-center relative overflow-hidden">
        <div 
          className="w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-700"
          dangerouslySetInnerHTML={{ __html: cycle.svgSchematic }}
        />
      </div>
      <div className="p-4 flex items-center justify-between border-t border-slate-50">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
             TECHNICAL SCHEMATIC • {cycle.theme}
           </span>
        </div>
        <span className="text-[9px] font-bold text-slate-300 uppercase">OFFICIAL MISSION BLUEPRINT</span>
      </div>
    </div>
  );
};

// --- STYLED COMPONENTS ---
const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-black text-slate-900 font-['Montserrat'] uppercase tracking-tight">{title}</h2>
    {subtitle && <p className="text-slate-500 mt-1 font-medium text-sm leading-tight">{subtitle}</p>}
    <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mt-3 rounded-full"></div>
  </div>
);

const ResourceCard: React.FC<{ title: string; type: string; url?: string; onClick?: () => void }> = ({ title, type, url, onClick }) => {
  const isLink = type === 'Link';
  return (
    <div 
      onClick={isLink && url ? () => window.open(url, '_blank') : onClick} 
      className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 transition-all group cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
        {isLink ? <ExternalLink size={18} /> : <FileText size={18} />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors leading-tight">{title}</p>
        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-1">{type}</p>
      </div>
      <Download size={14} className="text-slate-300 group-hover:text-indigo-500" />
    </div>
  );
};

const ConceptCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => {
  const Icon = IconMap[icon] || HelpCircle;
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex gap-5 items-start group hover:border-indigo-200 transition-all hover:shadow-md h-full">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-base mb-1 uppercase tracking-tight">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
};

const DeepDiveSection: React.FC<{ deepDive: BlueprintCycle['thynk']['deepDive'] }> = ({ deepDive }) => {
  return (
    <div className="bg-[#0F172A] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 group">
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <BrainCircuit size={160} className="rotate-12" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
           <div className="bg-indigo-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-lg shadow-indigo-900/40">
             Technical Deep Dive
           </div>
           <div className="flex-1 h-px bg-white/10" />
        </div>

        <h3 className="text-3xl font-black mb-8 uppercase tracking-tight leading-none text-indigo-400">{deepDive.heading}</h3>

        <div className="grid grid-cols-1 gap-10">
          <div className="flex gap-6 items-start">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-emerald-400">
               <Info size={24} />
             </div>
             <div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-2 text-emerald-400">Why It Matters</h4>
                <p className="text-indigo-100/90 leading-relaxed font-medium text-sm md:text-base">
                  {deepDive.whyItMatters}
                </p>
             </div>
          </div>

          <div className="flex gap-6 items-start">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-blue-400">
               <Globe size={24} />
             </div>
             <div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-2 text-blue-400">Real-World Application</h4>
                <p className="text-indigo-100/90 leading-relaxed font-medium text-sm md:text-base">
                  {deepDive.realWorldApplication}
                </p>
             </div>
          </div>

          <div className="flex gap-6 items-start">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-purple-400">
               <Code size={24} />
             </div>
             <div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-2 text-purple-400">Computational Thinking</h4>
                <p className="text-indigo-100/90 leading-relaxed font-medium text-sm md:text-base">
                  {deepDive.logicExploration}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StageContent: React.FC<Props> = ({ stage, cycle, projectState, setProjectState, onOpenResource }) => {
  const [isExporting, setIsExporting] = useState(false);

  const wrapText = (ctx: CanvasRenderingContext2D, t: string, maxWidth: number) => {
    const words = (t || '').split(' ');
    const lines = [];
    let cur = words[0];
    if (!cur) return [" "];
    for (let i = 1; i < words.length; i++) {
      if (ctx.measureText(cur + " " + words[i]).width < maxWidth) cur += " " + words[i];
      else { lines.push(cur); cur = words[i]; }
    }
    lines.push(cur);
    return lines;
  };

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

  const drawBranding = (ctx: CanvasRenderingContext2D, width: number, height: number, p: number, margin: number) => {
    ctx.save();
    
    // Draw Logo
    drawLogoOnCanvas(ctx, margin, 55, 48);
    
    ctx.fillStyle = "#0F172A";
    ctx.font = "900 48px Montserrat, sans-serif";
    ctx.textAlign = 'left';
    ctx.fillText("THYNKLAB", margin + 65, 100);
    
    ctx.fillStyle = "#7C3AED";
    ctx.font = "700 20px Montserrat, sans-serif";
    ctx.textAlign = 'right';
    ctx.fillText(`LAB REPORT • PAGE ${p} OF 2`, width - margin, 100);
    
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(0, height - 100, width, 100);
    
    ctx.fillStyle = "#94A3B8";
    ctx.font = "800 14px Montserrat, sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText(`STUDENT MISSION REPORT • ${cycle.title}  |  THYNKLAB 2026 ©`, width / 2, height - 60);
    ctx.restore();
    
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  };

  const generatePageCanvas = async (pageNum: number): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    const width = 1240;
    const height = 1754;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas failed");
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    
    const margin = 100;

    if (pageNum === 1) {
      drawBranding(ctx, width, height, 1, margin);
      ctx.textAlign = 'left';
      ctx.fillStyle = "#0F172A";
      ctx.font = "900 42px Montserrat, sans-serif";
      ctx.fillText(cycle.title, margin, 200);
      
      ctx.fillStyle = "#4338CA";
      ctx.font = "800 24px Montserrat, sans-serif";
      ctx.fillText("MISSION OBJECTIVE", margin, 280);
      const objLines = wrapText(ctx, cycle.make.description, width - margin * 2);
      ctx.fillStyle = "#334155";
      ctx.font = "500 20px Montserrat, sans-serif";
      objLines.forEach((l, i) => ctx.fillText(l, margin, 320 + (i * 30)));

      const quizY = 480;
      ctx.fillStyle = "#F97316";
      ctx.font = "800 24px Montserrat, sans-serif";
      ctx.fillText("CHECKPOINT RESULTS", margin, quizY);
      ctx.fillStyle = "#334155";
      ctx.font = "700 32px Montserrat, sans-serif";
      const score = Object.keys(projectState.quizAnswers).reduce((acc, qid) => {
        const q = cycle.thynk.quiz.find(item => item.id === Number(qid));
        return q && projectState.quizAnswers[Number(qid)] === q.answer ? acc + 1 : acc;
      }, 0);
      ctx.fillText(`${score} / ${cycle.thynk.quiz.length} Correct`, margin, quizY + 60);

      const tweakY = 650;
      ctx.fillStyle = "#7C3AED";
      ctx.font = "800 24px Montserrat, sans-serif";
      ctx.fillText("DESIGN UPGRADES (MISSION PLAN)", margin, tweakY);
      let currentY = tweakY + 50;
      projectState.selectedTweaks.forEach((tid) => {
        const opt = cycle.tweak.options.find(o => o.id === tid);
        if (opt) {
          ctx.fillStyle = "#334155";
          ctx.font = "700 18px Montserrat, sans-serif";
          ctx.fillText(`• ${opt.title}`, margin + 20, currentY);
          currentY += 30;
        }
      });
      if (projectState.customTweak) {
        ctx.fillStyle = "#334155";
        ctx.font = "700 18px Montserrat, sans-serif";
        ctx.fillText("• Bespoke Tweak:", margin + 20, currentY);
        currentY += 30;
        ctx.font = "italic 16px Montserrat, sans-serif";
        const customLines = wrapText(ctx, projectState.customTweak, width - margin * 2.5);
        customLines.forEach((l) => {
          ctx.fillText(l, margin + 40, currentY);
          currentY += 25;
        });
      }
    } else {
      drawBranding(ctx, width, height, 2, margin);
      ctx.textAlign = 'left';
      ctx.fillStyle = "#0F172A";
      ctx.font = "900 28px Montserrat, sans-serif";
      ctx.fillText("TESTING REFLECTION", margin, 200);
      const refLines = wrapText(ctx, projectState.testReflection || "No reflection provided.", width - margin * 2);
      ctx.fillStyle = "#334155";
      ctx.font = "500 24px Montserrat, sans-serif";
      refLines.forEach((l, i) => ctx.fillText(l, margin, 250 + (i * 35)));

      if (projectState.cameraImage) {
        const img = new Image();
        img.src = projectState.cameraImage;
        await new Promise(r => img.onload = r);
        const imgW = width - margin * 2;
        const imgH = (img.height / img.width) * imgW;
        ctx.drawImage(img, margin, 600, imgW, imgH);
        ctx.strokeStyle = "#E2E8F0";
        ctx.lineWidth = 4;
        ctx.strokeRect(margin, 600, imgW, imgH);
      } else {
        ctx.save();
        ctx.fillStyle = "#F1F5F9";
        ctx.fillRect(margin, 600, width - margin * 2, 400);
        ctx.fillStyle = "#94A3B8";
        ctx.textAlign = 'center';
        ctx.font = "700 20px Montserrat, sans-serif";
        ctx.fillText("NO MISSION EVIDENCE CAPTURED", width / 2, 800);
        ctx.restore();
      }
    }
    return canvas;
  };

  const handleExportFinalReport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const canvas1 = await generatePageCanvas(1);
      const blob1 = await new Promise<Blob | null>(resolve => canvas1.toBlob(resolve, 'image/png'));
      if (blob1) zip.file(`lab_report_page1.png`, blob1);
      
      const canvas2 = await generatePageCanvas(2);
      const blob2 = await new Promise<Blob | null>(resolve => canvas2.toBlob(resolve, 'image/png'));
      if (blob2) zip.file(`lab_report_page2.png`, blob2);

      const contentZip = await zip.generateAsync({ type: "blob" });
      const link = document.createElement('a');
      link.download = `ThynkLab_LabReport_${cycle.id}.zip`;
      link.href = URL.createObjectURL(contentZip);
      link.click();
    } catch (err) { 
      console.error(err); 
    } finally { 
      setIsExporting(false); 
    }
  };

  if (stage === DesignStage.MAKE_IT) {
    const data = cycle.make;
    const isCodingCycle = cycle.theme.toLowerCase().includes('code') || cycle.theme.toLowerCase().includes('automated');

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 font-['Montserrat']">
        <div className="lg:col-span-8 space-y-12">
           <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-3xl shadow-sm">
             <div className="flex items-center gap-3 mb-2">
               <Star size={20} className="text-indigo-600 fill-indigo-600" />
               <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Today's Objective</h4>
             </div>
             <p className="text-xl font-bold text-slate-800 leading-tight">
               {data.dailyGoal}
             </p>
           </div>

           {data.challenge && (
              <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Rocket size={160} className="rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-yellow-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-lg shadow-yellow-900/40">
                      Culmination Mission
                    </div>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <h3 className="text-4xl font-black mb-6 uppercase tracking-tight leading-none">{data.challenge.title}</h3>
                  <p className="text-indigo-100/90 leading-relaxed text-lg font-medium mb-10 max-w-2xl">
                    {data.challenge.description}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {data.challenge.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-emerald-900/40">
                           <CheckCircle2 size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-bold text-indigo-50 tracking-tight leading-snug">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
           )}

           <section>
              <SectionHeader 
                title={isCodingCycle ? "Algorithm Reference" : "Technical Reference"} 
                subtitle={isCodingCycle ? "Visualizing the coding logic for this mission." : "Bespoke engineering blueprint for your construction."} 
              />
              <DynamicSchematic cycle={cycle} />
              
              <SectionHeader title="Implementation Steps" subtitle="Follow these instructions to complete the build." />
              <div className="space-y-6 mt-8">
                {data.steps.map((step, idx) => {
                  const Icon = IconMap[step.icon] || Box;
                  return (
                    <div key={step.id} className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-sm flex gap-6 items-start group hover:border-indigo-300 transition-all hover:shadow-lg">
                       <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 font-black text-xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                         {idx + 1}
                       </div>
                       <div className="pt-1 flex-1">
                         <div className="flex items-center gap-2 mb-2">
                           <div className="text-indigo-500 group-hover:scale-110 transition-transform"><Icon size={20} /></div>
                           <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase">{step.title}</h4>
                         </div>
                         <p className="text-slate-600 font-medium leading-relaxed text-sm">{step.description}</p>
                       </div>
                    </div>
                  );
                })}
              </div>
           </section>

           <section>
              <SectionHeader title="Digital Downloads" subtitle="Essential guides and templates for this cycle." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {data.resources.map((res, i) => (
                   <ResourceCard key={i} {...res} onClick={() => onOpenResource?.(res.id || '')} />
                 ))}
              </div>
           </section>
        </div>

        <div className="lg:col-span-4">
           <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-[40px] shadow-2xl sticky top-8 border border-white/10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 border-b border-white/10 pb-6 uppercase tracking-tight">
                <Box size={28} /> Materials Box
              </h3>
              <ul className="space-y-5">
                {data.materials.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5 shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span className="text-base font-bold tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>
    );
  }

  if (stage === DesignStage.THYNK_IT) {
    const data = cycle.thynk;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 font-['Montserrat'] pb-24">
        <div className="lg:col-span-8 space-y-12">
           <section>
              <SectionHeader title="Core Concepts" subtitle="Foundational knowledge for this cycle." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.concepts.map((concept, i) => <ConceptCard key={i} {...concept} />)}
              </div>
           </section>

           <section>
              <SectionHeader title="Deeper Thinking" subtitle="How this project connects to the bigger world." />
              <DeepDiveSection deepDive={data.deepDive} />
           </section>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl sticky top-8 max-h-[85vh] overflow-y-auto scrollbar-hide">
             <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
               <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center"><Zap size={20} /></div>
               <div className="flex flex-col">
                  <h3 className="text-xl font-black uppercase tracking-tight leading-tight">Checkpoint</h3>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Complete the Mission Quiz</span>
               </div>
             </div>
             <div className="space-y-10">
               {data.quiz.map((q, idx) => (
                 <div key={q.id}>
                   <p className="font-black text-slate-800 text-base mb-4 tracking-tight leading-tight">{idx + 1}. {q.question}</p>
                   <div className="space-y-3 pl-2">
                     {q.options.map((opt, optIdx) => {
                       const isSelected = projectState.quizAnswers[q.id] === optIdx;
                       const isAnswered = projectState.quizAnswers[q.id] !== undefined;
                       const isCorrect = optIdx === q.answer;
                       return (
                         <button 
                           key={optIdx} 
                           disabled={isAnswered} 
                           onClick={() => setProjectState({...projectState, quizAnswers: {...projectState.quizAnswers, [q.id]: optIdx}, quizScore: optIdx === q.answer ? projectState.quizScore + 1 : projectState.quizScore})}
                           className={`w-full text-left p-4 rounded-2xl border-2 text-sm font-bold transition-all ${
                             isAnswered 
                               ? (isSelected ? (isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-red-50 border-red-500 text-red-700') : (isCorrect ? 'border-emerald-500 border-dashed text-emerald-600' : 'opacity-30 border-slate-100')) 
                               : 'bg-slate-50 border-slate-50 hover:border-indigo-200 hover:bg-white hover:shadow-md'
                           }`}
                         >
                           {opt}
                         </button>
                       );
                     })}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === DesignStage.TWEAK_IT) {
    const data = cycle.tweak;
    const totalSelectedCount = projectState.selectedTweaks.length + (projectState.customTweak.trim() ? 1 : 0);
    const canSelectMore = totalSelectedCount < 3;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 font-['Montserrat'] pb-24 max-w-7xl mx-auto">
        <div className="lg:col-span-8 space-y-10">
          <SectionHeader title="Creative Upgrades" subtitle={data.intro} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.options.map((opt) => {
              const Icon = IconMap[opt.icon] || Settings;
              const isSelected = projectState.selectedTweaks.includes(opt.id);
              const isDisabled = !isSelected && !canSelectMore;

              return (
                <button 
                  key={opt.id} 
                  disabled={isDisabled}
                  onClick={() => {
                    if (isSelected) {
                      setProjectState({...projectState, selectedTweaks: projectState.selectedTweaks.filter(id => id !== opt.id)});
                    } else if (canSelectMore) {
                      setProjectState({...projectState, selectedTweaks: [...projectState.selectedTweaks, opt.id]});
                    }
                  }}
                  className={`p-6 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group flex flex-col ${
                    isSelected ? 'border-indigo-600 bg-white shadow-xl scale-[1.02]' : isDisabled ? 'opacity-40 grayscale cursor-not-allowed border-slate-100 bg-slate-50' : 'border-slate-100 bg-white hover:border-indigo-200 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center mb-5 transition-all shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h4 className="font-black text-lg mb-1 uppercase tracking-tight text-slate-900 leading-tight">{opt.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{opt.description}</p>
                  {isSelected && <div className="absolute top-4 right-4 text-indigo-600 animate-in zoom-in"><CheckCircle2 size={20} /></div>}
                </button>
              );
            })}
          </div>
          
          <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><PenTool size={120} /></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight">Bespoke Tweak</h3>
                  {projectState.customTweak.trim() && (
                     <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-in zoom-in">Slot Used</span>
                  )}
                </div>
                <p className="text-indigo-200/80 mb-6 font-medium text-sm">Have a unique idea? Write it here. This uses 1 of your 3 design slots.</p>
                <textarea 
                  className="w-full h-40 bg-white/5 border-2 border-white/10 rounded-3xl p-6 text-base font-medium text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all resize-none shadow-inner" 
                  placeholder="Describe your bespoke design tweak here..."
                  value={projectState.customTweak}
                  onChange={(e) => {
                    const val = e.target.value;
                    const hadCustom = projectState.customTweak.trim().length > 0;
                    const hasCustom = val.trim().length > 0;
                    if (!hasCustom || hadCustom || canSelectMore) {
                      setProjectState({...projectState, customTweak: val});
                    }
                  }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-4">
           <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl sticky top-8">
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                 <div>
                   <h3 className="text-xl font-black uppercase tracking-tight">Mission Plan</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3 Slots Available</p>
                 </div>
                 <div className="flex items-center gap-2">
                    {[1, 2, 3].map(slot => {
                       const isUsed = slot <= totalSelectedCount;
                       return <div key={slot} className={`w-3 h-3 rounded-full ${isUsed ? 'bg-indigo-600' : 'bg-slate-100 border border-slate-200'}`} />;
                    })}
                 </div>
              </div>

              <div className="space-y-4">
                {projectState.selectedTweaks.length === 0 && !projectState.customTweak.trim() && (
                  <div className="py-10 text-center opacity-30">
                    <Lightbulb className="mx-auto mb-2" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest">Plan is empty</p>
                  </div>
                )}
                {projectState.selectedTweaks.map(tid => {
                   const opt = data.options.find(o => o.id === tid);
                   if (!opt) return null;
                   const Icon = IconMap[opt.icon] || Settings;
                   return (
                     <div key={tid} className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 animate-in slide-in-from-right-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                           <Icon size={16} />
                        </div>
                        <p className="font-bold text-indigo-900 text-sm">{opt.title}</p>
                     </div>
                   );
                })}
                {projectState.customTweak.trim() && (
                   <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 animate-in slide-in-from-right-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                         <PenTool size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-emerald-900 text-sm mb-1">Bespoke Tweak</p>
                        <p className="text-[10px] text-emerald-700 italic font-medium leading-tight">"{projectState.customTweak}"</p>
                      </div>
                   </div>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                 <p className="text-[10px] text-slate-400 font-bold uppercase text-center leading-relaxed">
                   Your selections will be automatically<br/>included in the Lab Report.
                 </p>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (stage === DesignStage.TEST_IT) {
    const data = cycle.test;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 font-['Montserrat']">
        <div className="lg:col-span-7 space-y-10">
           <SectionHeader title="Testing Grounds" subtitle={data.intro} />
           <div className="grid grid-cols-1 gap-4">
              {data.methods.map((method, i) => {
                const Icon = IconMap[method.icon] || HelpCircle;
                return (
                  <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                     <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 shadow-inner"><Icon size={26} /></div>
                     <div><h4 className="font-black text-slate-900 text-lg uppercase tracking-tight leading-none mb-1">{method.title}</h4><p className="text-sm text-slate-600 font-medium leading-tight">{method.description}</p></div>
                  </div>
                );
              })}
           </div>
           
           <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex flex-col items-center gap-8">
              {projectState.cameraImage ? (
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img src={projectState.cameraImage} className="w-full h-full object-cover" />
                  <button onClick={() => setProjectState({...projectState, cameraImage: undefined})} className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-2xl shadow-lg hover:bg-red-600 transition-all"><RefreshCw size={20} /></button>
                </div>
              ) : (
                <div className="w-full aspect-video border-4 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-slate-300 gap-4 group hover:border-indigo-300 transition-all">
                  <Camera size={64} className="group-hover:scale-105 transition-transform" /><p className="font-black uppercase tracking-widest text-xs">Capture Mission Evidence</p>
                </div>
              )}
              <SafeCamera onCapture={(img) => setProjectState({...projectState, cameraImage: img})} />
           </div>
        </div>
        
        <div className="lg:col-span-5">
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl sticky top-8">
             <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
               <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center"><FileText size={20} /></div>
               <h3 className="text-xl font-black uppercase tracking-tight leading-tight">Final Lab Report</h3>
             </div>
             <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Testing Reflection</label>
                  <textarea className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 text-base font-medium text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none shadow-inner" placeholder="What happened during your tests? Did the vehicle perform as expected?" value={projectState.testReflection} onChange={(e) => setProjectState({...projectState, testReflection: e.target.value})} />
                </div>
                <button onClick={handleExportFinalReport} disabled={isExporting} className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50">{isExporting ? <Loader2 className="animate-spin" /> : <Download size={18} />} Export Mission Bundle</button>
                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                   Bundled PNG Report includes:<br/>
                   Objective, Quiz Score, Mission Plan & Reflection
                </p>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest tracking-[0.2em]">Calibrating Workbench...</p>
    </div>
  );
};

export default StageContent;
