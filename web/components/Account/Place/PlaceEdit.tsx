import React from 'react'
import { Place } from '~@types/place.d'
import { updatePlace, addFiles, deleteFile } from '~api/api'
import useToast from '~hooks/useToast'
import { useTranslation } from 'next-i18next'
import PlaceForm from '~components/Account/Place/PlaceForm'

interface IPlaceEdit {
  place: Place
}

const PlaceEdit = ({ place }: IPlaceEdit) => {
  const { t } = useTranslation()
  const { errorToast, successToast } = useToast()

  const onSubmit = async ({ files, removedFiles, ...values }): Promise<any> => {
    if (removedFiles.length > 0) {
      await Promise.all(removedFiles.map(deleteFile))
    }

    const newFiles = files.filter((file) => !file.id)
    if (newFiles.length > 0) {
      await addFiles(newFiles, {
        ref: 'espace',
        refId: place.id.toString(),
        field: 'files',
      })
    }

    return updatePlace(place.id, values)
      .then((res) => {
        successToast(t('common:success'))
        return res.data
      })
      .catch(() => errorToast(t('common:error')))
  }

  return <PlaceForm place={place} onSubmit={onSubmit} />
}

export default PlaceEdit
