const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSettingsTable() {
  console.log('🔍 Testing settings table...');
  
  try {
    // Test if we can read from settings table
    const { data, error } = await supabase.from('settings').select('*').limit(1);
    
    if (error) {
      console.error('❌ Error accessing settings table:', error);
      
      if (error.code === 'PGRST116') {
        console.log('💡 Settings table does not exist. You need to create it.');
        console.log('\n📝 Run this SQL in your Supabase dashboard:');
        console.log(`
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Add policy for authenticated users
CREATE POLICY "Enable all access for authenticated users" ON settings FOR ALL USING (auth.role() = 'authenticated');
        `);
      }
      return false;
    }
    
    console.log('✅ Settings table exists and is accessible');
    
    // Test upsert operation
    const testUpsert = await supabase
      .from('settings')
      .upsert([{ key: 'test_key', value: 'test_value' }], { onConflict: 'key' });
    
    if (testUpsert.error) {
      console.error('❌ Upsert test failed:', testUpsert.error);
      return false;
    }
    
    console.log('✅ Upsert operation works correctly');
    
    // Clean up test data
    await supabase.from('settings').delete().eq('key', 'test_key');
    
    return true;
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return false;
  }
}

testSettingsTable().then(success => {
  if (success) {
    console.log('\n🎉 All tests passed! Your settings functionality should work.');
  } else {
    console.log('\n❌ Tests failed. Please fix the issues above.');
  }
});
