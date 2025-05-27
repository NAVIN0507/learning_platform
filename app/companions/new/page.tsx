import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async() => {
  const {userId}  =await auth();
  return (
   <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center'>
    <article className='w-full gap-4 flex  flex-col'>
      <h1>Companion Builder</h1>
      <CompanionForm userId= {userId}/>
    </article>
   </main>
  )
}

export default page