
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Logo from '../components/Logo';
import Button from '../components/Button';

interface Unit {
  unit_key: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setFetchError(null);

    // 1. Rigorous session check before any query
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('No valid session found during fetch:', sessionError?.message);
      navigate('/login');
      return;
    }

    const user = session.user;
    console.log('[Auth] Active session for user:', user.id);

    try {
      // 2. Fetch profile to get school_id using the authenticated client
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('school_id, full_name')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('[DB] Profile query error (Check RLS):', profileError.message);
        setFetchError(`Profile access error: ${profileError.message}`);
        setUserName(user.email?.split('@')[0] || 'Innovator');
      } else if (profile) {
        setUserName(profile.full_name || user.email?.split('@')[0] || 'Innovator');
        setSchoolId(profile.school_id);
        
        console.log('[DB] Profile found. school_id:', profile.school_id);

        // 3. Fetch units based on school_id
        if (profile.school_id) {
          console.log('[DB] Fetching units for school:', profile.school_id);
          
          // Double-check session state immediately before query to ensure header persistence
          const { data: { session: freshSession } } = await supabase.auth.getSession();
          if (!freshSession) throw new Error("Session lost during request chain");

          const { data: schoolUnits, error: unitsError } = await supabase
            .from('school_units')
            .select('unit_key')
            .eq('school_id', profile.school_id);

          if (unitsError) {
            console.error('[DB] school_units query error (Check RLS):', unitsError.message);
            setFetchError(`Access Denied: ${unitsError.message}`);
          } else {
            console.log('[DB] Units successfully fetched:', schoolUnits?.length || 0);
            setUnits(schoolUnits || []);
          }
        } else {
          console.warn('[DB] User has no school_id assigned in their profile.');
        }
      } else {
        console.warn('[DB] No row found in "profiles" for user UID:', user.id);
        setUserName(user.email?.split('@')[0] || 'Innovator');
      }
    } catch (error: any) {
      console.error('[System] Error in fetch chain:', error.message);
      setFetchError('Connection error. Please check your internet or try logging in again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Auth Event]', event);
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
      if (event === 'TOKEN_REFRESHED') {
        console.log('[Auth] Token refreshed successfully');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const formatUnitTitle = (key: string) => {
    return key
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-thynk-gray pb-20">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo className="scale-75 origin-left" />
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-sm font-bold text-gray-400 uppercase tracking-widest">
              Welcome, <span className="text-thynk-black">{userName}</span>
            </span>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="!py-2 !px-4 text-xs"
              fullWidth={false}
            >
              Log Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <header className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 mb-4">
            <span className="text-thynk-purple text-[10px] font-black uppercase tracking-[0.2em]">Learning Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-thynk-black tracking-tighter">
            Your Digital <span className="text-transparent bg-clip-text bg-thynk-gradient">Makerspace</span>
          </h1>
          {fetchError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              <span>{fetchError}</span>
              <button onClick={fetchDashboardData} className="ml-auto underline decoration-2">Retry</button>
            </div>
          )}
          <p className="text-gray-500 mt-4 text-lg max-w-2xl font-medium leading-relaxed">
            Access your units and build the future with THYNKLAB's curated learning paths.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-thynk-purple/20 border-t-thynk-purple rounded-full animate-spin"></div>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Synchronizing Session...</p>
          </div>
        ) : units.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {units.map((unit) => (
              <div 
                key={unit.unit_key}
                className="group bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 border border-white hover:-translate-y-2 flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-thynk-gray flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-thynk-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-thynk-black leading-tight tracking-tight mb-2">
                    {formatUnitTitle(unit.unit_key)}
                  </h3>
                  <div className="flex items-center gap-2 mb-8">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available Now</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate(`/units/${unit.unit_key}`)}
                  className="shadow-none hover:shadow-lg hover:shadow-purple-200"
                >
                  Launch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-16 text-center border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-thynk-black">No Units Found</h2>
            <p className="text-gray-500 mt-2 font-medium max-w-sm mx-auto">
              {!schoolId 
                ? "Your account is not linked to a school. Please contact your instructor to be assigned to a school ID."
                : "Your school has not assigned any units yet."}
            </p>
            <div className="mt-8 pt-8 border-t border-gray-50">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Diagnostic Info</p>
               <div className="mt-2 flex flex-wrap justify-center gap-4">
                  <span className="px-2 py-1 bg-gray-100 rounded text-[9px] font-mono">School ID: {schoolId || 'None'}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-[9px] font-mono">Auth: Authenticated</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-[9px] font-mono">Persistence: Enabled</span>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
