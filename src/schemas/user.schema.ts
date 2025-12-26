import {z} from 'zod'; 
//spl for msg: 

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);

const UserZodSchema=z.object({
    userName:z.string(),
    email: z.string().email(),
    password: z.string(),
    verifyCode: z.string(),
    verifyCodeExpiry: z.coerce.date(),        //The input type of these coerced schemas is unknown by default.-> as incoming data will be json
    isVerified: z.boolean().default(false),
    isAcceptingMessages: z.boolean().default(true),
    messages: z.array(objectId).optional(),
});
type UserZodSchemaType= z.infer<typeof UserZodSchema>;
export {UserZodSchema};
//the type we created do not exist on runtime so export method is different
export type {UserZodSchemaType};