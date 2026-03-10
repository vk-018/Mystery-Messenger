import User from "@/src/model/user.model";
import Message from "@/src/model/message.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";      //session need authOptions
import dbConnect from "@/src/lib/dbConnect";
//import { useSearchParams } from "next/navigation";   - shd be used only on client side 


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
        
        //we are implementing pagination so we are expecting page and limit from front end

        const { searchParams } = new URL(request.url);
        console.log(searchParams);
        const page : number= Number(searchParams.get("page")) ??  1;
        const limit : number = Number(searchParams.get("limit"))  ?? 1;

        const user=await User.findById(id)   ////populate and return specific field
        .populate({
            path: "messages" ,
            select: "content",
            options: {
                sort : {createdAt : -1},
                skip: (page*limit -limit),
                limit: limit,
            },
        });

        const totalMessages = await Message.countDocuments({ user: id });      //user id is stored in front of each msg

        
        
        if(!user){
            return Response.json({       //will likely never get executed
            success: false,
            message: "User not found"
        });
        }
        return Response.json({
            success: true,
            message: "messages retrieved",
            //always return 5 things
            page,
            limit,
            totalMsg: user.messages.length,
            totalPages : totalMessages,       //one msg each page
            data: user.messages,
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
