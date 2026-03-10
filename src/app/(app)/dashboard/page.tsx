"use client"
import React, { useState } from 'react'
import Navbar from '@/components/manual/Navbar'
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RotateCw } from 'lucide-react';
import MsgCard from '@/components/manual/MsgCard'


export default function Dashboard() {

  let [label,setLabel]=useState("Copy");
  let [msgState, setMsgState]= useState(true);


  async function copy(text : string){
      try{
         await navigator.clipboard.writeText(text);
         setLabel("Copied!");
         setTimeout(()=> {
            setLabel("Copy");
         }, 500)
      }
      catch(err){
        console.log("Copying Failed", err);
      }
  }
  return (
    <div className="min-h-screen bg-white">

      <Navbar userName="Abhay"/>

      <div className='text-black w-[70%] m-auto' >
        <h1 className='font-serif text-4xl mb-5'>User Dashboard</h1>
        <p className='text-xl mb-1'>Copy Your Unique Link</p>

        <Field orientation="horizontal" className='mb-3'>
          <Input type="search" value={"/link"} readOnly/>
          <Button onClick={()=> copy("text")}   className='cursor-pointer'>{label}</Button>
        </Field>

        <div className="flex items-center space-x-2 mb-7" >
          <Switch id="airplane-mode" className='cursor-pointer' />
          <Label htmlFor="airplane-mode" className='cursor-pointer'>Accept Messages : {msgState ? "On" : "Off"}</Label>
          
        </div>
        <hr className='border-black'/>

        <div className='flex'>
        <Button  variant='ghost' size="icon" className='cursor-pointer'>
          <RotateCw />
        </Button>
        <p className='mt-1'>Refresh</p>
        </div>
      </div>

      <div>
        <MsgCard />
      </div>
    </div>
  )
}

