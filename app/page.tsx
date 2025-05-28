import ComapnaionsList from '@/components/ComapnaionsList'
import CompanianCard from '@/components/CompanianCard'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'
import { createSupaBaseClient } from '../lib/supabase';


// (async () => {
//   const supabase = createSupaBaseClient();
//   const { data, error } = await supabase.from('companions').select('*').limit(1);
//   if (error) {
//     console.error('❌ Supabase fetch failed:', error.message);
//   } else {
//     console.log('✅ Got data:', data);
//   }
// })();


console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);

const page = () => {
  return (
    <main>
       <h1 className='text-2xl'>Popular Companions</h1>
       <section className='home-section'>
        <CompanianCard
        id="123"
        name="Neura the Brainy Explorer"
        topic="Neural Network of the Brain"
        subject="science"
        duration={45}
        color="#ffda6e"
        />
       <CompanianCard
        id="321"
        name="Countsy the Number Wizard"
        topic="Derivatives & Integrals"
        subject="Maths"
        duration={30}
        color="#e5d0ff"
        />
  <CompanianCard
        id="789"
        name="Verba the Vocabulary Builder"
        topic="English Litrature"
        subject="English"
        duration={30}
        color="#BDE7FF"
        />
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