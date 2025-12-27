import mongoose from 'mongoose';
import {z} from 'zod';      //it does not have any default updates
//use interface to force ts to force safety scheks over mongoose schema, now we will get error during compilation only not runtime
import Message from './message.model';
import {UserZodSchema} from '../schemas/user.schema';
//1. declare z schema



//Infer TypeScript type from Zod  - no  need to define interface obj....
type schema1 = z.infer<typeof UserZodSchema>;

//✔ No duplicate typing,✔ TS auto-syncs with Zod


//Create Mongoose schema from Zod (manual but safe)
/*This:

✔ gives TypeScript typing
✔ helps during development
❌ does NOT validate runtime input
❌ does NOT run when new User() is called
 */
const UserSchema= new mongoose.Schema<schema1>({      //satisfies wont work for mongoose schema

    userName: {
        type:String,
        required: true,
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },

    password: {
        type:String,
        required:true,
    },
    
    verifyCode:{
        type: String,
        required: true,
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
    },
    isVerified: {
        type:Boolean,
        required: true,
        default:false,
    }   ,

    isAcceptingMessages:{ 
        type:Boolean,
        default:true,
    },
    //establish a one to many relationship
    messages: [{
        type: mongoose.Types.ObjectId,
        ref:"Message",
    }],
}) ;


//delete all messages if deleteing user
UserSchema.post("findOneAndDelete",async(data)=>{    //data is the object which got deleted      -> dont use Wrapasync You are correct: using wrapAsync (or similar error-handling wrappers) is not compatible with Mongoose middleware, especially with post middleware
    console.log("middleware triggered");
    if(data && data.messages.length){      //if it containes any reviews
        let result=await Message.deleteMany({_id: {$in: data.message}});
        console.log(result);
    }
});

//create model

const User= mongoose.models.User || mongoose.model<schema1>("User",UserSchema);
export default User;