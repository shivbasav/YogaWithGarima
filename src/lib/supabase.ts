import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vnrjuoedmumtjonqyrzl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZucmp1b2VkbXVtdGpvbnF5cnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTg3MjEsImV4cCI6MjA5MDQzNDcyMX0.SSePPNEJlAneFNaUjOBWOJhhYe1GQ_brrFkuMNlPrWY';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

export const supabase = getSupabase();
