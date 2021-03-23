import React from 'react'
import { Place } from '~@types/place.d'
import { updatePlace, addFiles } from '~api/api'
import useToast from '~hooks/useToast'
import { useTranslation } from 'next-i18next'
import PlaceForm from '~components/Account/Place/PlaceForm'

interface IPlaceEdit {
  place: Place
}

const PlaceEdit = ({ place }: IPlaceEdit) => {
  const { t } = useTranslation()
  const { errorToast, successToast } = useToast()

  const onSubmit = ({ files, ...values }): Promise<any> => {
    if (files.length > 0) {
      addFiles(files, {
        ref: 'espace',
        refId: place.id.toString(),
        field: 'files',
      })
    }

    return updatePlace(place.id, values)
      .then(() => {
        successToast(t('common:success'))
      })
      .catch(() => errorToast(t('common:error')))
  }

  return <PlaceForm place={place} onSubmit={onSubmit} />
}

export default PlaceEdit
