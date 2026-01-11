
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Portal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-0">
      <nav className="max-w-7xl mx-auto px-6 md:px-8 pt-8 md:pt-12">
        <Link to="/" className="group inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase hover:text-thynk-purple transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to ThynkLab</span>
        </Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24 text-center space-y-6 md:space-y-8">
        <span className="block text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">
          MAKERSPACE
        </span>
        <h1 className="text-3xl md:text-6xl font-semibold tracking-tight leading-tight text-gray-900">
          The Digital Makerspace
        </h1>
        <p className="text-base md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          The interactive home of the ThynkLab Method. A visual environment designed to remove the friction of "what comes next" for both students and teachers.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 max-w-xl">
            <div className="space-y-2 md:space-y-4">
              <span className="text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">Interactive Learning</span>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">Built for Agency</h2>
            </div>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-500 font-light leading-relaxed">
              <p>
                The Digital Makerspace provides a clear, visual roadmap through the design cycle. It empowers students to lead their own discovery while giving teachers the visibility they need to facilitate effectively.
              </p>
              <p>
                From evidence capture to reflection checkpoints, every interaction in the makerspace is intentional, measurable, and perfectly aligned with your curriculum goals.
              </p>
              
              <div className="p-6 md:p-8 bg-thynk-gray rounded-[32px] border border-gray-100/50 flex flex-col space-y-3 mt-4">
                <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-thynk-purple">ThynkBot Learning Coach</h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
                  Our optional AI-powered coach provides real-time scaffolding and tailored challenge, helping students navigate hurdles with strict educational guardrails.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl md:rounded-xl border border-gray-100 shadow-2xl overflow-hidden aspect-auto lg:aspect-[4/3.8] flex flex-col">
              {/* Browser Header */}
              <div className="h-10 md:h-14 bg-gray-50 border-b border-gray-100 px-4 md:px-6 flex items-center justify-between">
                <div className="flex space-x-1.5 md:space-x-2">
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-gray-200"></div>
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-gray-200"></div>
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-gray-200"></div>
                </div>
                <div className="text-[8px] md:text-[10px] font-bold tracking-widest text-gray-300 uppercase">YEAR 4 • POWERED MOVEMENT</div>
              </div>
              
              <div className="flex-grow bg-white p-6 md:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-7 space-y-6 md:space-y-8">
                  <div className="space-y-1 md:space-y-2">
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase">TEST IT<span className="text-thynk-purple">.</span></h3>
                    <p className="text-xs md:text-sm text-gray-400 font-medium">Drive Your Sphero!</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-base md:text-lg font-bold text-gray-900">Testing Methods</h4>
                    <div className="space-y-3">
                      {[
                        { title: 'Speed Test', desc: 'Time how long it takes to travel 3 meters.' },
                        { title: 'Precision Test', desc: 'Does it stay on track? Return to start.' }
                      ].map(test => (
                        <div key={test.title} className="p-4 md:p-5 border border-gray-100 rounded-2xl flex items-center space-x-4 bg-white hover:border-thynk-purple/30 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-gray-100"></div>
                          <div>
                            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-tight text-gray-900">{test.title}</p>
                            <p className="text-[9px] md:text-[10px] text-gray-400 leading-relaxed">{test.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lab Report Sidebar */}
                <div className="lg:col-span-5 h-full mt-4 lg:mt-0">
                  <div className="bg-gray-50 rounded-2xl p-5 md:p-6 h-full border border-gray-100 flex flex-col">
                    <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                      <h4 className="text-[10px] md:text-xs font-bold text-gray-900 uppercase tracking-widest text-center lg:text-left">Lab Report</h4>
                      <div className="h-[1px] bg-gray-200/40 w-full"></div>
                    </div>
                    
                    {/* ThynkBot Chat Bubble */}
                    <div className="flex-grow bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm flex flex-col min-h-[180px] md:min-h-[240px]">
                      <div className="mb-3 md:mb-4 text-center lg:text-left">
                        <span className="text-thynk-purple text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">THYNKBOT</span>
                      </div>
                      <p className="text-[10px] md:text-[12px] text-gray-500 leading-relaxed font-light mb-4 md:mb-6 italic text-center lg:text-left">
                        "What happened when you increased the power? Can you find a way to make it even faster while staying in a straight line?"
                      </p>
                      
                      {/* Decorative input line at bottom of bubble */}
                      <div className="mt-auto pt-4 md:pt-6 border-t border-gray-50 hidden md:block">
                        <div className="h-2 w-16 bg-gray-100/50 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-thynk-gray py-16 md:py-24 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <span className="text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">A COMPLETE PARTNERSHIP</span>
            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">Implementation with Impact.</h2>
            <p className="text-base md:text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              The Digital Makerspace provides the infrastructure; our services provide the confidence. From online mastery to hands-on workshops, we ensure your team is equipped to guide the Method with excellence.
            </p>
          </div>
          
          <div className="pt-2">
            <Link 
              to="/services" 
              className="group inline-flex items-center space-x-3 text-[10px] font-bold tracking-[0.3em] text-thynk-purple uppercase transition-all hover:opacity-70"
            >
              <span>Master the Method</span>
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

export default Portal;
