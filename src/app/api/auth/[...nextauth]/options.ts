import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/model/user.model";
import GoogleProvider from "next-auth/providers/google";

// ...
// providers: [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
//   })
// ]
// ...

export const authOptions: NextAuthOptions ={

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: "Email or Username", type: "text", placeholder: "Enter Your Username or Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req): Promise<any>  {     //write the logic which wither return user or it return null

                //first check db connection
                await dbConnect();
              try{
                const user= await User.findOne({
                  $or: [{ userName: credentials.identifier }, { email: credentials?.identifier}]
                });
                if(user){
                    let result=await  bcrypt.compare(credentials.password , user.password);
                    if(result){
                        return user;
                    }
                    else{
                        return null;
                    }
                }
                else{
                    return null;
                    // if(!user){
                    //   //throw new Error('No user Found with these credentials')
                      
                    //}
                    // if(!user.isVerified){
                    //     return null;
                    //     //throw new Error('Please Verify your your account');
                    // }
                }
            }catch(err: any){
                console.log("Loogin Failed",err);
                throw new Error(err);           //this si necessary bcoz the fn is expected to gove user or null...so error will may get same treatment as null case 
            }
            }
        })
    ],

    //NextAuth.js automatically creates simple, unbranded authentication pages for handling Sign in, Sign out, Email Verification and displaying error messages.
    //The pages config tells NextAuth: “Don’t use your default UI — use my routes instead.”
    pages: {
        //signIn: '/sign-in
        //default ui available at auth/api/signin
    },
    session:{
        strategy:"jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,   //:🔐 Sign JWTs

    callbacks:{
         async signIn({user }) {    //note in provider we returned user even when not verified
            if(user && !user.isVerified){
                return false;       //block sign in
            }
            else{
              return true;
            }
         },
         async jwt({ token, user }) {  //Runs when JWT is created or updated              
           if (user) {      //put most of the user info in this -> this will increase payload but it will reduce db quries
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.isAcceptingMessage = user.isAcceptingMessage;
            token.userName = user.userName;
          }
          return token;
         },

         async session({ session, token }) {    //Controls what data is sent to the client, Anything not added here is NOT available on frontend
            if (token) {      //put most of the user info in this -> this will increase payload but it will reduce db quries
              //when ssession strategy is set to jwt only token is available with session
            session.user._id = token._id as string;
            session.user.isVerified = token.isVerified as boolean;
            session.user.isAcceptingMessage = token.isAcceptingMessage  as boolean;
            session.user.userName = token.userName as string;
          }
            return session
         },
    }
    
    
}

/*
NextAuth has a default flow:

Sign in → Create token → Create session → Redirect user

Callbacks let you step into this flow and:

Add custom fields (userId, role)
Control who can sign in
Modify JWT or session data
Customize redirects


session.strategy: "jwt"

This tells NextAuth how to store and manage user sessions.
What "jwt" means

Session data is stored in a JSON Web Token
The token is signed and encrypted
Stored in a secure cookie on the client
No database required for sessions

How it works (step by step)
User logs in successfully
NextAuth creates a JWT
JWT is stored in the browser cookie

On each request:
Cookie is sent
JWT is verified
Session data is reconstructed

Why it’s commonly used

✅ Faster
✅ Scales well (serverless-friendly)
✅ No session table needed

Alternative: "database"
session: {
  strategy: "database",
}


Session stored in DB
Requires a sessions table


providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
     
      const user = user data

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
]*/
