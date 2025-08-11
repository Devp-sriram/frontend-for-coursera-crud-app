import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import checkUser from '@/controllers/checkuser.js';
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      id: "credentials", // ✅ ID must match signIn call
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        try{
          const user = await checkUser(credentials.email);
          // console.log(user);
          if (!user) {
            console.log("No user found");
            return null;
          }
          // console.log("credentials.password:", credentials.password);
          // console.log("user.password:", user.password);
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.log("Password invalid");
            return null;
          }
          console.log("Login success");        
          return {...user};
        }catch(err){
          console.log(err);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      //console.log(session)
      return session;
    },
  },
});

export { handler as GET, handler as POST };
