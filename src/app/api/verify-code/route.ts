import dbConnect from "@/src/lib/dbConnect";
import Message from "@/src/model/message.model";
import User from "@/src/model/user.model";
import bcrypt from "bcrypt";

//never export default in next js
export async function POST(request:Request) {

    //Step 1: connect db
    await dbConnect();
    try{
        const {username,otp}=  await request.json();
        // console.log(username);
        //some times the url recieved values are not in proper format
        const decodedUserName= decodeURIComponent(username);
        // console.log(decodedUserName);
        //now verify this gut
        const user= await User.findOne({userName: decodedUserName});
        console.log(user);
        if(!user){
            return Response.json({
                success: false,
                message: "No user found with this Username",
            },{status:401});
        }
        if(user.isVerified){
            return Response.json({
                success: true,
                message: "User already verified",
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
                message: "status changed to verified",
            });
        }
        else{
            return Response.json({
                success: false,
                message: "Otp Expired / is Not Valid",
            },{status:401});
        }
    }
    catch(err){
        console.log("Verification Failed", err);
        return Response.json({
            success:false,
            message: "Otp Verification failed",
        },{status:401});
    }
    
    
}