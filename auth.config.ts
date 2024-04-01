import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
const genralPath = [
  "/about-us",
  "/signin",
  "/signup",
  "/forgot-password",
  "/contact-us",
];
//* clean up this function
export const authConfig = {
  providers: [credentials],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/todo");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        console.log("You are not logged in");
        return Response.redirect(new URL("/todo", nextUrl));
      } else if (!isOnDashboard && !isLoggedIn) {
        if (
          nextUrl.pathname.startsWith("/about-us") ||
          nextUrl.pathname.startsWith("/signin") ||
          nextUrl.pathname.startsWith("/signup") ||
          nextUrl.pathname.startsWith("/forgot-password") ||
          nextUrl.pathname.startsWith("/contact-us")
        )
          return true;
        else return false;
      }
      return true;
    },
    async session({ session, user }) {
      return session;
    },
  },
} satisfies NextAuthConfig;
