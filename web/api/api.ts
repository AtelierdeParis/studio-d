import { client } from './client-api'
import { Disponibility } from '~@types/disponibility'

export const createMessage = (data) => client.post('/messages', data)

export const createNewPlace = (data) => client.post('/espaces', data)

export const getMyPlaces = () => client.get('/espaces/me')

export const getPage = (url) => client.get(`/pages${url}`)

export const updatePlace = (id: number, data) =>
  client.put(`/espaces/${id}`, data)

export const deletePlace = (id: number) => client.delete(`/espaces/${id}`)

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

export const deleteFile = (id) => client.delete(`/upload/files/${id}`)

export const deleteDisponibility = (id) =>
  client.delete(`/disponibilities/${id}`)

export const createManyDisponibilities = (data: Disponibility[]) =>
  client.post<Disponibility[]>(`/bulk/disponibilities`, data)
