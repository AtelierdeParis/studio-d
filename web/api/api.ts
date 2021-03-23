import { client } from './client-api'

export const createMessage = (data) => client.post('/messages', data)

export const createNewPlace = (data) => client.post('/espaces', data)

export const getMyPlaces = () => client.get('/espaces/me')

export const updatePlace = (id: number, data) =>
  client.put(`/espaces/${id}`, data)

interface FileOptions {
  ref: string
  refId: string
  field: string
}

export const addFiles = (files, options: FileOptions) => {
  const formData = new FormData()
  formData.append('ref', options.ref)
  formData.append('refId', options.refId)
  formData.append('field', options.field)

  Array.from(files).map((file: File) => {
    formData.append('files', file)
  })

  return client.post('/upload', formData)
}

export const deleteImage = (id) => client.delete(`/upload/files/${id}`)
