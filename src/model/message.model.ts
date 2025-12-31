import mongoose,{Document} from 'mongoose';
import {z} from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/); 
export const messageZodSchema= z.object({
    content: z.string(), 
    createdAt: z.date().optional(),
});

export type msgSchema= z.infer <typeof messageZodSchema>;     //will be used only for api response validation


const messageSchema= new mongoose.Schema({
    content: {
        type:String,
        required:true,
        trim:true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    }
});

//this is imp for next js at every time it compile is tries to overwrite this model , so we want to create it first time then reusee id exists
const Message =
  mongoose.models.Message ||
  mongoose.model<msgSchema>("Message", messageSchema);

export default Message;