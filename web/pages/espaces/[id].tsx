import React, { useContext } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { usePlace } from '~hooks/usePlace'
import Loading from '~components/Loading'
import PlaceDetail from '~components/Place/PlaceDetail'
import BookingScheduleProvider from '~components/Place/BookingScheduleProvider'
import BookingScheduleContext from '~components/Place/BookingScheduleContext'
import BookingConfirm from '~components/Place/BookingConfirm'
import { useRouter } from 'next/router'
import { useCurrentUser } from '~hooks/useCurrentUser'

const ViewHandler = ({ place }) => {
  const { showConfirmView, selected, setConfirmView } = useContext(
    BookingScheduleContext,
  )
  if (showConfirmView)
    return (
      <BookingConfirm
        events={selected}
        place={place}
        back={() => setConfirmView(false)}
      />
    )
  return <PlaceDetail place={place} />
}

interface Props {
  slug: string
}

const PlacePage = ({ slug }: Props) => {
  const router = useRouter()
  const { data: user } = useCurrentUser()
  const { data: place, isLoading } = usePlace(slug, { availableOnly: true })

  if (
    place &&
    user &&
    ((!place.published && user.id !== place.users_permissions_user.id) ||
      place.users_permissions_user.blocked)
  ) {
    router.push('/')
    return null
  }

  return (
    <Loading isLoading={isLoading} pt={20}>
      <BookingScheduleProvider>
        <ViewHandler place={place} />
      </BookingScheduleProvider>
    </Loading>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  return {
    props: {
      slug: query.id,
      ...(await serverSideTranslations(locale, ['common', 'place'])),
    },
  }
}

export default PlacePage
