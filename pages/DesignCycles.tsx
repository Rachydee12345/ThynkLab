
import React from 'react';
import { Link } from 'react-router-dom';
import MethodCycle from '../components/MethodCycle';

const DesignCycles: React.FC = () => {
  const steps = [
    { 
      title: 'MAKE IT', 
      subtitle: 'Build first, plan later', 
      content: 'Learners start with materials, not sketches. This removes "blank canvas" anxiety and encourages immediate engagement.' 
    },
    { 
      title: 'THYNK IT', 
      subtitle: 'Learn, reflect, connect', 
      content: 'Only once something is made do we stop to analyze, connecting hands-on experience to deeper theoretical concepts.' 
    },
    { 
      title: 'TWEAK IT', 
      subtitle: 'Refine and improve', 
      content: 'Iteration is where original design lives. Students refine their prototypes through discovery and controlled failure.' 
    },
    { 
      title: 'TEST IT', 
      subtitle: 'Share and iterate', 
      content: 'Testing provides the critical data needed for the next "Make" cycle in the design progression.' 
    }
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-32">
      {/* Light Grey Hero Section */}
      <div className="bg-thynk-gray border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-4">
          <Link to="/" className="group inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase hover:text-thynk-purple transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to ThynkLab</span>
          </Link>
        </nav>

        <section className="max-w-5xl mx-auto px-6 py-12 md:py-20 text-center space-y-6 md:space-y-8">
          <span className="block text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">
            THE METHOD
          </span>
          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-tight">
            The THYNKLAB Method
          </h1>
          <p className="text-base md:text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            A pedagogical breakthrough for the primary classroom. Built on the belief that understanding starts with making.
          </p>
        </section>
      </div>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Detailed Descriptions */}
          <div className="lg:col-span-6 space-y-8 md:space-y-12 order-2 lg:order-1">
            <div className="space-y-2 mb-8 md:mb-12 text-center lg:text-left">
              <span className="text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">
                THE PROCESS
              </span>
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                Iteration by Design
              </h2>
            </div>

            <div className="grid gap-8 md:gap-12">
              {steps.map((step) => (
                <div key={step.title} className="group relative pl-10 md:pl-12">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-gray-100 group-hover:border-thynk-purple transition-colors flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-thynk-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-col space-y-0.5 md:space-y-1">
                      <h3 className="text-[12px] md:text-sm font-black tracking-[0.2em] text-gray-900 uppercase">
                        {step.title}
                      </h3>
                      <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {step.subtitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-xl">
                      {step.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 md:pt-8 pl-10 md:pl-12 flex justify-center lg:justify-start">
              <Link 
                to="/unit-plans" 
                className="group inline-flex items-center space-x-3 text-[10px] font-bold tracking-[0.3em] text-thynk-purple uppercase transition-all hover:opacity-70"
              >
                <span>The Curriculum →</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2 px-4 md:px-0">
            <div className="w-full max-w-[450px] lg:max-w-[600px] relative">
              <div className="flex items-center justify-center">
                <MethodCycle />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DesignCycles;
