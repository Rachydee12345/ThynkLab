
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';

const Gateway: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    formData.append('_subject', 'New Exemplar Access Request - ThynkLab');
    
    try {
      const response = await fetch('https://formspree.io/f/mojqpzzl', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-32 bg-gray-50">
      <nav className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <Link to="/" className="group inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase hover:text-thynk-purple transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to ThynkLab</span>
        </Link>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-12 text-center space-y-8">
        <span className="text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">SECURE ENTRY</span>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">Access the Makerspace</h1>
        <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          Step inside the Digital Makerspace. Your gateway to units, progress tracking, and professional learning.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        {/* Educator Login Card */}
        <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm flex flex-col items-center text-center space-y-8 border border-gray-100/50">
          <div className="w-16 h-16 rounded-2xl bg-thynk-gray flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-thynk-purple/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Educator Login</h2>
            <p className="text-gray-400 font-light text-sm">For active school partners.</p>
          </div>
          <a 
            href="https://makerspacelogin.netlify.app/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-thynk-black text-white rounded-full text-[10px] font-bold tracking-widest hover:bg-gray-900 transition-colors uppercase text-center"
          >
            ENTER THE MAKERSPACE
          </a>
        </div>

        {/* Exemplar Access Card */}
        <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm space-y-8 border border-gray-100/50 flex flex-col justify-center">
          {status === 'success' ? (
            <div className="text-center space-y-6 py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Request Sent</h2>
                <p className="text-gray-500 font-light text-sm leading-relaxed max-w-[280px] mx-auto">
                  Thank you. We'll review your details and email you a secure access link shortly.
                </p>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="text-[10px] font-bold tracking-widest uppercase text-thynk-purple hover:opacity-70 transition-opacity"
              >
                New Request
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">Exemplar Access</h2>
                <p className="text-gray-400 font-light text-sm">Request temporary access to explore the makerspace.</p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <input 
                    required
                    name="name"
                    type="text" 
                    placeholder="Name" 
                    className="w-full px-6 py-4 bg-thynk-gray rounded-2xl text-sm border-none focus:ring-1 focus:ring-thynk-purple outline-none"
                  />
                  <input 
                    required
                    name="school"
                    type="text" 
                    placeholder="School" 
                    className="w-full px-6 py-4 bg-thynk-gray rounded-2xl text-sm border-none focus:ring-1 focus:ring-thynk-purple outline-none"
                  />
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    className="w-full px-6 py-4 bg-thynk-gray rounded-2xl text-sm border-none focus:ring-1 focus:ring-thynk-purple outline-none"
                  />
                </div>
                
                {status === 'error' && (
                  <p className="text-[10px] font-bold text-red-500 text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button 
                  disabled={status === 'sending'}
                  className={`w-full py-4 bg-thynk-gradient text-white rounded-full text-[10px] font-bold tracking-widest shadow-lg shadow-pink-100 uppercase transition-all ${
                    status === 'sending' ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-95'
                  }`}
                >
                  {status === 'sending' ? 'REQUESTING...' : 'REQUEST ACCESS'}
                </button>
                <p className="text-[10px] text-gray-400 text-center italic">We’ll email you a secure access link.</p>
              </form>
            </>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-32">
        <div className="text-center space-y-12">
          <h3 className="text-sm font-bold tracking-[0.4em] text-gray-400 uppercase">Inside the Makerspace</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Unit Plans', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { label: 'The Method', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
              { label: 'Services', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { label: 'Progress Tracking', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' }
            ].map(item => (
              <div key={item.label} className="space-y-4">
                <div className="w-10 h-10 mx-auto rounded-full bg-white flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-thynk-purple/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gateway;
