import User from "@/src/model/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";      //session need authOptions
import dbConnect from "@/src/lib/dbConnect";

export async function POST(request: Request) {
    await dbConnect();
    try{

        //get session object but it will be avl only is user loged i - i.e. why we need the authoptions
        const session= await getServerSession(authOptions);
        if(!session || !session.user){
            return Response.json({
            success: false,
            message: "Not authenticated",
        });
        }
        const user_id= session.user._id;    //extract it later from the sessio
        const {isAccepting} = await request.json();
        const user = await User.findById(user_id);
    //no case when user logged in but we cant find so user always not null
        user.isAcceptingMessages= isAccepting;
        await user.save();
        return Response.json({
            success: true,
            message: "Message Status Changed Successfully",
        });
    }
    catch(err){
        console.log("Failed to change the status",err);
        return Response.json({
            success: false,
            message: "Failed to change Message Accepting Status",
        });
    }
}

//we will also have a get response for this route where we just get the current status of the user abt accespting messges
export async function GET(request: Request) {
    await dbConnect();
    try{

        //get session object but it will be avl only is user loged i - i.e. why we need the authoptions
        const session= await getServerSession(authOptions);
        if(!session || !session.user){
            return Response.json({
            success: false,
            message: "Not authenticated",
        });
        }

        const user_id= session.user._id;    //extract it later from the sessio
        
        const user = await User.findById(user_id);
        //no case when user logged in but we cant find so user always not null
        
        return Response.json({
            success: true,
            message: "Message Status retirved Successfully",
            isAcceptingMessages : user.isAcceptingMessages,
        });
    }
    catch(err){
        console.log("Failed to get the status",err);
        return Response.json({
            success: false,
            message: "Failed to get Message Accepting Status",
        });
    }
}