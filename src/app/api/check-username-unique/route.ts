import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/model/user.model";
import { success } from "zod";

export async function GET(request: Request) {

    await dbConnect();
    try{
        //url is like : local:3000/api/cuu.../username?=abhay     //so username is getting passed as query parameter
        //extracting query parameter
        const {searchParams}= new URL(request.url);      //this is gives all queries
        //now extract required qury
        const userName= searchParams.get('userName');
        //we can write query parameter in the url using ?key=value  format

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