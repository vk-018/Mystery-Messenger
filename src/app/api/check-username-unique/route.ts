import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/model/user.model";
import { success } from "zod";

export async function POST(request: Request) {

    await dbConnect();
    try{
       
        const {userName}=await request.json();
        //console.log(userName);
        const user= await User.findOne({userName: userName});     //doesnt matter its verified or not
        if(!user){
            return Response.json({
            success:true,
            message: "Username available",
        });
        }
        else{
            return Response.json({
            success:false,
            message: "Username already taken",
        });
        }
    }
    catch(err){
        console.log("User name check went wrong", err);
        return Response.json({
            success:false,
            message: "User name check went wrong",
        });
    }
}