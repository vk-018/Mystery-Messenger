import { resend } from "../lib/resend";
import VarificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "../type/ApiResponses";
import React from 'react'

export default async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode:string,
) : Promise<ApiResponse>{
    try{
      await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verification Email',
      react: VarificationEmail({ username: username, otp: verifyCode}),
      });

      return {success: true, message:"Email sent successfully"}

    }catch(error){
        console.log("Error sending email",error);
        return {success: false,message: "Email sending Failed"};
    }
  
}
