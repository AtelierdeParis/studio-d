import React from 'react'
import { Box } from '@chakra-ui/react'
import { User } from '~@types/user.d'
import { createNewPlace } from '~api/api'
import useToast from '~hooks/useToast'
import { useTranslation } from 'next-i18next'
import PlaceForm from '~components/Account/Place/PlaceForm'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import { useRouter } from 'next/router'

interface IPlaceCreate {
  user: User
}

const PlaceCreate = ({ user }: IPlaceCreate) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { errorToast, successToast } = useToast()

  const onSubmit = (values): Promise<any> => {
    const { form, data } = Object.keys(values).reduce(
      (total, key) => {
        if (key === 'files') {
          Array.from(values[key]).map((file: any, index) =>
            total.form.append(
              `files.files`,
              file?.display_name
                ? new File([file], file.display_name, { type: file.type })
                : file,
            ),
          )
        } else {
          total.data[key] = values[key]
        }
        return total
      },
      { form: new FormData(), data: { users_permissions_user: user.id } },
    )

    form.append('data', JSON.stringify(data))

    return createNewPlace(form)
      .then((res) => {
        router.push({
          pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
          query: { id: res.data.id, index: 1 },
        })
      })

      .catch(() => errorToast(t('common:error')))
  }

  return (
    <Box>
      <PlaceForm onSubmit={onSubmit} />
    </Box>
  )
}

export default PlaceCreate
