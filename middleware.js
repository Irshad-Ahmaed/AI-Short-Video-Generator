// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

// export default clerkMiddleware(async (auth, req) => {
//     if (isProtectedRoute(req)) await auth.protect()
//   })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// Configuration: Apply middleware only to specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'], // Protect /dashboard and all API routes
};
