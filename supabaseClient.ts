
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

/**
 * Configuration for Supabase.
 * persistSession: true ensures that the session is stored in localStorage
 * and automatically attached as a Bearer token in the Authorization header.
 */
const supabaseUrl = process.env.SUPABASE_URL || 'https://cnnqqxpnfrdqhicizuuy.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_ZdVXisk4QDHEf-qUNIVfqQ_dRtpU6J4';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing. Check environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage // Explicitly define storage
  },
  global: {
    headers: {
      'x-application-name': 'thynklab-portal'
    }
  }
});
