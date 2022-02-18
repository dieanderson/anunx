import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'

import axios from 'axios'


export default NextAuth({
  
  providers: [
    CredentialsProvider({
       
      async authorize(credentials)  {
          
          const res = await axios.post('http://localhost:3000/api/auth/signin', credentials)          

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

  adapter: MongoDBAdapter(clientPromise),
})