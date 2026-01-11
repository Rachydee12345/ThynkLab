
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        if (authError.message === 'Invalid login credentials') {
          setError('Invalid email or password. Please double-check your credentials or reset your password.');
        } else {
          setError(`Login failed: ${authError.message}`);
        }
        setIsLoading(false);
        return;
      }

      navigate('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setSuccessMsg('');
    
    if (!email) {
      setError('Please enter your email address first to receive a reset link.');
      return;
    }

    setIsLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/#/reset-password`,
      });

      if (resetError) {
        setError(`Reset failed: ${resetError.message}`);
      } else {
        setSuccessMsg(`Password reset link sent to ${email}. Please check your inbox.`);
      }
    } catch (err) {
      setError('An unexpected error occurred while sending the reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'azure') => {
    setError('');
    setSuccessMsg('');
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (oauthError) {
        setError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed: ${oauthError.message}`);
      }
    } catch (err) {
      setError('An unexpected error occurred during social login.');
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      {/* Left Side: Visual/Branding Section */}
      <div className="hidden lg:flex w-1/2 bg-thynk-black relative items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-thynk-purple rounded-full mix-blend-screen opacity-20 blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-thynk-pink rounded-full mix-blend-screen opacity-20 blur-[100px] translate-y-1/2 -translate-x-1/4 animate-pulse-slow delay-1000"></div>
        
        <div className="z-10 text-center px-12 space-y-8">
          <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">Join the revolution</span>
          </div>
          <h1 className="text-6xl xl:text-7xl font-black text-white leading-tight tracking-tighter">
            Unlock your <br />
            <span className="text-transparent bg-clip-text bg-thynk-gradient">potential.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            The platform designed for the next generation of innovators, creators, and future-makers.
          </p>
          
          <div className="grid grid-cols-2 gap-12 pt-8 max-w-sm mx-auto">
            {[
              { label: 'Units', val: '500+' },
              { label: 'Schools', val: '200+' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-thynk-gray">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <Logo showTagline className="mb-8 items-center lg:items-start" />
            <h2 className="text-3xl font-black text-thynk-black mt-10">Welcome Back</h2>
            <p className="text-gray-500 mt-2 font-medium">Log in to your account to continue learning.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2 items-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {successMsg && (
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2 items-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span>{successMsg}</span>
                </div>
              </div>
            )}

            <Input 
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            <div className="space-y-1">
              <Input 
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-thynk-purple hover:text-thynk-pink transition-colors uppercase tracking-widest"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading}>
              Sign in to the Digital Makerspace
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
                <span className="bg-thynk-gray px-4 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="social" 
                type="button" 
                fullWidth={true} 
                onClick={() => handleOAuthLogin('google')}
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                Google
              </Button>
              <Button 
                variant="social" 
                type="button" 
                fullWidth={true}
                onClick={() => handleOAuthLogin('azure')}
              >
                <img src="https://www.microsoft.com/favicon.ico" className="w-4 h-4" alt="Microsoft" />
                Microsoft
              </Button>
            </div>
          </form>

          <p className="text-center text-sm font-medium text-gray-500 pt-6">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/signup')}
              className="text-thynk-purple font-black hover:underline underline-offset-4"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
