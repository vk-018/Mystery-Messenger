import mongoose,{Document} from 'mongoose';
import {z} from 'zod';


const messageZodSchema= z.object({
    content: z.string(),
    createdAt: z.date().optional(),
});

type msgSchema= z.infer <typeof messageZodSchema>;

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


const Message= mongoose.model<msgSchema> ("Message",messageSchema);   

export default Message;