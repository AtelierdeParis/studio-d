import { client } from '~api/client-api'

interface FileOptions {
  ref: string
  refId: string
  field: string
}

interface CustomFile extends File {
  caption?: string
}

export const addFiles = (files: CustomFile[], options: FileOptions) => {
  const formData = new FormData()
  formData.append('ref', options.ref)
  formData.append('refId', options.refId)
  formData.append('field', options.field)
  Array.from(files).map((file: CustomFile) => {
    formData.append(`files`, file)
  })
  return client.upload.uploadCreate(formData)
}

export const addFilesWithInfo = (files: CustomFile[], options: FileOptions) => {
  return Array.from(files).map((file: CustomFile) => {
    const formData = new FormData()
    formData.append('ref', options.ref)
    formData.append('refId', options.refId)
    formData.append('field', options.field)
    formData.append(`files`, file)
    if (file?.caption) {
      formData.append('fileInfo', `{"caption": "${file?.caption}"}`)
    }
    return client.upload.uploadCreate(formData)
  })
}
