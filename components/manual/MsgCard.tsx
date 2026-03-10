"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PaginationDemo } from './Paginations'
import axios from 'axios';



export default function MsgCard() {

    //define type of content to be shown
    type msg= {
        content : string,
        createdAt: string,    //json data is always string 
    }
    //set 4 states 
   let [msg,setMsg]= useState<msg[]>([]);
   let [currPage,setCurrPage]=useState(1);
   let [totalMsg,setTotalMsg]= useState(0);
   let [loading,setLoading]= useState(false);

  const limit : number=1;    //one msg at atime

  async function getMsg(){
    setLoading(true);
    const response= await axios.get(`/api/get-message?page=${currPage}&limit=${limit}`);
    setMsg(response.data.data);
    setTotalMsg(response.data.totalPages);
    setLoading(false);
  }
  
  useEffect(() => {
    const useFn= async () => {
      await getMsg();
    }
    useFn();
  },[currPage]);


  return (
    <div className='text-black w-[25%] m-auto mt-5'>
      <h1>No Messages yet..</h1>
    {loading && <p>Loading</p>}

    {!loading && msg.map((element) => {
        return <div className='text-black' >
        <Card  className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>
          This card uses the small size variant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The card component supports a size prop that can be set to
        </p>
      </CardContent>
      <CardFooter>
        <PaginationDemo />
      </CardFooter>
    </Card>
    </div>
    })}
    
  </div>
  )
}
