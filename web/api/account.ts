import { client } from './client-api'

export const updateCurrentUser = (data) => client.put('/users/me', data)
