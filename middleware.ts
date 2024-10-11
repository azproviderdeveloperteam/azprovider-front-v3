import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get the auth token from cookies
    const cookieToken = request.cookies.get('cookieToken')?.value;
    console.log(cookieToken)
    // If the token exists, set it in the Authorization header for the request
    if (cookieToken) {
        request.headers.set('Authorization', `Bearer ${cookieToken}`);
    }

    return response;
}

// Define routes where the middleware should run (e.g., for the dashboard)
export const config = {
    matcher: ['/:path*'],
};