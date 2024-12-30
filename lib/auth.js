import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({auth, request}) {
      // console.log("callbacks auth 1 ", !!auth)
      // console.log("callbacks auth 2 ", auth)

      return !!auth?.user;
    },
    async signIn({user, account, profile}){
      try {
        const existingGuest = await getGuest(user.email);

        // console.log("existing guest :- ", existingGuest)

        if(!existingGuest){
        // console.log("creating guest :- ", existingGuest)
          await createGuest({email: user.email, fullName : user.name})
        }

        return true
      } catch {
        return false
      }
    },
    async session({session , user}){
      try {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
      } catch (error) {
        console.log("session error ",  error)
      }
      
    }
  },
  pages: {
    signIn: '/login'
  }
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
