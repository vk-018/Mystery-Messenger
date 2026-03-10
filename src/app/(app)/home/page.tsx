"use client"

import React from 'react'
import Navbar from '@/components/manual/Navbar'

//step 1: set up zos schema for ur form
import * as z from "zod"

const formSchema = z.object({
  link: z
    .string()
    .min(1, "Link is required")
    .url("Please enter a valid URL"),
});

//step 2: use use form and connect with zod resolver to validate data
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

//step 3; building the form
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";


export default function Page() {
//2.2
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  //2.3
  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data)
  }



  return (
    <div className='min-h-screen bg-gray-500 dark:bg-gray-500 relative flex-col justify-center '>
        <Navbar/>
        <h1>Dive into the World of Anonymous Feedback</h1>
        <p>True Messeger - where your identity remains a secret</p>

       {/**step 3 is to build the form using rhf */}

         <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="form-rhf-demo-link">
                Link
              </FieldLabel>

              <Input
                {...form.register("link")}
                id="form-rhf-demo-link"
                placeholder="Paste the Anonymous link here..."
              />

              {form.formState.errors.link && (
                <FieldError errors={[form.formState.errors.link]} />
              )}
            </Field>
          </FieldGroup>

          <Button type="submit" className="mt-4">
            Submit
          </Button>

        </form>


        <footer className="bg-gray-900 text-white text-center py-6 w-full absolute bottom-0">
          <p className="text-sm">
            © {new Date().getFullYear()} Mystery Messenger. All rights reserved.
          </p>
        </footer>


    </div>
  )
}
