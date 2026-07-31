import { createClient } from '@supabase/supabase-js';

// Fallback to placeholder if environment variables are not set yet
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
