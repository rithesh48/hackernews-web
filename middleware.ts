// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"; // Helper for cookies

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to sign-in if no session
  }

  return NextResponse.next(); // Proceed if session exists
}

export const config = {
  matcher: [
    "/posts/create-post/:path*",
    "/posts/comment-post/:path*",
    "/posts/delete-post/:path*",
    "/posts/like-post/:path*",
    "/users/my-profile",
  ], // Protect these routes
};