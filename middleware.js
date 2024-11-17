import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// Configuration: Apply middleware only to specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'], // Protect /dashboard and all API routes
};
