import ComapnaionsList from '@/components/ComapnaionsList'
import CompanianCard from '@/components/CompanianCard'
import CTA from '@/components/CTA'
import React from 'react'

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
        <ComapnaionsList/>
        <CTA/>
       </section>
    </main>
  
)}

export default page