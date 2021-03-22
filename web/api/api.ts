import { client } from './client-api'

export const createMessage = (data) => client.post('/messages', data)

export const createNewPlace = (data) => client.post('/espaces', data)
