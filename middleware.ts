// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
//
// export function middleware(request: NextRequest) {
//     console.log("No JWT cookie found")
//
//     const allCookies = request?.cookies.getAll()
//     if (!request?.cookies.has("jwt")) {
//         console.log("No JWT cookie found")
//         return NextResponse.redirect(process.env.BASE_URL!)
//     }
//
//     let cookie = request?.cookies.get('jwt')?.value
//     // console.log(cookie)
//     return NextResponse.next()
// }
//
//
// export const config = {
//     matcher: '/dashboard/:path*',
// }