import { client } from './client-api'

interface LoginRequest {
  identifier: string
  password: string
}

export const login = (data: LoginRequest) => client.post('/auth/local', data)

export const signup = (data) => client.post('/auth/local/register', data)
