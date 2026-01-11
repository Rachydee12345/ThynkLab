
import React, { useState, useEffect, useRef } from 'react';
import { DesignStage, ProjectState, INITIAL_PROJECT_STATE, InfractionLog } from './types';
import { blueprint, BlueprintCycle } from './blueprint';
import StageContent from './components/StageContent';
import AICoachWrapper from './components/features/AICoach';
import DevTools from './components/dev/DevTools';
import ThynkLogo from './components/ui/ThynkLogo';
import ChassisTemplatePage from './components/resources/ChassisTemplatePage';
import AxleAssemblyGuidePage from './components/resources/AxleAssemblyGuidePage';
import MountingInstructionsPage from './components/resources/MountingInstructionsPage';
import SampleLogicGuidePage from './components/resources/SampleLogicGuidePage';
import MissionScoringSheetPage from './components/resources/MissionScoringSheetPage';
import RouteMapPage from './components/resources/RouteMapPage';
import TeacherSupportPage from './components/resources/TeacherSupportPage';
import JSZip from 'https://esm.sh/jszip';
import { drawTeacherSupportPage } from './utils/teacherSupportCanvas';
import { 
  ChevronRight, Triangle, Menu, Truck, Zap, Code, Link, Trophy, 
  Share2, Link as LinkIcon, Check, FileText, Lock, GraduationCap,
  Settings, Rocket, FlaskConical, Lightbulb, Box, Download, Loader2,
  ShieldAlert, X, AlertOctagon, Bell, History, ShieldX, UserX, Clock,
  LayoutDashboard, Search, Filter, AlertTriangle, Globe, Users, Play, Shield,
  Key, ShieldCheck, ArrowRight
} from 'lucide-react';

const stages = Object.values(DesignStage);

type ViewState = 
  | 'LOGIN'
  | 'WORKBENCH' 
  | 'CHASSIS_TEMPLATE' 
  | 'AXLE_GUIDE'
  | 'COUPLING_INSTRUCTIONS' 
  | 'SAMPLE_LOGIC_GUIDE' 
  | 'LOGIC_GUIDE_1' 
  | 'LOGIC_GUIDE_2' 
  | 'MISSION_SCORING_SHEET'
  | 'ROUTE_MAP'
  | 'TEACHER_SUPPORT'
  | 'SAFETY_CENTER';

const IconMap: Record<string, any> = {
  Truck, Zap, Code, Trophy, Settings, Rocket, FlaskConical, Lightbulb, Box
};

