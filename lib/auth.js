import NextAuth from "next-auth";
import Google from "next-auth/providers/google";


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
      // console.log(session , "thsi is session")
      // console.log(token , "this is token")

      try {
        // Call the API to fetch or create the user
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user?email=${session.user.email}`, {
          method: "GET",
        });

        const data = await response.json();

        // console.log(data , "This is data from authJS");

        if (response.ok && data.success) {
          session.user.guestId = data.user._id; 

          if(data.user.admin){
            session.user.admin = true;
          }

          // console.log(session , 'this is the real session ')
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


