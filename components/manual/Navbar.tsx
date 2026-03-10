"use client";

/*
why use client
“This file must run in the browser, not on the server.”
Any component with onClick must be a Client Component

make navbar auth state dependent
*/



import Link from 'next/link'
import React from 'react'
import  {useSession,signOut} from 'next-auth/react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type NavbarProps = {
  userName ?: string
}


export default function Navbar({userName}: NavbarProps) {

  const {data : session}= useSession();
  const router= useRouter();

  return (
    <div className='w-full h-20 bg-black flex justify-around items-center text-2xl mb-[2.5%]' >
        <Link href="/dashboard" >Mystery Messenger</Link>
        {session && <p> Welcome {userName}</p>}

        { session ? 
        (<Button onClick={()=> signOut() }  className='cursor-pointer'>Log Out</Button>) :
        (<Button onClick={()=> router.push("/api/auth/signin") }  className='cursor-pointer'>Login</Button>)
        }
    </div>
  )
}
