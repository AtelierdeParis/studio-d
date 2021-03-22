import { client } from './client-api'

export const createMessage = (data) => client.post('/messages', data)

export const createNewPlace = (data) => client.post('/espaces', data)

export const addImages = (data) => client.post('/upload', data)

export const deleteImage = (id) => client.delete(`/upload/files/${id}`)
