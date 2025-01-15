import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      //authorization: { params: { scope: 'read:user user:email' } },
    })
  ],
//   callbacks: {
//     async signIn({ user }) {
//       const email = user.email!;
//       const name = user.name!;
//       console.log(email);
//       console.log(user)
// ;      // check if the user is already in the database
//       await prisma.user.upsert({
//         where: { email },
//         update: {},
//         create: { email, name, role: "CUSTOMER" },
//       });
//       return true;
//     },
//     async jwt({ token, user }: { token: any; user: any }) {
//       if (user) {
//         const dbuser = await prisma.user.findUnique({
//           where: { email: user.email },
//         });
//         token.role = dbuser?.role;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       if (token?.role) {
//         session.user.role = token.role;
//       }
//       return session;
//     },

//   },
  secret: process.env.AUTH_SECRET,
  session:{
    strategy:"jwt"
  },
  pages: {
    signIn: "/auth/login", // Página personalizada de inicio de sesión
    error: "/auth/unauthorized", // Página personalizada de error
  },
});
