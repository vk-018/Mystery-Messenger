import mongoose,{Document} from 'mongoose';
import {z} from 'zod';


export const messageZodSchema= z.object({
    content: z.string(),
    createdAt: z.date().optional(),
});

export type msgSchema= z.infer <typeof messageZodSchema>;

const messageSchema= new mongoose.Schema<msgSchema>({
    content: {
        type:String,
        required:true,
        trim:true,
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