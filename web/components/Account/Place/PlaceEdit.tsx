import React from 'react'
import { client } from '~api/client-api'
import { Espace } from '~typings/api'
import useToast from '~hooks/useToast'
import { addFilesWithInfo } from '~utils/file'
import { useTranslation } from 'next-i18next'
import PlaceForm from '~components/Account/Place/PlaceForm'
import { useQueryClient } from 'react-query'

interface IPlaceEdit {
  place: Espace
}

const PlaceEdit = ({ place }: IPlaceEdit) => {
  const { t } = useTranslation()
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()

  const onSubmit = async ({ files, removedFiles, ...values }): Promise<any> => {
    let createdFiles = null
    if (removedFiles.length > 0) {
      await Promise.all(removedFiles.map(client.upload.filesDelete))
    }

    const newFiles = files.filter((file) => !file.id)
    if (newFiles.length > 0) {
      createdFiles = await Promise.all(
        addFilesWithInfo(newFiles, {
          ref: 'espace',
          refId: place.id.toString(),
          field: 'files',
        }),
      )
    }

    return client.espaces
      .espacesUpdate(place.id, {
        ...values,
        files: files.filter((file) => file.id),
      })
      .then((res) => {
        queryClient.setQueryData(['place', place.slug], res.data)
        successToast(t('common:success'))
        return res.data
      })
      .catch(() => errorToast(t('common:error')))
  }

  return <PlaceForm place={place} onSubmit={onSubmit} />
}

export default PlaceEdit
