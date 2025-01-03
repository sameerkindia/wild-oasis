import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { getUserByEmail } from "./actions";
// import { createGuest, getGuest } from "./data-service";
// import { createGuestDB, getUserByEmail } from "./actions";
// import { connectToDatabase } from "./mongooes";
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
    async signIn({ user }) {
      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          console.error('Failed to save user:', data.error);
          return false; // Prevent sign-in if the API fails
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error('Sign-in error:', error);
        return false;
      }
    },
    async session({ session, token }) {
      try {
        // Call the API to fetch or create the user
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user.email,
          }),
        });

        const data = await response.json();

        console.log(data , "This is data from authJS");

        if (response.ok && data.success) {
          session.user.guestId = data.guestId; // Add guestId to the session
        } else {
          console.error("Failed to fetch guestId:", data.error || data.message);
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
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



// async signIn({user, account, profile}){

//   try {
//     // await connectToDatabase();
//     // const existingGuest = await getGuest(user.email);
//     // const existingGuest = await getUserByEmail(user.email);

//   // console.log(existingGuest , " this is request from auth.js")

//     // const newUser = await getUserByEmail(user.email)

//     // console.log(newUser , " This is user")

//     // const existingGuest = await Guests.find({email : user.email})

//     // console.log(existingGuest , " Guest")

//     // console.log("existing guest :- ", existingGuest)

//     if(!existingGuest){
//     // console.log("creating guest :- ", existingGuest)
//       // await createGuest({email: user.email, fullName : user.name})
//       // await createGuestDB({email: user.email, fullName : user.name})
//     }

//     return true
//   } catch {
//     return false
//   }
// },

    // async session({session , user}){
    //   // console.log(user , "this is session")
    //   // console.log(session , "this is session")

    //   try {
    //   // const guest = await getGuest(session.user.email);
    //   // const guest = await getUserByEmail(session.user.email);
    //   // console.log('guest fatched ', guest)
    //   // session.user.guestId = guest?._id;
    //   // session.user.guestId = guest?.id;

    //   // console.log(guest , "This is guest from session")
    //   // console.log(session.user.guestId , " This is guest id")


    //   // console.log('manuplated session ', session)
    //   return session;
    //   } catch (error) {
    //     console.log("session error ",  error)
    //   }
      
    // }