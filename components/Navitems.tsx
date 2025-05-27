'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const navItems = [
    {label:'Home' , href:'/'},
    {label:'Companions' , href:'/companions'},
    {label:'My Journy' , href:'my-journy'}
]
const Navitems = () => {
    const pathName = usePathname();
  return (
  <nav className='flex items-center gap-4'>
  {navItems.map(({label , href})=>{
    const isActive = pathName === href
    return(
    <Link href={href} key={label}> <span className={`${isActive ?'text-primary font-semibold':''}`}>{label}</span></Link>
)})}
  </nav>
  )
}

export default Navitems