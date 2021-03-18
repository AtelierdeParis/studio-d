import axios from 'axios'
import { getSession } from 'next-auth/client'

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
})

client.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (!session) return config

    return {
      ...config,
      headers: {
        Authorization: `Bearer ${session.user.jwt}`,
      },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)
