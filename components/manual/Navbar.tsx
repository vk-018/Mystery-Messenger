"use client";

/*
why use client
“This file must run in the browser, not on the server.”
Any component with onClick must be a Client Component
*/



import Link from 'next/link'
import React from 'react'
import  {signOut} from 'next-auth/react';
import { Button } from '../ui/button';

type NavbarProps = {
  userName: string
}


export default function Navbar({userName}: NavbarProps) {
  return (
    <div className='w-full h-20 bg-black flex justify-around items-center text-2xl' >
        <Link href="/dashboard" >Mystery Messenger</Link>
        <p> Welcome {userName}</p>
        <Button onClick={()=> signOut() }  className='cursor-pointer'>Log Out</Button>
    </div>
  )
}
