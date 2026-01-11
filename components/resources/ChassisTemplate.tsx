import React from 'react';
import { X, Printer, Scissors } from 'lucide-react';

export const ChassisTemplate: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-[210mm] shadow-2xl mx-auto flex flex-col font-['Montserrat'] overflow-hidden">
        
        {/* Screen-only Controls */}
        <div className="absolute top-4 right-4 print:hidden flex gap-2 z-10">
             <button 
               onClick={() => window.print()} 
               className="bg-cyan-500 hover:bg-cyan-600 text-white p-2.5 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/30"
             >
               <Printer size={16}/> Print
             </button>
             <button 
               onClick={onClose} 
               className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-lg transition-colors"
             >
               <X size={16}/>
             </button>
        </div>

        {/* PDF Page Content (A4 Aspect Ratio) */}
        <div className="aspect-[1/1.414] w-full flex flex-col p-[15mm] md:p-[20mm] relative bg-white">
           
           {/* Header / Branding */}
           <div className="flex flex-col items-start mb-12 border-b-2 border-slate-100 pb-6">
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight leading-none mb-1">THYNKLAB</h1>
              <p className="text-[10px] font-medium tracking-[0.2em] text-[#64748B]">WHERE FUTURE SKILLS BEGIN</p>
           </div>

           {/* Title Section */}
           <div className="mb-10">
             <h2 className="text-3xl font-bold text-[#7C3AED] mb-3">Chassis Template A</h2>
             <div className="h-1.5 w-20 bg-cyan-400 rounded-full"></div>
           </div>

           {/* Instructions Card */}
           <div className="bg-slate-50 rounded-2xl p-8 mb-12 border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <Scissors size={16} className="text-[#64748B]" />
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#64748B]">Construction Guide</h3>
              </div>
              <ul className="space-y-3">
                 {[
                   "Print this page on A4 paper (Scale: 100%).",
                   "Cut out the template along the dashed lines.",
                   "Trace the shape onto your corrugated cardboard.",
                   "Carefully cut the cardboard using safety scissors."
                 ].map((text, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 shrink-0"/>
                      <span>{text}</span>
                   </li>
                 ))}
              </ul>
           </div>

           {/* Schematic Diagram */}
           <div className="flex-1 flex flex-col items-center justify-center relative">
               <div className="absolute top-0 right-0 bg-slate-100 text-[#64748B] text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                 Not to scale
               </div>
               
               {/* Drawing */}
               <svg viewBox="0 0 300 450" className="w-[60%] drop-shadow-sm">
                  <defs>
                    <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="10" style={{stroke:'#F1F5F9', strokeWidth:2}} />
                    </pattern>
                  </defs>

                  {/* Paper Background area for context */}
                  <rect x="0" y="0" width="300" height="450" fill="none" />

                  {/* Dashed Cut Line */}
                  <rect x="30" y="10" width="240" height="400" fill="url(#diagonalHatch)" stroke="#0F172A" strokeWidth="2" strokeDasharray="8 6" />
                  
                  {/* Corners Markers */}
                  <path d="M30 30 L30 10 L50 10" stroke="#0F172A" strokeWidth="2" fill="none"/>
                  <path d="M250 10 L270 10 L270 30" stroke="#0F172A" strokeWidth="2" fill="none"/>
                  <path d="M30 380 L30 410 L50 410" stroke="#0F172A" strokeWidth="2" fill="none"/>
                  <path d="M250 410 L270 410 L270 380" stroke="#0F172A" strokeWidth="2" fill="none"/>

                  {/* Labels */}
                  <text x="150" y="40" textAnchor="middle" fontSize="12" fontWeight="800" fill="#94A3B8" letterSpacing="2">FRONT</text>
                  <text x="150" y="380" textAnchor="middle" fontSize="12" fontWeight="800" fill="#94A3B8" letterSpacing="2">BACK</text>
                  
                  {/* Center Text */}
                  <text x="150" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#CBD5E1" letterSpacing="4" transform="rotate(-90 150 210)">
                    CARDBOARD CHASSIS
                  </text>
               </svg>
           </div>
           
           {/* Footer */}
           <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center text-[9px] font-semibold tracking-wide text-slate-400 uppercase">
              <span>© 2024 ThynkLab Education</span>
              <span>Unit: Wheels & Axles</span>
           </div>
        </div>
      </div>
    </div>
  );
};