const DEMO_PASSWORD = "THYNK-DEMO-2026";

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LOGIN');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [selectedCycle, setSelectedCycle] = useState<BlueprintCycle | null>(null);
  const [currentStage, setCurrentStage] = useState<DesignStage>(DesignStage.MAKE_IT);
  const [projectState, setProjectState] = useState<ProjectState>(INITIAL_PROJECT_STATE);
  const [isCoachMinimized, setIsCoachMinimized] = useState(false);
  const [copiedCycleId, setCopiedCycleId] = useState<string | null>(null);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [isZippingSupport, setIsZippingSupport] = useState(false);
  const [activeBreach, setActiveBreach] = useState<InfractionLog | null>(null);
  const [allBreaches, setAllBreaches] = useState<InfractionLog[]>([]);
  const [activeRoomCode, setActiveRoomCode] = useState<string | null>(new URLSearchParams(window.location.search).get('room'));

  const safetyChannel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    safetyChannel.current = new BroadcastChannel('thynklab_safety_alerts');
    
    safetyChannel.current.onmessage = (event) => {
      if (event.data.type === 'SAFETY_BREACH') {
        const breach: InfractionLog = event.data.data;
        if (!activeRoomCode || breach.sessionId === activeRoomCode || breach.sessionId === 'Local Session') {
          setActiveBreach(breach);
          setAllBreaches(prev => [breach, ...prev]);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsTeacherMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      safetyChannel.current?.close();
    };
  }, [activeRoomCode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPass.toUpperCase() === DEMO_PASSWORD) {
      setView('WORKBENCH');
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleStartSession = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setActiveRoomCode(code);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('room', code);
    window.history.pushState({}, '', newUrl);
  };

  const handleCopyClassroomLink = () => {
    const url = new URL(window.location.href);
    if (activeRoomCode) url.searchParams.set('room', activeRoomCode);
    navigator.clipboard.writeText(url.toString());
    alert("Classroom link copied! Share this link with your students.");
  };

  const handleShareToClassroom = (e: React.MouseEvent, cycleTitle: string) => {
    e.stopPropagation();
    const url = new URL(window.location.href);
    if (activeRoomCode) url.searchParams.set('room', activeRoomCode);
    const shareUrl = `https://classroom.google.com/u/0/share?url=${encodeURIComponent(url.toString())}&title=${encodeURIComponent(`Digital Makerspace: ${cycleTitle}`)}`;
    window.open(shareUrl, '_blank');
  };

  const handleCopyLink = (e: React.MouseEvent, cycleId: string) => {
    e.stopPropagation();
    const url = new URL(window.location.href);
    if (activeRoomCode) url.searchParams.set('room', activeRoomCode);
    navigator.clipboard.writeText(url.toString());
    setCopiedCycleId(cycleId);
    setTimeout(() => setCopiedCycleId(null), 2000);
  };

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

  const drawLogoOnCanvas = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, colorMode: 'gradient' | 'white' = 'gradient') => {
    const scale = size / 32;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    if (colorMode === 'white') {
      ctx.strokeStyle = '#FFFFFF';
    } else {
      const grad = ctx.createLinearGradient(4, 4, 28, 28);
      grad.addColorStop(0, '#7C3AED');
      grad.addColorStop(0.55, '#EC4899');
      grad.addColorStop(0.80, '#F97316');
      grad.addColorStop(1, '#FACC15');
      ctx.strokeStyle = grad;
    }
    
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

  const handleDownloadInfractionReport = (log: InfractionLog) => {
    const canvas = document.createElement('canvas');
    const width = 1240;
    const height = 1754;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    const margin = 100;

    // Red Header Bar
    ctx.fillStyle = '#450a0a';
    ctx.fillRect(0, 0, width, 250);

    // Official Logo Branding
    drawLogoOnCanvas(ctx, margin, 70, 48, 'gradient');
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px Montserrat, sans-serif';
    ctx.fillText('THYNKLAB', margin + 65, 115);

    // Report Title
    ctx.font = '900 32px Montserrat, sans-serif';
    ctx.fillText('SAFEGUARDING INCIDENT REPORT', margin, 185);
    
    ctx.font = '700 18px Montserrat, sans-serif';
    ctx.fillStyle = '#f87171';
    ctx.fillText('OFFICIAL DIGITAL PAPER TRAIL • CONFIDENTIAL', margin, 215);

    // School Info Top Right
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 24px Montserrat, sans-serif';
    ctx.fillText(log.schoolName.toUpperCase(), width - margin, 105);
    ctx.font = '500 14px Montserrat, sans-serif';
    ctx.fillText('THYNKLAB SECURE ASSISTANT', width - margin, 130);
    ctx.textAlign = 'left';

    let y = 350;

    // Report Section: Metadata
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(margin, y, width - margin * 2, 220);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, y, width - margin * 2, 220);

    ctx.fillStyle = '#64748b';
    ctx.font = '900 14px Montserrat, sans-serif';
    ctx.fillText('INCIDENT DETAILS', margin + 40, y + 50);

    ctx.fillStyle = '#0f172a';
    ctx.font = '800 24px Montserrat, sans-serif';
    ctx.fillText(`Timestamp: ${log.timestamp}`, margin + 40, y + 100);
    ctx.fillText(`Mission Phase: ${log.stage}`, margin + 40, y + 150);
    ctx.fillText(`Classroom Hub ID: ${log.sessionId || 'Local Session'}`, margin + 40, y + 200);

    y += 300;

    // Report Section: Student Message
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 14px Montserrat, sans-serif';
    ctx.fillText('BLOCKED STUDENT MESSAGE', margin, y);
    y += 40;

    ctx.fillStyle = '#f1f5f9';
    const msgBoxHeight = 300;
    ctx.fillRect(margin, y, width - margin * 2, msgBoxHeight);
    
    ctx.fillStyle = '#334155';
    ctx.font = 'italic 700 28px Montserrat, sans-serif';
    const lines = wrapText(ctx, `"${log.message}"`, width - margin * 3);
    lines.forEach((line, i) => {
      ctx.fillText(line, margin + 40, y + 80 + (i * 45));
    });

    y += msgBoxHeight + 80;

    // Report Section: AI Analysis
    ctx.fillStyle = '#ef4444';
    ctx.font = '900 14px Montserrat, sans-serif';
    ctx.fillText('AI SAFETY ANALYSIS & REASONING', margin, y);
    y += 40;

    ctx.fillStyle = '#fef2f2';
    ctx.fillRect(margin, y, width - margin * 2, 200);
    ctx.strokeStyle = '#fee2e2';
    ctx.strokeRect(margin, y, width - margin * 2, 200);

    ctx.fillStyle = '#991b1b';
    ctx.font = '800 24px Montserrat, sans-serif';
    const reasonLines = wrapText(ctx, log.reason, width - margin * 3);
    reasonLines.forEach((line, i) => {
      ctx.fillText(line, margin + 40, y + 80 + (i * 40));
    });

    // Footer Watermark
    ctx.save();
    ctx.translate(width / 2, height / 2 + 300);
    ctx.rotate(-Math.PI / 10);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.05)';
    ctx.font = '900 120px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CONFIDENTIAL RECORD', 0, 0);
    ctx.restore();

    // Bottom Footer
    ctx.fillStyle = '#94a3b8';
    ctx.font = '800 14px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`THYNKLAB SAFEGUARDING COMMAND • GENERATED BY GEMINI-3-FLASH-PREVIEW • 2026 ©`, width / 2, height - 80);

    // Download
    const link = document.createElement('a');
    link.download = `Safeguarding_Report_${log.timestamp.replace(/[: ]/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadAllTeacherSupport = async () => {
    if (isZippingSupport) return;
    setIsZippingSupport(true);
    try {
      const zip = new JSZip();
      for (const cycle of blueprint.cycles) {
        const cycleFolder = zip.folder(`Cycle_${cycle.id}`);
        if (!cycleFolder) continue;
        for (let p = 1; p <= 4; p++) {
          const canvas = drawTeacherSupportPage(cycle, p);
          const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
          if (blob) cycleFolder.file(`Page_${p}.png`, blob);
        }
      }
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.download = `ThynkLab_Teacher_Unit_Pack_${blueprint.unit.id}.zip`;
      link.href = URL.createObjectURL(content);
      link.click();
    } catch (err) { console.error(err); } finally { setIsZippingSupport(false); }
  };

  // --- LOGIN VIEW ---
  if (view === 'LOGIN') {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white font-['Montserrat'] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-md w-full relative z-10 text-center space-y-10 animate-in fade-in zoom-in-95 duration-700">
           <div className="flex flex-col items-center">
             <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center border border-white/10 mb-6 backdrop-blur-md shadow-2xl">
               <ThynkLogo />
             </div>
             <h1 className="text-sm font-black uppercase tracking-[0.5em] text-indigo-400 mb-2">ThynkLab</h1>
             <h2 className="text-4xl font-black uppercase tracking-tight">Demo Access<span className="text-purple-500">.</span></h2>
             <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-4 leading-relaxed">Please enter your authorized preview code to explore the curriculum engine.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative group">
                 <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors">
                    <Key size={20} />
                 </div>
                 <input 
                   type="password" 
                   value={loginPass}
                   onChange={(e) => setLoginPass(e.target.value)}
                   placeholder="Enter Preview Code..."
                   className={`w-full bg-white/5 border-2 rounded-[24px] py-5 pl-16 pr-6 font-black tracking-[0.3em] outline-none transition-all text-center ${loginError ? 'border-red-500 animate-shake' : 'border-white/10 focus:border-purple-600 focus:bg-white/10'}`}
                 />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-900/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                Start Preview Session <ArrowRight size={18} />
              </button>
           </form>

           <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                 <ShieldCheck size={14} className="text-emerald-500" /> Secure ThynkLab Protocol
              </div>
           </div>
        </div>
        <style>{`
          @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
          .animate-shake { animation: shake 0.4s ease-in-out; }
        `}</style>
      </div>
    );
  }

  // --- SAFETY BREACH TOAST ---
  const SafetyBreachToast = () => {
    if (!activeBreach || !isTeacherMode || view === 'SAFETY_CENTER') return null;
    return (
      <div className="fixed bottom-6 right-6 z-[100] w-96 bg-[#450a0a] border-2 border-red-500 rounded-[32px] p-6 text-white shadow-2xl shadow-red-950/40 animate-in slide-in-from-right-10 duration-500 ring-4 ring-red-500/20">
         <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center animate-pulse"><AlertOctagon size={20} /></div>
               <div>
                 <h4 className="font-black uppercase tracking-tight text-red-100">Safeguarding Breach</h4>
                 <p className="text-[10px] font-black tracking-widest text-red-400 uppercase">Immediate Action Required</p>
               </div>
            </div>
            <button onClick={() => setActiveBreach(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X size={18} /></button>
         </div>
         <div className="space-y-4 bg-black/30 rounded-2xl p-4 border border-white/5">
            <div className="flex items-baseline gap-2">
               <span className="text-[9px] font-black text-red-500 uppercase tracking-widest shrink-0">Phase:</span>
               <span className="text-xs font-bold text-red-100">{activeBreach.stage}</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Reason:</span>
               <p className="text-xs font-bold italic text-red-100/90 leading-tight">"{activeBreach.reason}"</p>
            </div>
         </div>
         <div className="mt-6 flex items-center gap-3">
            <button 
              onClick={() => { setView('SAFETY_CENTER'); setActiveBreach(null); }} 
              className="flex-1 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
            >
              Open Safety Center
            </button>
            <button 
              onClick={() => setActiveBreach(null)} 
              className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-950 transition-all active:scale-95"
            >
              Dismiss
            </button>
         </div>
      </div>
    );
  };

  // --- SAFETY CENTER VIEW ---
  const SafetyCenterView = () => (
    <div className="flex-1 bg-slate-50 overflow-y-auto p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-end">
           <div>
             <div className="flex items-center gap-2 mb-2">
               <ShieldAlert className="text-red-500" size={24} />
               <h1 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Safeguarding Command</h1>
             </div>
             <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tight">Safety Center<span className="text-red-500">.</span></h2>
           </div>
           <div className="flex items-center gap-3">
              <div className="bg-red-100 text-red-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={18} /> {allBreaches.length} Live Incidents
              </div>
              <button onClick={() => setView('WORKBENCH')} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">Close Dashboard</button>
           </div>
        </header>

        {allBreaches.length === 0 ? (
          <div className="bg-white rounded-[40px] p-24 border-2 border-dashed border-slate-200 text-center space-y-4">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Check size={40} />
             </div>
             <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No Active Safeguarding Concerns</h3>
             <p className="text-slate-400 font-medium max-w-sm mx-auto">All student AI interactions are within safe parameters for {blueprint.security.schoolName}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {allBreaches.map((log, idx) => (
              <div key={idx} className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:border-red-200 transition-all group flex flex-col md:flex-row gap-8 items-start">
                 <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <ShieldX size={28} />
                 </div>
                 <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                       <div>
                         <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">Incident Report #{allBreaches.length - idx}</h4>
                         <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Clock size={12} /> {log.timestamp}</span>
                            <span className="flex items-center gap-1.5"><LayoutDashboard size={12} /> Phase: {log.stage}</span>
                            <span className="flex items-center gap-1.5 text-indigo-500"><Users size={12} /> Room: {log.sessionId}</span>
                         </div>
                       </div>
                       <div className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">High Priority</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><UserX size={12} /> Blocked Student Message</p>
                          <p className="text-sm font-bold text-slate-700 italic">"{log.message}"</p>
                       </div>
                       <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                          <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2"><AlertTriangle size={12} /> AI Safety Analysis</p>
                          <p className="text-sm font-bold text-red-900">{log.reason}</p>
                       </div>
                    </div>
                 </div>
                 <div className="flex flex-col gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => handleDownloadInfractionReport(log)}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      <Download size={14} /> Download Report
                    </button>
                    <button onClick={() => setAllBreaches(prev => prev.filter((_, i) => i !== idx))} className="bg-slate-100 text-slate-500 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all">Dismiss Incident</button>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!selectedCycle && view === 'WORKBENCH') {
    return (
      <div className={`min-h-screen bg-[#1a0b2e] text-white font-['Montserrat'] flex flex-col items-center p-6 relative overflow-y-auto scrollbar-hide transition-all duration-500 ${isTeacherMode ? 'ring-inset ring-[12px] ring-purple-500/30' : ''}`}>
        <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
        
        {isTeacherMode && (
          <div className="fixed top-6 right-6 z-50 animate-in fade-in zoom-in duration-300 flex items-center gap-3">
             <button 
              onClick={() => setView('SAFETY_CENTER')}
              className={`bg-slate-900/80 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl border border-white/10 backdrop-blur-md flex items-center gap-2 transition-all active:scale-95 ${allBreaches.length > 0 ? 'ring-2 ring-red-500 animate-pulse' : ''}`}
            >
              <ShieldAlert size={16} className={allBreaches.length > 0 ? 'text-red-500' : ''} />
              Safety Command {allBreaches.length > 0 && `(${allBreaches.length})`}
            </button>
            <button 
              onClick={handleDownloadAllTeacherSupport}
              disabled={isZippingSupport}
              className="bg-slate-900/80 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl border border-white/10 backdrop-blur-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isZippingSupport ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              Unit Pack
            </button>
            <div className="bg-purple-600 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl shadow-purple-900/40 flex items-center gap-2 border border-purple-400/30 backdrop-blur-md">
              <GraduationCap size={18} className="animate-bounce" />
              Teacher Mode
            </div>
          </div>
        )}

        <div className="relative z-10 max-w-5xl w-full pt-12 pb-24">
           {isTeacherMode && (
              <div className="mb-12 bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-md animate-in slide-in-from-top-4 duration-500 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white"><Users size={24} /></div>
                     <div>
                        <h3 className="font-black uppercase tracking-tight text-white">Classroom Hub</h3>
                        <p className="text-xs text-indigo-300 font-bold uppercase tracking-widest">Connect your entire class for live safety monitoring.</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     {activeRoomCode ? (
                        <div className="flex items-center gap-3 bg-indigo-900/40 p-2 rounded-2xl border border-indigo-500/30 pl-6 pr-2">
                           <div>
                              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-0.5">Live Room Code</span>
                              <span className="text-xl font-black text-white tracking-[0.2em]">{activeRoomCode}</span>
                           </div>
                           <button onClick={handleCopyClassroomLink} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-950 transition-all flex items-center gap-2">
                              <LinkIcon size={14} /> Copy Class Link
                           </button>
                        </div>
                     ) : (
                        <button onClick={handleStartSession} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-950 transition-all active:scale-95 flex items-center gap-3">
                           <Play size={16} fill="currentColor" /> Start Live Monitoring
                        </button>
                     )}
                  </div>
              </div>
           )}

           <div className="flex flex-col items-center justify-center mb-10">
              <ThynkLogo />
              <div className="text-center mt-4">
                <div className="font-black text-[11px] tracking-[0.5em] text-indigo-400 uppercase mb-1">ThynkLab</div>
                <div className="font-bold tracking-[0.3em] text-sm uppercase opacity-80">Digital Makerspace</div>
              </div>
           </div>

           <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white uppercase leading-tight">Year {blueprint.unit.yearGroup} – {blueprint.unit.title}</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
           </div>

           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <LinkIcon size={120} className="text-white transform rotate-45" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                   <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg shadow-purple-900/40">
                      ThynkLink
                   </div>
                   <h2 className="text-xl font-bold text-white uppercase tracking-tight">Why does this matter?</h2>
                </div>
                <div className="max-w-3xl">
                  <p className="text-indigo-100/90 leading-relaxed text-lg font-medium">
                    {blueprint.unit.thynkLink.context}
                  </p>
                  <div className="h-px w-16 bg-white/20 my-4"></div>
                  <p className="text-indigo-200 leading-relaxed">
                    {blueprint.unit.thynkLink.mission}
                  </p>
                </div>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blueprint.cycles.map((cycle, index) => {
                const Icon = IconMap[cycle.theme] || Box;
                const isUnlocked = index === 1; // Only Cycle 2 (Powered Movement) is unlocked in demo

                return (
                  <div
                    key={cycle.id}
                    className={`group flex flex-col bg-slate-900/40 backdrop-blur-md border rounded-[32px] transition-all duration-300 transform h-full relative overflow-hidden ${
                      isUnlocked 
                        ? 'border-white/5 hover:bg-slate-800/60 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-900/20 hover:-translate-y-1' 
                        : 'border-white/5 opacity-60 grayscale cursor-not-allowed'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                         <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 shadow-2xl">
                            <Lock size={20} />
                         </div>
                         <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-300">Preview Locked</p>
                      </div>
                    )}

                    <div 
                      onClick={() => isUnlocked && setSelectedCycle(cycle)}
                      className={`p-8 pb-4 flex-grow flex flex-col ${isUnlocked ? 'cursor-pointer' : ''}`}
                    >
                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 shrink-0 ${
                        isUnlocked ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-900/30 group-hover:scale-110' : 'bg-slate-800 text-slate-500 shadow-none'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight uppercase tracking-tight">{cycle.title}</h3>
                      <div className={`h-1 w-12 rounded-full mb-4 transition-all duration-500 shrink-0 ${
                        isUnlocked ? 'bg-indigo-500/50 group-hover:w-full' : 'bg-slate-700'
                      }`} />
                      <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest opacity-70 mt-auto pt-4">{cycle.theme}</p>
                    </div>
                    
                    {isTeacherMode && isUnlocked && (
                      <div className="p-4 pt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex flex-col space-y-3 shadow-inner">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-indigo-400 tracking-widest uppercase">Teacher Zone</span>
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSelectedCycle(cycle); setView('TEACHER_SUPPORT'); }}
                                className="p-2.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 transition-colors border border-yellow-500/20"
                                title="Teacher Support Guide"
                              >
                                <FileText size={14} />
                              </button>
                              <button 
                                onClick={(e) => handleShareToClassroom(e, cycle.title)}
                                className="p-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors border border-emerald-500/20"
                                title="Share to Google Classroom"
                              >
                                <Share2 size={14} />
                              </button>
                              <button 
                                onClick={(e) => handleCopyLink(e, cycle.id)}
                                className="p-2.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 transition-colors relative border border-indigo-500/20"
                                title="Copy Student Link"
                              >
                                {copiedCycleId === cycle.id ? <Check size={14} className="text-green-400" /> : <LinkIcon size={14} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
           </div>

           <div className="mt-24 flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-all duration-300">
              <button 
                onClick={() => setIsTeacherMode(!isTeacherMode)}
                className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest py-3 px-6 rounded-full border transition-all shadow-lg ${
                  isTeacherMode 
                    ? 'bg-purple-600 border-purple-400 text-white shadow-purple-900/20' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-indigo-400 hover:bg-white/10'
                }`}
              >
                {isTeacherMode ? <Lock size={14} /> : <GraduationCap size={16} />}
                {isTeacherMode ? "Exit Teacher View" : "Enter Teacher Access"}
              </button>
           </div>
        </div>
        <SafetyBreachToast />
        <DevTools />
      </div>
    );
  }

  const handleNextStage = () => {
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
    }
  };

  return (
    <div className={`flex h-screen w-full bg-slate-50 font-['Montserrat'] overflow-hidden transition-all duration-500 ${isTeacherMode ? 'ring-inset ring-[6px] ring-purple-500/20' : ''}`}>
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20 hidden md:flex border-r border-slate-800 shrink-0">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 mb-10 cursor-pointer group" onClick={() => {
            setSelectedCycle(null);
            setView('WORKBENCH');
          }}>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
               <ThynkLogo />
            </div>
            <div>
              <div className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">ThynkLab</div>
              <h1 className="font-bold text-xl leading-none tracking-wider uppercase text-white">Makerspace</h1>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-1 group-hover:text-indigo-400 transition-colors">Back to Menu</p>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pl-3">Design Cycle</div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {stages.map((stage, idx) => {
            const isActive = currentStage === stage;
            return (
              <button
                key={stage}
                onClick={() => {
                   setCurrentStage(stage);
                   setView('WORKBENCH');
                }}
                className={`w-full flex items-center justify-between p-3 px-4 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-900/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-colors ${
                    isActive ? 'bg-white/20 border-white/20 text-white' : 'border-slate-700 bg-slate-800/50'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-sm font-bold tracking-wide uppercase ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{stage}</span>
                </div>
                {isActive && <Triangle className="w-2 h-2 fill-current rotate-90" />}
              </button>
            );
          })}
        </nav>

        <div className="p-6 space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
             <div className="flex justify-between items-end mb-2">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</h4>
                 <span className="text-xs font-bold text-purple-400">{Math.round(((stages.indexOf(currentStage) + 1) / stages.length) * 100)}%</span>
             </div>
             <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-500" 
                  style={{ width: `${((stages.indexOf(currentStage) + 1) / stages.length) * 100}%` }}
                />
             </div>
          </div>
          <button 
            onClick={() => setIsTeacherMode(!isTeacherMode)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
              isTeacherMode 
                ? 'bg-purple-600/20 border-purple-500/50 text-purple-400' 
                : 'bg-slate-800/30 border-slate-700/30 text-slate-600 hover:text-slate-400'
            }`}
          >
            <GraduationCap size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{isTeacherMode ? "Teacher Mode: ON" : "Teacher Access"}</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center z-20 shadow-md shrink-0">
            <div className="flex items-center gap-2">
                <ThynkLogo />
                <div>
                  <div className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em]">ThynkLab</div>
                  <span className="font-bold tracking-widest text-xs uppercase">Makerspace</span>
                </div>
            </div>
            <button className="text-white">
                <Menu className="w-6 h-6" />
            </button>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
            <div className="flex-1 overflow-y-auto p-0 scrollbar-hide bg-slate-50 relative">
                {view === 'CHASSIS_TEMPLATE' && <ChassisTemplatePage onBack={() => setView('WORKBENCH')} />}
                {view === 'AXLE_GUIDE' && <AxleAssemblyGuidePage onBack={() => setView('WORKBENCH')} />}
                {view === 'COUPLING_INSTRUCTIONS' && <MountingInstructionsPage onBack={() => setView('WORKBENCH')} />}
                {view === 'SAMPLE_LOGIC_GUIDE' && <SampleLogicGuidePage type="GENERAL" onBack={() => setView('WORKBENCH')} />}
                {view === 'LOGIC_GUIDE_1' && <SampleLogicGuidePage type="START_STOP" onBack={() => setView('WORKBENCH')} />}
                {view === 'LOGIC_GUIDE_2' && <SampleLogicGuidePage type="TURNS_MOVES" onBack={() => setView('WORKBENCH')} />}
                {view === 'MISSION_SCORING_SHEET' && <MissionScoringSheetPage onBack={() => setView('WORKBENCH')} />}
                {view === 'ROUTE_MAP' && <RouteMapPage onBack={() => setView('WORKBENCH')} />}
                {view === 'TEACHER_SUPPORT' && selectedCycle && <TeacherSupportPage cycle={selectedCycle} onBack={() => setView('WORKBENCH')} />}
                {view === 'SAFETY_CENTER' && <SafetyCenterView />}
                
                {view === 'WORKBENCH' && selectedCycle && (
                  <div className="p-6 md:p-12 max-w-6xl mx-auto pb-24">
                      {isTeacherMode && (
                        <div className="mb-6 animate-in slide-in-from-top-2 duration-300 flex flex-col gap-3">
                          {activeRoomCode && (
                             <div className="bg-indigo-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-indigo-950/20">
                                <div className="flex items-center gap-3">
                                   <Globe size={18} className="animate-spin-slow" />
                                   <div>
                                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Live Session Active</p>
                                      <p className="text-sm font-black tracking-[0.1em]">Room: {activeRoomCode}</p>
                                   </div>
                                </div>
                                <button onClick={handleCopyClassroomLink} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Copy Hub Link</button>
                             </div>
                          )}
                          {allBreaches.length > 0 && (
                             <div 
                               onClick={() => setView('SAFETY_CENTER')}
                               className="bg-red-600 text-white p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-red-500 transition-all shadow-lg shadow-red-950/20"
                             >
                                <div className="flex items-center gap-3">
                                   <AlertOctagon size={20} className="animate-pulse" />
                                   <p className="text-xs font-black uppercase tracking-widest">Active Safety Concerns: {allBreaches.length}</p>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Open Safety Center</span>
                             </div>
                          )}
                          <div className="bg-purple-600/10 border border-purple-500/20 p-4 rounded-2xl flex items-center justify-between">
                             <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg">
                                 <GraduationCap size={20} />
                               </div>
                               <div>
                                 <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Teacher Support Active</p>
                                 <p className="text-xs text-slate-500 font-medium italic">You are viewing the cycle with educator resources enabled.</p>
                               </div>
                             </div>
                             <button onClick={() => setView('TEACHER_SUPPORT')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Support Guide</button>
                          </div>
                        </div>
                      )}

                      <header className="mb-10">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Year {blueprint.unit.yearGroup}</span>
                               <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{selectedCycle.theme}</span>
                          </div>
                          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 uppercase tracking-tight leading-tight">{currentStage}<span className="text-[#7C3AED]">.</span></h1>
                          <p className="text-slate-500 text-lg font-medium">{selectedCycle.title}</p>
                      </header>

                      <StageContent stage={currentStage} cycle={selectedCycle} projectState={projectState} setProjectState={setProjectState} onOpenResource={(id) => {
                             if (id === 'CHASSIS_TEMPLATE') setView('CHASSIS_TEMPLATE');
                             if (id === 'AXLE_GUIDE') setView('AXLE_GUIDE');
                             if (id === 'COUPLING_INSTRUCTIONS') setView('COUPLING_INSTRUCTIONS');
                             if (id === 'SAMPLE_LOGIC_GUIDE') setView('SAMPLE_LOGIC_GUIDE');
                             if (id === 'LOGIC_GUIDE_1') setView('LOGIC_GUIDE_1');
                             if (id === 'LOGIC_GUIDE_2') setView('LOGIC_GUIDE_2');
                             if (id === 'MISSION_SCORING_SHEET') setView('MISSION_SCORING_SHEET');
                             if (id === 'ROUTE_MAP') setView('ROUTE_MAP');
                      }} />

                      <div className="mt-16 flex justify-end">
                         {currentStage !== DesignStage.TEST_IT && (
                             <button onClick={handleNextStage} className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                               <span className="font-bold uppercase tracking-widest text-sm">Next Phase</span>
                               <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors"><ChevronRight className="w-4 h-4" /></div>
                             </button>
                         )}
                      </div>
                  </div>
                )}
            </div>

            {selectedCycle && view === 'WORKBENCH' && (
              <div className={`hidden lg:flex border-l border-slate-200 bg-white shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-10 shrink-0 transition-all duration-300 ease-in-out ${isCoachMinimized ? 'w-20' : 'w-[420px]'}`}>
                  <div className="w-full h-full overflow-hidden">
                      <AICoachWrapper stage={currentStage} projectState={projectState} setProjectState={setProjectState} minimized={isCoachMinimized} onToggle={() => setIsCoachMinimized(!isCoachMinimized)} />
                  </div>
              </div>
            )}
        </div>
      </main>
      <SafetyBreachToast />
      <DevTools />
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;
