import { getSession } from 'next-auth/client'
import { Api } from '~typings/api'

export const client = new Api({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
  securityWorker: async () => {
    const session = await getSession()
    if (!session) return {}

    return {
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    }
  },
})
