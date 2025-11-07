import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase credentials
// Using valid placeholder URLs to prevent runtime errors when env vars are not set
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

// Check if using placeholder values
const isPlaceholder = supabaseUrl === 'https://placeholder.supabase.co' || !process.env.REACT_APP_SUPABASE_URL;
if (isPlaceholder) {
  console.warn(
    '⚠️ Using placeholder Supabase credentials. Please set up your environment variables:\n' +
    '1. Create a .env file in the coffee-admin-dashboard directory\n' +
    '2. Add: REACT_APP_SUPABASE_URL=https://your-project.supabase.co\n' +
    '3. Add: REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here\n' +
    'See SUPABASE_SETUP.md for detailed instructions.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test connection only if not using placeholder values
if (!isPlaceholder) {
  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Database connection test failed:', error);
      } else {
        console.log('Successfully connected to Supabase database');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
    }
  };

  testConnection();
}

export default supabase;
