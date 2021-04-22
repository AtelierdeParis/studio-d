import React from 'react'
import { Box } from '@chakra-ui/react'
import { client } from '~api/client-api'
import { UsersPermissionsUser } from '~typings/api'
import useToast from '~hooks/useToast'
import { useTranslation } from 'next-i18next'
import PlaceForm from '~components/Account/Place/PlaceForm'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import { useRouter } from 'next/router'

interface IPlaceCreate {
  user: UsersPermissionsUser
}

const PlaceCreate = ({ user }: IPlaceCreate) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { errorToast } = useToast()

  const onSubmit = (values): Promise<any> => {
    const { form, data } = Object.keys(values).reduce(
      (total, key) => {
        if (key === 'files') {
          Array.from(values[key]).map((file: any, index) =>
            total.form.append(
              `files.files`,
              file?.caption
                ? new File([file], file.caption, { type: file.type })
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

    return client.espaces
      .espacesCreate(form)
      .then((res) => {
        router.push({
          pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
          query: { id: res.data.slug, index: 1 },
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
