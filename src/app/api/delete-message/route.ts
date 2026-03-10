import dbConnect from "@/src/lib/dbConnect";
import Message from "@/src/model/message.model";



export async function GET(request : Request){

    const {searchParams} = new URL(request.url);
    console.log(searchParams);

    await dbConnect();

    try{
        const id= searchParams.get("id");
        const res= Message.findByIdAndDelete(id);
        console.log(res);
    }
    catch(err){
        console.log(err);
    } 
}