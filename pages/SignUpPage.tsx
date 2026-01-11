
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Sign up the user in Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      });

      if (signUpError) {
        setError(`Sign up failed: ${signUpError.message}`);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // 2. Create the profile record
        // Note: For RLS-protected tables, ensure users have "INSERT" permission.
        // If email confirmation is ON, session will be null here, which can trigger RLS failures.
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              email: email.trim(),
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) {
          console.error('Profile creation error message:', profileError.message);
          console.error('Profile creation error details:', profileError.details);
          // We don't block the user, as the Auth account IS created.
          // But we warn them that their profile data might be missing.
        }

        if (data.session) {
          // Logged in immediately (email confirmation likely OFF)
          navigate('/dashboard');
        } else {
          // Confirmation email likely sent
          setSuccessMsg('Registration successful! Please check your email to confirm your account before logging in.');
          setIsLoading(false);
        }
      }
    } catch (err: any) {
      setError(`An unexpected error occurred: ${err.message || 'Please try again.'}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      <div className="hidden lg:flex w-1/2 bg-thynk-black relative items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-thynk-purple rounded-full mix-blend-screen opacity-20 blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-thynk-pink rounded-full mix-blend-screen opacity-20 blur-[100px] translate-y-1/2 -translate-x-1/4 animate-pulse-slow delay-1000"></div>
        
        <div className="z-10 text-center px-12 space-y-8">
          <div className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">Start your journey</span>
          </div>
          <h1 className="text-6xl xl:text-7xl font-black text-white leading-tight tracking-tighter">
            Build the <br />
            <span className="text-transparent bg-clip-text bg-thynk-gradient">future.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Join thousands of students and teachers already shaping the digital landscape.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-thynk-gray overflow-y-auto">
        <div className="max-w-md w-full py-12 space-y-8">
          <div className="text-center lg:text-left">
            <Logo showTagline className="mb-8 items-center lg:items-start" />
            <h2 className="text-3xl font-black text-thynk-black mt-10">Create Account</h2>
            <p className="text-gray-500 mt-2 font-medium">Join the THYNKLAB Digital Makerspace.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-semibold">
                <div className="flex gap-2 items-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {successMsg && (
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm font-semibold">
                <div className="flex gap-2 items-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span>{successMsg}</span>
                </div>
              </div>
            )}

            <Input 
              label="Full Name"
              type="text"
              placeholder="Alex Innovator"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

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

            <Input 
              label="Password"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <Button type="submit" isLoading={isLoading}>
              Create My Account
            </Button>
          </form>

          <p className="text-center text-sm font-medium text-gray-500 pt-6">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-thynk-purple font-black hover:underline underline-offset-4"
            >
              Log In
            </button>
          </p>
          
          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest px-8 leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
