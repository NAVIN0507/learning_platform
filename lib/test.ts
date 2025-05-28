import { createSupaBaseClient } from './supabase';

(async () => {
  try {
    const supabase = createSupaBaseClient();
    const { data, error } = await supabase.from('companions').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Connected. Data:', data);
  } catch (err) {
    console.error('❌ Failed to connect to Supabase:', err);
  }
})();
