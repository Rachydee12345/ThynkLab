
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';

const DashboardPlaceholder: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-thynk-gray flex flex-col items-center justify-center p-6 text-center">
      <Logo showTagline className="mb-12" />
      <div className="bg-white p-12 rounded-3xl shadow-2xl shadow-purple-100 max-w-md w-full space-y-6 border border-white">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-thynk-black">Teacher Dashboard</h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          Welcome back! You have successfully logged into the **THYNKLAB** platform. Your tools and resources are ready.
        </p>
        <Button onClick={handleLogout} variant="secondary">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardPlaceholder;
