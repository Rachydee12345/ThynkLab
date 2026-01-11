
import React, { useState } from 'react';
import { ArrowLeft, Download, GraduationCap, ChevronLeft, ChevronRight, AlertCircle, ListChecks, Target, Hammer, Lightbulb, Settings2, BookOpen, ClipboardCheck, CheckCircle2, Loader2, FileArchive } from 'lucide-react';
import { BlueprintCycle } from '../../blueprint';
import { drawTeacherSupportPage } from '../../utils/teacherSupportCanvas';
import JSZip from 'https://esm.sh/jszip';

interface Props {
  cycle: BlueprintCycle;
  onBack: () => void;
}

const TeacherSupportPage: React.FC<Props> = ({ onBack, cycle }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isZipping, setIsZipping] = useState(false);
  const data = cycle.teacherSupport;

  const handleDownloadPNG = () => {
    try {
      const canvas = drawTeacherSupportPage(cycle, currentPage);
      const link = document.createElement('a');
      link.download = `ThynkLab_TeacherSupport_${cycle.id}_Page${currentPage}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Failed to generate teacher support PNG", err);
    }
  };

  const handleDownloadCycleZip = async () => {
    if (isZipping) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      for (let p = 1; p <= 4; p++) {
        const canvas = drawTeacherSupportPage(cycle, p);
        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
        if (blob) {
          zip.file(`Page_${p}_${cycle.theme.replace(/\s+/g, '_')}.png`, blob);
        }
      }
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.download = `ThynkLab_Support_Pack_${cycle.id}.zip`;
      link.href = URL.createObjectURL(content);
      link.click();
    } catch (err) {
      console.error("Failed to generate cycle ZIP", err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 font-['Montserrat'] overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button>
          <div>
            <div className="flex items-center gap-2"><GraduationCap className="text-purple-600" size={18} /><h1 className="text-sm font-black uppercase tracking-widest text-slate-400">Teacher Support</h1></div>
            <p className="font-bold text-slate-800 uppercase tracking-tight">{cycle.title}</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100 rounded-xl p-1">
          {[1, 2, 3, 4].map(num => (
            <button key={num} onClick={() => setCurrentPage(num)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${currentPage === num ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>PAGE {num}</button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadPNG} 
            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            <Download size={16} /> Export Page {currentPage}
          </button>
          <button 
            onClick={handleDownloadCycleZip} 
            disabled={isZipping}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50"
          >
            {isZipping ? <Loader2 size={16} className="animate-spin" /> : <FileArchive size={16} />}
            Download Guide Pack (.zip)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
        <div className="bg-white shadow-2xl w-full max-w-[1100px] p-12 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {currentPage === 1 && (
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b pb-6">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center"><Target size={24}/></div>
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Mission Outcomes</h2>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {data.outcomes.map((row, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 group hover:border-indigo-200 transition-all">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{row.cat}</span>
                    <p className="font-bold text-slate-800 mt-3 text-lg leading-tight">{row.outcome}</p>
                    <div className="h-px w-12 bg-slate-200 my-6 group-hover:w-full transition-all duration-500"></div>
                    <p className="text-xs text-slate-500 font-medium italic flex items-start gap-2">
                       <BookOpen size={14} className="shrink-0 text-slate-300" />
                       Observable: {row.method}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-slate-900 rounded-[32px] p-8 text-white">
                 <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-indigo-400">Technical Vocabulary</h3>
                 <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    {data.vocab.map((v, i) => (
                      <div key={i} className="flex items-baseline gap-2">
                        <span className="font-black text-indigo-300 uppercase tracking-tight text-sm shrink-0">{v.t}:</span>
                        <span className="text-sm font-medium text-slate-400">{v.d}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b pb-6">
                 <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center"><Hammer size={24}/></div>
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Pedagogical Framework</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.pedagogy.map((p, i) => (
                  <div key={i} className="p-8 bg-indigo-50/30 rounded-[32px] border border-indigo-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm"><Settings2 size={16}/></div>
                       <h3 className="font-black text-indigo-700 uppercase tracking-widest text-sm">{p.title}: {p.subtitle}</h3>
                    </div>
                    <div className="space-y-6 flex-grow">
                      <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Teaching Strategy</p><p className="text-sm font-bold text-slate-700 leading-snug">{p.strategy}</p></div>
                      <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Learning Focus</p><p className="text-sm font-bold text-slate-700 leading-snug">{p.focus}</p></div>
                    </div>
                    <div className="mt-8 bg-white p-6 rounded-2xl border border-indigo-100 shadow-inner">
                       <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Lightbulb size={12} /> Teacher Inquiry Prompt
                       </p>
                       <p className="text-sm italic font-bold text-indigo-900 leading-relaxed">"{p.action}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentPage === 3 && (
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b pb-6">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><ClipboardCheck size={24}/></div>
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Assessment Rubric</h2>
              </div>
              <div className="overflow-hidden border border-slate-200 rounded-[32px] shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest border-r border-slate-800 w-1/4">Criteria</th>
                      <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest border-r border-slate-800 w-1/4">Developing</th>
                      <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest border-r border-slate-800 w-1/4">Proficient</th>
                      <th className="p-6 text-left text-[10px] font-black uppercase tracking-widest w-1/4">Advanced</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rubric.map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-6 border-r border-slate-200 align-top">
                          <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{r.criteria}</p>
                        </td>
                        <td className="p-6 border-r border-slate-200 align-top">
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{r.dev}</p>
                        </td>
                        <td className="p-6 border-r border-slate-200 align-top">
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{r.prof}</p>
                        </td>
                        <td className="p-6 align-top">
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{r.adv}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentPage === 4 && (
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b pb-6">
                 <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center"><ListChecks size={24}/></div>
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Assessment & Exit</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                 <div className="lg:col-span-7 space-y-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 uppercase tracking-tight"><AlertCircle className="text-red-500" /> Common Misconceptions</h3>
                    <div className="space-y-4">
                      {data.misconceptions.map((m, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-2xl border-l-4 border-red-500 shadow-sm space-y-4">
                          <div className="flex gap-4">
                             <span className="text-[10px] font-black text-red-600 uppercase tracking-widest pt-1">Common Error</span>
                             <p className="text-sm font-bold text-slate-800 leading-tight">{m.error}</p>
                          </div>
                          <div className="flex gap-4 pt-4 border-t border-slate-200">
                             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest pt-1">Clarification</span>
                             <p className="text-sm italic font-bold text-slate-600 leading-tight">"{m.fix}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
                 <div className="lg:col-span-5">
                    <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[40px] shadow-inner sticky top-8">
                      <h3 className="text-xl font-black mb-8 flex items-center gap-2 text-emerald-800 uppercase tracking-tight"><CheckCircle2 className="text-emerald-500" size={24} /> Session Checklist</h3>
                      <div className="space-y-5">
                        {data.checklist.map((c, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-emerald-200">
                               <CheckCircle2 size={14} className="text-white" />
                            </div>
                            <p className="text-sm font-bold text-emerald-900 leading-snug">{c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl z-50">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 hover:bg-white/10 rounded-full transition-all disabled:opacity-30"><ChevronLeft /></button>
        <span className="font-black text-sm uppercase tracking-widest">Page {currentPage} of 4</span>
        <button disabled={currentPage === 4} onClick={() => setCurrentPage(p => p + 1)} className="p-2 hover:bg-white/10 rounded-full transition-all disabled:opacity-30"><ChevronRight /></button>
      </div>
    </div>
  );
};

export default TeacherSupportPage;
