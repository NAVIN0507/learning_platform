import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'
export const createSupaBaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient('https://iqtatwnvwclecxkbefop.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGF0d252d2NsZWN4a2JlZm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDc1NTMsImV4cCI6MjA2MzkyMzU1M30._4_XtBkZE5PxF_s3zMbfkjazmBPJcWQlxJ5SF9idHfs' ,     {
    async accessToken(){
        return ((await auth()).getToken())
    }
});
};
 