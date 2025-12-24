import mongoose from "mongoose";

/*
Next.js does not keep a server alive
Each request may start fresh
Without this guard → multiple DB connections 
*/
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}
const dbUrl = process.env.MONGODB_URI;

type ObjConnection={ //define str of obj
    isConnected? : number,   //? :denotes its an optional value
}
const connection: ObjConnection={};



async function connectDb(): Promise <void>{
    if(connection.isConnected){
        console.log("DataBase already Connected");
        return;
    }
    try{
        const result= await mongoose.connect(dbUrl);
        console.log(result);
        connection.isConnected=result.connections[0].readyState;
        console.log("DB connection Successfull");
    }
    catch(error){
        console.log("Connection Unseccefull ",error);
        throw error;
    }
}