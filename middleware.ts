import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
/*NextRequest
→ enhanced version of the web Request→ gives access to:URL,cookies, headers,geo, etc.
-> NextResponse→ used to: -> continue request , redirect, rewrite ,modify headers 
*/

/*This is the only middleware function
Next.js will call this for every incoming request
req represents the incoming HTTP request */

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;                 //req.nextUrl → parsed URL object, pathname → just the path
     

    //route specific middleware
    if (pathname.startsWith("/dashboard")) {
    // auth logic
    }
}
