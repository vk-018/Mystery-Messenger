//import { getServerSession } from "next-auth";
//import { authOptions } from "../auth/[...nextauth]/options";           //it needs auth ptions which we created
import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/model/user.model";
import Message from "@/src/model/message.model";
//import { success } from "zod";


//lets begin
//push the message id in the users message array , and user id as owner on message object

export async function POST(request:Request) {
    await dbConnect();
    try{
        const {userName ,message}= await request.json();      //try to get email if possible
        //any one can send message ,no auhentication changes

        //const user_id=session.user._id;
        const user= await User.findOne({userName: userName});
        if(!user || !user.isAcceptingMessages){
            return Response.json({
                success: false,
                message: "Either no user found / User not accepting messages",
            });
        }


        const decodedMsg= message;    
        const date= new Date();
        const owner=user._id;
        
        const Msg= new Message({
            content: decodedMsg,
            owner: owner,
            createdAt: date,
        });

        await Msg.save();
        user.messages.push(Msg._id);     //push just the id
        await user.save();

        return Response.json({
            success: true,
            message: "Message added successfully"
        });
    }
    catch(err){
        console.log("FAiled to get message",err);
        return Response.json({
                success: false,
                message: "Message sending failed",
        });
    }
}