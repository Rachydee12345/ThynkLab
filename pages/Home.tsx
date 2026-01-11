
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Section from '../components/Section';
import HomeGallery from '../components/HomeGallery';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const threshold = 300;
  const progress = Math.min(scrollY / threshold, 1);
  
  const heroStyle = useMemo(() => ({
    opacity: 1 - progress,
    transform: `scale(${1 - (progress * 0.05)}) translateZ(0)`,
    willChange: 'transform, opacity',
    transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms cubic-bezier(0.22, 1, 0.36, 1)'
  }), [progress]);

  return (
    <div className="relative">
      <Section label="WHERE FUTURE SKILLS BEGIN" isHero>
        <div 
          className="relative pt-32 pb-20 md:pt-48 md:pb-40 flex flex-col items-center justify-center px-6 text-center overflow-hidden min-h-[70vh] md:min-h-[85vh]"
          style={heroStyle}
        >
          <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto z-10 relative">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-thynk-black leading-none">
              THYNKLAB
            </h1>
            <p className="text-[10px] md:text-sm font-bold tracking-[0.6em] md:tracking-[0.8em] text-gray-400 uppercase">
              WHERE FUTURE SKILLS BEGIN
            </p>
            
            <div className="pt-4 md:pt-8 space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
                Future Skills for Primary Schools
              </h2>
              <p className="text-sm md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed px-2 md:px-0">
                STEAM, robotics, coding and AI literacy — designed for real classrooms, delivered with care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8">
              <button 
                onClick={() => navigate('/services')}
                className="w-full sm:w-auto px-10 py-4 bg-thynk-gradient text-white rounded-full font-bold text-[10px] md:text-xs tracking-widest shadow-lg shadow-purple-200 hover:scale-105 transition-all"
              >
                EXPLORE SERVICES
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto px-10 py-4 bg-white text-gray-900 border border-gray-100 rounded-full font-bold text-[10px] md:text-xs tracking-widest hover:bg-gray-50 transition-all"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-gray-50 blur-3xl opacity-50 -z-0 rounded-[100%] pointer-events-none"></div>
        </div>
      </Section>

      <section className="bg-white py-16 md:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="space-y-8 lg:space-y-12 max-w-xl text-center lg:text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">
                  OUR PHILOSOPHY
                </span>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-gray-900">
                  Understanding starts with making.
                </h2>
              </div>
              
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-4 md:space-y-6">
                  <p className="text-lg md:text-2xl font-light text-gray-500 leading-relaxed px-4 lg:px-0">
                    We believe children learn best when they are doing. Our method removes the blank canvas and replaces it with structured iteration.
                  </p>
                  <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed px-4 lg:px-0">
                    By putting making before planning, we build confidence through hands-on discovery, allowing learners to understand systems before they attempt to innovate within them.
                  </p>
                </div>

                <div className="pt-2 md:pt-4">
                  <Link 
                    to="/design-cycles" 
                    className="group inline-flex items-center space-x-3 text-[10px] font-bold tracking-[0.3em] text-thynk-purple uppercase transition-all hover:opacity-70"
                  >
                    <span>The ThynkLab Method</span>
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
            </div>

            <div className="w-full flex flex-col items-center lg:items-end mt-4 lg:mt-0">
              <HomeGallery />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
