"use client"
import { formUrlQuery } from '@jsmastery/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchInput = () => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic')|| '';
    const [searchQuery, setsearchQuery] = useState('');
    useEffect(()=>{
        if(searchParams){
           const newUrl = formUrlQuery({
            params:searchParams.toString(),
            key:'topic',
            value:searchQuery
           });
           router.push(newUrl , {scroll:false})
        }
    } , [searchQuery , router , searchParams , pathName])
  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-1 py-1 h-fit'>
        <Image src={"/icons/search.svg"} alt='search' width={15} height={15}/>
        <input placeholder='Search Companions...' className='outline-none'
        value={searchQuery}
        onChange={(e)=>setsearchQuery(e.target.value)}
        />
    </div>
  )
}

export default SearchInput