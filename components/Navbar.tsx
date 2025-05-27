import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navitems from './Navitems'
import {SignInButton  , SignedIn , SignedOut , UserButton} from "@clerk/nextjs"
const Navbar = () => {
  return (
  <nav className='navbar'>
    <Link href={'/'}>
    <div className='flex items-center gap-2.5 cursor-pointer'>
        <Image src={"/images/logo.svg"}
        alt='logo'
        width={46}
        height={44}
        />
    </div>
    </Link>
    <div className='flex items-center gap-8'>
        <Navitems/>
        <SignedOut>
            <div className='flex items-center gap-2'>
                <SignInButton>
                    <button className='btn-signin'>SignIn</button>
                </SignInButton>
            </div>
        </SignedOut>
        <SignedIn>
            <UserButton afterSignOutUrl='/'/>
        </SignedIn>
    </div>
  </nav>
  )
}

export default Navbar