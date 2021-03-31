import { client } from '~api/client-api'

interface FileOptions {
    ref: string
    refId: string
    field: string
}
  
export const addFiles = (files: File[], options: FileOptions) => {
    const formData = new FormData()
    formData.append('ref', options.ref)
    formData.append('refId', options.refId)
    formData.append('field', options.field)

    Array.from(files).map((file: File) => {
        formData.append('files', file)
    })

    return client.upload.uploadCreate(formData)
}