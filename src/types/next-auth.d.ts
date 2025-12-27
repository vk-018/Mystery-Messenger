import "next-auth";


//we are forcing next -auth to recognize our user object as this
declare module 'next-auth' {
    interface User{
        _id?: string;
        isVerified: boolean,
        isAcceptingMessage: boolean,
        userName? :string,
    }

    interface Session{
        user : User,
    }
}