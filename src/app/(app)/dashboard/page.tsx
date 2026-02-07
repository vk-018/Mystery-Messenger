import React from 'react'
import Navbar from '@/components/manual/Navbar'
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"



export default function Dashboard() {

  async function copy()
  return (
    <div className="min-h-screen bg-white">

      <Navbar userName="Abhay"/>

      <div className='text-black '>
        <h1 className='font-serif text-4xl'>User Dashboard</h1>
        <p className='text-xl'>Copy Your Unique Link</p>

        <Field orientation="horizontal" className='w-3/4'>
          <Input type="search" value={"/link"} />
          <Button>Copy</Button>
        </Field>
      </div>
      

    </div>
  )
}

