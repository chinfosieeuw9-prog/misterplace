import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://elwiaaugvavnjllatrlh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsd2lhYXVndmF2bmpsbGF0cmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzkxOTMsImV4cCI6MjA3MjE1NTE5M30.HbzGCPjwQvhhyntYAZi_f2JAHcZzFS1TzZhMKgMBkHo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
