import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import User from "../../../models/user"
import dbConnect from "../../../config/dbConnect"

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      // The URL to redirect to after sign-in.
      // If not specified, users will be redirected to '/'
      // (or the page specified by 'redirect' in the sign-in options)

      name: "Credentials",

      async authorize(credentials) {
        dbConnect()

        const { email, password } = credentials

        // Check if email and password have been provided
        if (!email || !password) {
          throw new Error("Email and password are required")
        }
        // Check if log in exists
        const user = await User.findOne({ email: email }).select("+password")
        if (!user) {
          throw new Error("Email not found")
        }
        // Check if password is correct
        const isValid = await user.comparePassword(password)
        if (!isValid) {
          throw new Error("Invalid password")
        }
        user.picture = user.avatar
        user.name = user.userName

        // Return user
        return Promise.resolve(user)
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Store the token in the session
      // This is used to authenticate the user
      // on each request
      user && (token.user = user)
      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      // Add user to session

      session.user = token.user
      return Promise.resolve(session)
    },
  },
})
