
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    
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
    <div className="min-h-screen pt-12">
      <nav className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <Link to="/" className="group inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase hover:text-thynk-purple transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to ThynkLab</span>
        </Link>
      </nav>

      <Section label="Connect with Us" isHero>
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2 space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] font-bold tracking-[0.4em] text-thynk-purple uppercase">Connect</span>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">Let’s build your future-ready school.</h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                We’re here to help you navigate the transition to method-led STEAM learning. No pushy sales, just educational partnership.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 pt-8 border-t border-gray-100">
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Direct Support</h4>
                <p className="text-base font-medium">hello@thynklab.co.uk</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Founded In</h4>
                <p className="text-base font-medium">London, United Kingdom</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Based In</h4>
                <p className="text-base font-medium">UAE</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Working With</h4>
                <p className="text-base font-medium">Schools internationally</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 bg-thynk-gray p-10 md:p-14 rounded-[48px]">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">Message Received</h2>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Thank you for reaching out. A member of our education team will be in touch shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[10px] font-bold tracking-widest uppercase text-thynk-purple hover:opacity-70 transition-opacity"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-4">Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      className="w-full px-6 py-4 bg-white rounded-2xl text-sm border-none focus:ring-1 focus:ring-thynk-purple outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-4">School</label>
                    <input 
                      required
                      name="school"
                      type="text" 
                      className="w-full px-6 py-4 bg-white rounded-2xl text-sm border-none focus:ring-1 focus:ring-thynk-purple outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-4">Email</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    className="w-full px-6 py-4 bg-white rounded-2xl text-sm border-none focus:ring-1 focus:ring-thynk-purple outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-4">Message</label>
                  <textarea 
                    required
                    name="message"
                    rows={5}
                    className="w-full px-6 py-4 bg-white rounded-2xl text-sm border-none focus:ring-1 focus:ring-thynk-purple outline-none resize-none"
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <p className="text-[10px] font-bold text-red-500 px-4 text-center">
                    Something went wrong. Please try again or email hello@thynklab.co.uk directly.
                  </p>
                )}

                <button 
                  disabled={status === 'sending'}
                  className={`w-full py-5 bg-thynk-gradient text-white rounded-full text-[10px] font-bold tracking-widest shadow-xl shadow-pink-100 mt-4 transition-all ${
                    status === 'sending' ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                >
                  {status === 'sending' ? 'SENDING...' : 'SEND ENQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
