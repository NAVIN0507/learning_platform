import CompanianCard from '@/components/CompanianCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import { getAllCompanions } from '@/lib/companion.action';
import { getSubjectColor } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react'

const ComapanionsLibrary = async({searchParams}:SearchParams) => {
  const filter = await searchParams;
  const subject = filter.subject ? filter.subject : '';
  const topic = filter.topic ? filter.topic :'';
  const companions = await getAllCompanions({subject , topic});
  if(!companions) return redirect("/")
  console.log(companions)
  return (
   <main>
    <section className='flex justify-between gap-4 max-sm:flex-col'>
      <h1>Companion Library</h1>
      <div className='flex gap-4'>
        <SearchInput/>
        <SubjectFilter/>
      </div>
    </section>
    <section className='companions-grid'>
      {companions.map((companion)=>(
        <CompanianCard {...companion} key={companion.id} color={getSubjectColor(companion.subject)}/>
      ))}
    </section>
   </main>
  )
}

export default ComapanionsLibrary