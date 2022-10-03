import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {

    //Token only exists if user logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl

    // Allow the request if:
    //  Token exists
    if (pathname.includes('/api/auth') || token ) {
        return NextResponse.next()
    }

    // Redirect if no token and requesting protected route
    if (!token && pathname !== "/login" ) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: '/'
}