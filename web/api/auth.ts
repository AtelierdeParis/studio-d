import { client } from './client-api'

interface LoginRequest {
  identifier: string
  password: string
}
interface ResetRequest {
  code: string
  password: string
  passwordConfirmation: string
}

export const login = (data: LoginRequest) => client.post('/auth/local', data)

export const signup = (data) => client.post('/auth/local/register', data)

export const forgotPassword = (email: string) =>
  client.post('/auth/forgot-password', { email })

export const resetPassword = (data: ResetRequest) =>
  client.post('/auth/reset-password', data)
