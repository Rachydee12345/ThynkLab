
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import { supabase } from './supabaseClient';

const AuthObserver: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Listen for auth state changes (crucial for OAuth flows)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // If we are on login or signup, go to dashboard
        if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
          navigate('/dashboard', { replace: true });
        }
      } else {
        // If no session and not on login/signup, force login
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate('/login', { replace: true });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthObserver>
        <div className="min-h-screen font-sans">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teacher-dashboard" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthObserver>
    </HashRouter>
  );
};

export default App;
