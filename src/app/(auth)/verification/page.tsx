'use client'
import React, { useState } from 'react'
import User from '@/src/model/user.model'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import {
  Form,    //Connects your UI form to React Hook Form context.  //Provides form state (errors, control, values) to all children
  FormControl,   //Wraps the actual input element.    //Applies error styling
  FormDescription,       //Optional helper text under the field.
  FormField, //Binds a single field to React Hook Form.  //➡️ This replaces register("email") in a cleaner way.
  FormItem,     //Wraps one complete form field block.
  FormLabel,   //Accessible label for the input.
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
const otpZodSchema= z.object({
    username:z.string()
        .trim()
        .min(1, "Username is required"),
    otp: z.string()
         .length(6, "Enter a valied 6 digit otp")
});



//not pushing anything inside db so no validation needed

export default function Verification() {
  const router = useRouter();          //alternative of use Navigate
  const [message,setMessage]= useState("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof otpZodSchema>>({
    resolver: zodResolver(otpZodSchema),
    defaultValues: {       //Since FormField is using a controlled component, you need to provide a default value for the field. 
      username:"",
      otp:"",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof otpZodSchema>) {
    // Do something with the form values. // ✅ This will be type-safe and validated.
    console.log(values);
    try{
      //post req format is path,data,config
      const result= await axios.post("/api/verify-code", values);
      //extract data
      const data=result.data;
      console.log(data);
      if(data.success){  //user registered , otp sent , redirect to page where otp will be entered
        router.push("/api/auth/signin");
      }
      
    }catch(err : any){
      if(err.response){          //this is a valid response from backend side
        console.log("API error:", err.response.data);
        setMessage(err.response.data.message);

        setTimeout(()=>{
          setMessage("")
        }, 1000*5
        );
        
      }
      else{
        console.log("sign up api call went wrong",err);
      }
    }
    form.reset();
  }

  return (
    <div className="otpPageContainer h-screen flex justify-center items-center flex-col bg-slate-900" >
    <Form {...form} >      {/**Wraps the entire form in React Hook Form context  ,  form comes from use form */}
     <div className="otpFromContainer border-2 border-white rounded-lg p-8  w-[25%] bg-zinc-900">
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-8"
      noValidate>
         <FormField 
          control={form.control}
          name="username"
          render={({ field ,fieldState}) => (
            <FormItem className="mb-4">
              <FormLabel>Username</FormLabel>
               {/**Automatically connects:Value ,Change handler ,Blur handler form control expects exactly one child no comments also*/ }
              <FormControl>
                <Input type="text" placeholder="eg virat" {...field} />        
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="otp"
          render={({ field ,fieldState}) => (
            <FormItem className="mb-4">
              <FormLabel>Verification Code</FormLabel>
               {/**Automatically connects:Value ,Change handler ,Blur handler form control expects exactly one child no comments also*/ }
              <FormControl>
                <Input type="text" placeholder="Enter a 6 digit verification Code" {...field} />        
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
            type="submit"
            disabled={form.formState.isSubmitting}          
            className="mx-auto block cursor-pointer"
            >Submit
        </Button>
 
      </form>
      <p> {message}</p>
      
     </div>
    </Form>
    </div>
  )
}

