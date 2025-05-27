import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn, getSubjectColor } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
  
interface ComapnaionsListProps {
    title:string;
    comapanions:Companion[];
    classNames:string;
}
const ComapnaionsList = ({title , comapanions , classNames}:ComapnaionsListProps) => {
  return (
   <article className={cn('companion-list' , classNames)}>
    <h2 className='font-bold text-3xl'>Recent Learnings</h2>
    <Table>
  <TableHeader className=''>
    <TableRow className='border-0'>
      <TableHead className="text-lg">Lessons</TableHead>
      <TableHead className='text-lg'>Subject</TableHead>
      <TableHead className='text-lg text-right'>Duration</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        comapanions?.map((companion)=>(
            <TableRow key={companion.id} className='border-0'>
                <TableCell>
                    <Link href={`/companions/${companion.id}`}>
                    <div className='flex items-center gap-4'>
                        <div className='size-[62px] flex items-center justify-center rounded-lg max-md:hidden' style={{backgroundColor:getSubjectColor(companion.subject)}}>
                            <Image
                            src={`/icons/${companion.subject}.svg`}
                            alt='Subject'
                            width={35}
                            height={35}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='font-bold text-xl'>
                                {companion.name}
                            </p>
                            <p className='text-lg'>
                                {companion.topic}
                            </p>
                        </div>
                    </div>
                    </Link>
                </TableCell>
                <TableCell>
                    <div className='subject-badge w-fit'>
                        {companion.subject}
                    </div>
                    <div className='flex items-center justify-center rounded-lg w-fit p-2 md:hidden' style={{backgroundColor:getSubjectColor(companion.subject)}}>
                        <Image src={`/icons/${companion.subject}.svg`} alt='subject' width={18} height={18}/>
                    </div>
                </TableCell>
                <TableCell>
                    <div className='flex items-center gap-2 w-full'>
                        <p className='text-2xl'>{companion.duration} {" "} <span className='max-md:hidden'>mins</span></p>
                        <Image src={"/icons/clock.svg"} alt='clock' width={14} height={14} className='md:hidden'/>
                             
                    </div>
                </TableCell>
            </TableRow>
        ))
    }

  </TableBody>
</Table>

   </article>
  )
}

export default ComapnaionsList