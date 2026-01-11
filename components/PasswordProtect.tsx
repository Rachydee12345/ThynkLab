
import React, { useState } from 'react';

interface PasswordProtectProps {
  onAuthenticated: () => void;
}

const PasswordProtect: React.FC<PasswordProtectProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const CORRECT_PASSWORD = 'THYNK2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem('thynk_preview_auth', 'true');
      onAuthenticated();
    } else {
      setError(true);
      setPassword('');
      // Shake animation or visual feedback
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[140%] h-[600px] bg-thynk-gradient blur-[120px] opacity-[0.07] rounded-[100%] pointer-events-none"></div>

      <div className={`w-full max-w-md bg-white p-10 md:p-14 rounded-[48px] border border-gray-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] relative z-10 transition-transform duration-300 ${error ? 'animate-shake' : ''}`}>
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gatekeeperGradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="55%" stopColor="#EC4899"/>
                  <stop offset="80%" stopColor="#F97316"/>
                  <stop offset="100%" stopColor="#FACC15"/>
                </linearGradient>
              </defs>
              <path d="M4 4 L16 16 L16 30" stroke="url(#gatekeeperGradient)" strokeWidth="6" strokeLinecap="square"/>
              <path d="M28 4 L16 16" stroke="url(#gatekeeperGradient)" strokeWidth="6" strokeLinecap="square"/>
            </svg>
            <span className="text-xl font-black tracking-tighter text-black uppercase">THYNKLAB</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Preview Access</h1>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              This is a private preview of the ThynkLab 2026 platform. Please enter the access code to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Code"
                className={`w-full px-8 py-5 bg-gray-50 rounded-3xl text-sm border transition-all outline-none text-center tracking-[0.3em] font-bold ${
                  error ? 'border-red-200 ring-2 ring-red-50' : 'border-transparent focus:ring-2 focus:ring-thynk-purple/10 focus:border-thynk-purple/20'
                }`}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-5 bg-thynk-gradient text-white rounded-3xl text-[10px] font-bold tracking-[0.3em] shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all uppercase"
            >
              Enter Preview
            </button>
          </form>

          {error && (
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
              Invalid Access Code
            </p>
          )}

          <div className="pt-4">
            <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em]">
              © 2026 ThynkLab Global
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .animate-shake {
            animation: shake 0.2s ease-in-out 0s 2;
          }
        `}
      </style>
    </div>
  );
};

export default PasswordProtect;
