import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        const response = await fetch("api/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringfy({
                email: credentials.email,
                password: credentials.password,
            }),
            
        });
        console.log(response);
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
})