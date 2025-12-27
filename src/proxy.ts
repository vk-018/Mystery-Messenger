import { NextResponse, NextRequest } from 'next/server'
//When defining Proxy, the default export function accepts a single parameter, request. This parameter is an instance of NextRequest, which represents the incoming HTTP request
//The NextResponse API allows you to: redirect the incoming request to a different URL, rewrite the response by displaying a given URL
 //The most simple usage is when you want to require authentication for your entire site. You can add a middleware.js file with the following:
export { default } from "next-auth/middleware"  //set matches accordingly if u want authentication on that file only
//If a user is not logged in, the default behavior is to redirect them to the sign-in page.
import { getToken } from "next-auth/jwt"      //used to get the jwt




// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const token=await getToken({req:request});
    //current url
    const url= request.nextUrl;
    if(token &&                  //if not logged in we know redirect to sign but if already logged in ,
        ( 
        url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/sign-up") ||
        url.pathname.startsWith("/verify")  ||
        url.pathname.startsWith("/")
        )){
             return NextResponse.redirect(new URL('/dashboard', request.url))
        }


    
  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {       //thiese are paths before which proxy fn code will cme ito effect
  matcher: ['/sign-in', '/sign-up', '/','/dashboard/:path*','/verify/:path*']
  //all the paths of dashboard are covered, same for verify
}
