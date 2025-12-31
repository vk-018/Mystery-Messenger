import dbConnect from "@/src/lib/dbConnect";
import Message from "@/src/model/message.model";
import User from "@/src/model/user.model";
import bcrypt from "bcrypt";

//never export default in next js
export async function POST(request:Request) {

    //Step 1: connect db
    await dbConnect();
    try{
        const {userName,otp}=  await request.json();
        //some times the url recieved values are not in proper format
        const decodedUserName= decodeURIComponent(userName);
        
        //now verify this gut
        const user= await User.findOne({userName: decodedUserName});
        if(!user){
            return Response.json({
                success: false,
                Message: "No user found with this Username",
            });
        }
        if(user.isVerified){
            return Response.json({
                success: true,
                Message: "User already verified",
            });
        }
        //check for time expiry and bcypt passowrd matcher

        const isNotExpired = user.verifyCodeExpiry > new Date();
        const isValid : boolean=await  bcrypt.compare(otp,user.verifyCode);
        
        if(isNotExpired && isValid){
            user.isVerified=true;
            await user.save();
            //console.log(user);
            return Response.json({
                success: true,
                Message: "status changed to verified",
            });
        }
        else{
            return Response.json({
                success: false,
                Message: "Otp Expired / is Not Valied",
            });
        }
    }
    catch(err){
        console.log("Verification Failed", err);
        return Response.json({
            success:false,
            message: "Otp Verification failed",
        });
    }
    
    
}