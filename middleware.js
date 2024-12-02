// import { NextResponse } from "next/server";

import { auth } from "./lib/auth"

// export function middleware(request){
//   return NextResponse.redirect(new URL("/about", request.url))
// }


export const middleware = auth

export const config = {
  matcher: ["/account"]
}