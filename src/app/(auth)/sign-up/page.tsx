'use client'  //By default, all components are Server Components. Adding "use client" makes a file run in the browser.

import React , { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import axios from 'axios';
import { signIn } from "next-auth/react"
//import  { useNavigate } from 'react-router-dom';   - react router dom is not used 
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
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



//define schema for validation
const UserZodSchema=z.object({
    userName:z.string()
    .trim()
    .min(1, "Username is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string()
    .trim()
    .min(1,"Please enter a valid Password"),
});



export default function SignUp() {
  const router = useRouter();          //alternative of use Navigate
  let [message,setMessage]= useState("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserZodSchema>>({
    resolver: zodResolver(UserZodSchema),
    defaultValues: {       //Since FormField is using a controlled component, you need to provide a default value for the field. 
      userName: "",
      email:"",
      password:"",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserZodSchema>) {
    // Do something with the form values. // ✅ This will be type-safe and validated.
    console.log(values);
    try{
      //post req format is path,data,config
      const result= await axios.post("/api/sign-up", values);
      //extract data
      const data=result.data;
      console.log(data)
      if(data.success){  //user registered , otp sent , redirect to page where otp will be entered
        router.push("/verification");
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
    <div className="signUpPageContainer h-screen flex justify-center items-center flex-col bg-slate-900" >
    <Form {...form} >      {/**Wraps the entire form in React Hook Form context  ,  form comes from use form */}
     <div className="signUpFromContainer border-2 border-white rounded-lg p-8  w-[25%] bg-zinc-900">
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-8"
      noValidate>
      
        <FormField 
          control={form.control}
          name="userName"
          render={({ field ,fieldState}) => (
            <FormItem className="mb-4">
              <FormLabel>Username</FormLabel>
               {/**Automatically connects:Value ,Change handler ,Blur handler form control expects exactly one child no comments also*/ }
              <FormControl>
                <Input type="text" placeholder="Enter Your Username" {...field} />        
              </FormControl>
              {!fieldState.error && (
                  <FormDescription>
                   This is your public display name.
                 </FormDescription>
              )
              }
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field ,fieldState}) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your Email" {...field} />        
              </FormControl>
              {!fieldState.error && (
              <FormDescription>
                This will be used for otp verification.
              </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your Password" {...field} />         
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
      {<p className="mt-2">{message}</p>}
     </div>
    </Form>
     {/*better than mention api endpoint let next auth handle it */}
    <p className="mt-2">Already have an Account? <button onClick={() => signIn()}   className="text-orange-500 cursor-pointer">Sign in</button></p>
    </div>
  )
}

