
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0">
        <div className="flex items-center space-x-4 w-full md:w-auto shrink-0">
          <div className="shrink-0">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ThynkLab" className="h-8 md:h-10 w-auto">
              <defs>
                <linearGradient id="thynkGradientSubtleWarmFooter" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="55%" stopColor="#EC4899"/>
                  <stop offset="80%" stopColor="#F97316"/>
                  <stop offset="100%" stopColor="#FACC15"/>
                </linearGradient>
              </defs>
              <path d="M4 4 L16 16 L16 30" stroke="url(#thynkGradientSubtleWarmFooter)" strokeWidth="6" strokeLinecap="square"/>
              <path d="M28 4 L16 16" stroke="url(#thynkGradientSubtleWarmFooter)" strokeWidth="6" strokeLinecap="square"/>
            </svg>
          </div>
          
          <div className="flex flex-col space-y-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-black">THYNKLAB</h2>
            <p className="text-[9px] md:text-[10px] text-gray-400 tracking-widest uppercase font-semibold leading-none truncate">Where Future Skills Begin</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-10 sm:space-y-0 sm:space-x-12 md:space-x-16">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 tracking-widest uppercase">PLATFORM</h3>
            <ul className="space-y-3 text-xs text-gray-500 font-medium">
              <li><Link to="/design-cycles" className="hover:text-thynk-purple transition-colors">The Method</Link></li>
              <li><Link to="/unit-plans" className="hover:text-thynk-purple transition-colors">Unit Plans</Link></li>
              <li><Link to="/digital-makerspace" className="hover:text-thynk-purple transition-colors">Digital Makerspace</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-900 tracking-widest uppercase">RESOURCES</h3>
            <ul className="space-y-3 text-xs text-gray-500 font-medium">
              <li><Link to="/services" className="hover:text-thynk-purple transition-colors">Services</Link></li>
              <li><Link to="/gateway" className="hover:text-thynk-purple transition-colors">Educator Gateway</Link></li>
              <li><Link to="/contact" className="hover:text-thynk-purple transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-50 text-[10px] text-gray-400 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="font-medium">© 2026 THYNKLAB. All rights reserved.</p>
        <div className="flex space-x-6">
          <span className="cursor-pointer hover:text-gray-600 transition-colors uppercase font-bold tracking-widest">Privacy</span>
          <span className="cursor-pointer hover:text-gray-600 transition-colors uppercase font-bold tracking-widest">Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
