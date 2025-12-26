import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/model/user.model";
import bcrypt from 'bcrypt';
import sendVerificationEmail from "@/src/helper/sendVerificationEmail";
import { success } from "zod";
import {UserZodSchema} from "@/src/schemas/user.schema";
import crypto from "crypto";

export default async function POST(request:Request) {          //defining a post request at /api/sign-up
    //first connect data base
    await dbConnect();
    try{
        //console.log(request.json());
        const {userName,email,password}= await request.json();

        

        let userNameUser= await User.findOne({userName:userName});
        if (userNameUser) {               //once a username is booked its booked  -> standard approach
            return Response.json({
                success:false,
                message: "Username already taken",
            },{status:400});
        }

        //check weather this email already exist
        let emailUser= await User.findOne({email :email});       //find return an array
        console.log(emailUser,userNameUser);
        if (emailUser?.isVerified) {
            return Response.json({
                success:false,
                message: "Email already taken",
            },{status: 400});
        }
        //if none of the username and email belong to a verified user -> create new  // or replace if it belong to an verified user
        //else if user exist replace if didnot exist insert
        
            const saltRound: number=10;
            const hashedPassword: string=await bcrypt.hash(password,saltRound);
            
            const expiryDate=new Date();              //const objects are mutuable 
            expiryDate.setHours(expiryDate.getHours()+1);
             
            const otp:string=crypto.randomInt(100000,1000000).toString();    //endter range of crypto generation
            const hashedOtp=await bcrypt.hash(otp,saltRound);

            //send verification email
            const emailSend=await sendVerificationEmail(email,userName,otp);
            //if failed
            if(!emailSend.success){
                return Response.json({
                    success:false,
                    message: emailSend.message,
                },{status:500});
            }


            const parse=UserZodSchema.safeParse({
                userName:userName,
                email:email,
                password:hashedPassword,
                verifyCode:hashedOtp,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });
            if(!parse.success){
                return Response.json({
                    success: false,
                    message:"Failed to Register",
                },{status:400})
            }
            await User.replaceOne({email:email},parse.data,{upsert:true});        //replace if exist otherwise insert
            return Response.json({
                 success:true,
                 message:"User Registered, Please verify Your Email"
            },{status: 201});
    }
    catch(err){
        console.log("Failed to Register",err);
        return Response.json({
            success: false,
            message: "Failed to Register",
        },
        { status:500},
        )
    }
}

