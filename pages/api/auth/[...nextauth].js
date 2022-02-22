import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

//import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
//import clientPromise from '../../../lib/mongodb'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'


export default NextAuth({

  //adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,            
    }),

    CredentialsProvider({
       
      async authorize(credentials)  {
          
          const res = await axios.post(`${process.env.APP_URL}/api/auth/signin`, credentials)          

          const user = res.data
          
          if (user) {
            return user
          } else {
            throw '/auth/signin?i=1'
          }
      },
    }),   
  ],  

  secret: '3v3exChkDfWTNE9LGhYglR00oqZPi7JhVu7XnsvqNXg=',
  
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
}

})