import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import { createGuestDB, getUserByEmail } from "./actions";
import { connectToDatabase } from "./mongooes";
// import Guests from "@/database/guest.model";

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

      // console.log(request , " this is request from auth.js")

      return !!auth?.user;
    },
    async signIn({user, account, profile}){
      try {
        await connectToDatabase();
        // const existingGuest = await getGuest(user.email);
        const existingGuest = await getUserByEmail(user.email);

      console.log(existingGuest , " this is request from auth.js")

        // const newUser = await getUserByEmail(user.email)

        // console.log(newUser , " This is user")

        // const existingGuest = await Guests.find({email : user.email})

        // console.log(existingGuest , " Guest")

        // console.log("existing guest :- ", existingGuest)

        if(!existingGuest){
        // console.log("creating guest :- ", existingGuest)
          // await createGuest({email: user.email, fullName : user.name})
          await createGuestDB({email: user.email, fullName : user.name})
        }

        return true
      } catch {
        return false
      }
    },
    async session({session , user}){
      try {
      // const guest = await getGuest(session.user.email);
      const guest = await getUserByEmail(session.user.email);
      // console.log('guest fatched ', guest)
      session.user.guestId = guest?._id;
      // session.user.guestId = guest?.id;

      // console.log(guest , "This is guest from session")
      // console.log(session.user.guestId , " This is guest id")


      // console.log('manuplated session ', session)
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
