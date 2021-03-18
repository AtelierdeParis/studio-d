import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { login } from '~api/auth'

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        name: 'credentials',
        authorize: async (credentials: {
          username: string
          password: string
        }) => {
          try {
            const response = await login({
              identifier: credentials.username,
              password: credentials.password,
            })

            if (response.data.user) {
              return response.data
            }

            return Promise.reject('/?error=signin_error_wrong_credentials')
          } catch (e) {
            return Promise.reject('/?error=signin_error_default')
          }
        },
      }),
    ],
    database: process.env.DB_URL,
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_TOKEN_SECRET,
    },
    callbacks: {
      jwt: async (token, data) => {
        const isSignIn = data ? true : false
        const userId = isSignIn ? data.user.id : token.id

        if (isSignIn) {
          token.auth_time = Math.floor(Date.now() / 1000)
          token.id = userId
          token.jwt = data.jwt
          token.name = data.user.structureName
        }

        return Promise.resolve(token)
      },
      session: async (session, user) => {
        return Promise.resolve({ ...session, user })
      },
    },
  })
