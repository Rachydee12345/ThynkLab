
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UnitPlans: React.FC = () => {
  const navigate = useNavigate();
  
  const designCycles = [
    { id: 'UO', title: 'Unit Overview', locked: true },
    { id: 'DC1', title: 'Design Cycle 1', locked: true },
    { id: 'DC2', title: 'Design Cycle 2: Moving Vehicles', locked: false },
    { id: 'DC3', title: 'Design Cycle 3', locked: true },
    { id: 'DC4', title: 'Design Cycle 4', locked: true },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-32">
      {/* Light Grey Hero Section */}
      <div className="bg-thynk-gray border-b border-gray-100">
        <nav className="max-w-5xl mx-auto px-6 pt-12 md:pt-16 pb-4">
          <Link to="/" className="group inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase hover:text-thynk-purple transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to ThynkLab</span>
          </Link>
        </nav>

        <section className="max-w-5xl mx-auto px-6 py-10 md:py-16 text-center space-y-6 md:space-y-8">
          <span className="block text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">
            CURRICULUM
          </span>
          <div className="space-y-6 md:space-y-8 mb-8 md:mb-16">
            <h1 className="text-3xl md:text-6xl font-semibold tracking-tight leading-tight text-gray-900">Our Method. Your Curriculum.</h1>
            <p className="text-base md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Tailored to your school’s unique context, delivered through the ThynkLab Method.
            </p>
          </div>
        </section>
      </div>

      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-16 md:mt-24">
        <div className="bg-white rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
          <div className="bg-thynk-black p-6 md:p-12 text-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">Exemplar Unit: Year 4</h2>
            <p className="text-gray-400 font-light text-sm md:text-base">Explore a live segment of our Moving Vehicles unit.</p>
          </div>
          
          <div className="px-5 py-8 md:p-12 space-y-10 md:space-y-12">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
              <div className="space-y-6 md:space-y-8 text-gray-600 font-light leading-relaxed">
                <div className="space-y-4 text-sm md:text-base">
                  <p>
                    Design Cycle 2 is shared to demonstrate how learning builds through iteration 
                    once foundational understanding has been established.
                  </p>
                  <p>
                    ThynkLab units are designed as connected learning journeys. We work with you to ensure our content maps perfectly to your specific regional standards.
                  </p>
                </div>
                
                <div className="p-6 md:p-8 rounded-[24px] md:rounded-3xl bg-gray-50 border border-gray-100/50 space-y-4 md:space-y-6 mt-4 md:mt-8">
                  <p className="text-gray-900 font-bold leading-relaxed text-sm md:text-base">
                    Every unit culminates in a <span className="text-thynk-purple">ThynkTank</span> — a final challenge where learners combine skills and systems.
                  </p>
                  <p className="text-[12px] md:text-sm text-gray-500 font-light leading-relaxed">
                    In a ThynkTank, students work with greater autonomy to design, adapt, and apply what they have learned in a new context.
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => navigate('/gateway')}
                    className="inline-flex items-center space-x-2 text-thynk-purple text-[10px] font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
                  >
                    <span>Request Full Access</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 mt-4 md:mt-0">
                {designCycles.map((dc) => (
                  <div 
                    key={dc.id}
                    className={`group relative p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                      dc.locked 
                        ? 'bg-gray-50 border-gray-100 opacity-60' 
                        : 'bg-white border-thynk-purple/20 shadow-lg cursor-pointer hover:border-thynk-purple'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-[11px] md:text-xs font-bold tracking-widest uppercase break-words">{dc.title}</span>
                      {dc.locked ? (
                        <div className="flex items-center space-x-2 text-gray-400 shrink-0">
                          <span className="text-[8px] font-bold tracking-tighter sm:opacity-0 group-hover:opacity-100 transition-opacity uppercase">LOCKED</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      ) : (
                        <span className="text-[9px] md:text-[10px] font-black text-thynk-purple tracking-widest uppercase shrink-0">UNLOCKED</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-thynk-gray py-16 md:py-24 mt-20 md:mt-32">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <span className="text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">FROM STRUCTURE TO DELIVERY</span>
            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">Your Curriculum, Visualised.</h2>
            <p className="text-base md:text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Once your curriculum is mapped, the Digital Makerspace becomes your classroom's heartbeat. Interactive, evidence-based, and student-led.
            </p>
          </div>
          
          <div className="pt-2">
            <Link 
              to="/digital-makerspace" 
              className="group inline-flex items-center space-x-3 text-[10px] font-bold tracking-[0.3em] text-thynk-purple uppercase transition-all hover:opacity-70"
            >
              <span>The Digital Makerspace</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 transition-transform group-hover:translate-x-1.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnitPlans;
