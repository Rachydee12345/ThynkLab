
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { label: 'The Method', path: '/design-cycles' },
    { label: 'Unit Plans', path: '/unit-plans' },
    { label: 'Digital Makerspace', path: '/digital-makerspace' },
    { label: 'Services', path: '/services' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-black text-white z-[100] px-4 md:px-8 flex items-center justify-between">
      <div 
        className="flex items-center justify-between w-full h-full"
        style={{ 
          willChange: 'transform, opacity',
          transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)' 
        }}
      >
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/" className="group flex items-center space-x-2 md:space-x-3 opacity-80 hover:opacity-100 transition-opacity">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ThynkLab" className="h-[14px] md:h-[18px] w-auto">
              <defs>
                <linearGradient id="thynkGradientSubtleWarm" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="55%" stopColor="#EC4899"/>
                  <stop offset="80%" stopColor="#F97316"/>
                  <stop offset="100%" stopColor="#FACC15"/>
                </linearGradient>
              </defs>
              <path d="M4 4 L16 16 L16 30" stroke="url(#thynkGradientSubtleWarm)" strokeWidth="6" strokeLinecap="square"/>
              <path d="M28 4 L16 16" stroke="url(#thynkGradientSubtleWarm)" strokeWidth="6" strokeLinecap="square"/>
            </svg>
            <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] md:tracking-[0.25em] whitespace-nowrap uppercase">THYNKLAB ©</span>
          </Link>
          
          <div className="hidden md:block h-4 w-[1px] bg-white/20"></div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] font-semibold tracking-[0.2em] hover:text-white transition-colors ${
                  isActive(item.path) ? 'text-white' : 'text-white/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={() => navigate('/gateway')}
          className="group relative inline-flex items-center space-x-2 bg-thynk-gradient px-4 md:px-5 py-2 rounded-full text-[9px] md:text-[10px] font-bold tracking-wider hover:brightness-110 transition-all shadow-lg active:scale-95"
          style={{ 
            transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)' 
          }}
        >
          <span className="hidden sm:inline">Makerspace Login</span>
          <span className="sm:hidden">Login</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
