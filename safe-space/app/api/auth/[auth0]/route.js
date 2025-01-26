// app/api/auth/[auth0]/route.js
// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
{/* <a href="/api/auth/login">Login</a> */}
