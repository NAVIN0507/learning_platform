import ComapnaionsList from '@/components/ComapnaionsList'
import CompanianCard from '@/components/CompanianCard'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'
import { createSupaBaseClient } from '../lib/supabase';
import { getAllCompanions  , getRecentsession} from '@/lib/companion.action'


// (async () => {
//   const supabase = createSupaBaseClient();
//   const { data, error } = await supabase.from('companions').select('*').limit(1);
//   if (error) {
//     console.error('❌ Supabase fetch failed:', error.message);
//   } else {
//     console.log('✅ Got data:', data);
//   }
// })();


// console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);

const page = async() => {
  const companions = await getAllCompanions({limit:3});
  const recentSessionCompanions = await getRecentsession();
  console.log(companions)
  return (
    <main>
       <h1 className='text-2xl'>Popular Companions</h1>
       <section className='home-section'>

        {companions?.map((companion)=>(
          <CompanianCard
          key={companion.id}
      {...companion}
      color={companion.subject}
        />
        ))}
        
    
       </section>
       <section className='home-section'>
        <ComapnaionsList
        title="Recently completed sessions"
        comapanions={recentSessions}
        classNames="w-2/3 max-lg:w-full"
        />
        <CTA/>
       </section>
    </main>
  
)}

export default page