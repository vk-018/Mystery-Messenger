import User from "@/src/model/user.model";
import Message from "@/src/model/message.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";      //session need authOptions
import dbConnect from "@/src/lib/dbConnect";

//route to fetch all the messages
export async function GET(request : Request){
    await dbConnect();
    try{
        const session= await getServerSession(authOptions);
        if(!session || !session.user){
            return Response.json({
            success: false,
            message: "Not authenticated"
        },
             { status: 401 }
        );  
        }

        const id= session.user._id;
        
        const user=await User.findById(id)   ////populate and return specific field
        .populate({
            path: "messages" ,
            select: "content",
            options: {sort : {createdAt : -1}}
        });    
        
        if(!user){
            return Response.json({       //will likely never get executed
            success: false,
            message: "User not found"
        });
        }
        return Response.json({
            success: true,
            message: "messages retrieved",
            messages: user.messages,
        });


    }
    catch(err){
        console.log("Could not fetch messages", err);
        return Response.json({
            success: false,
            message: "Could not fetch all the messages"
        })
    }
}
