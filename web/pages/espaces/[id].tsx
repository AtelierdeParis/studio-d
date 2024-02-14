import React, { useContext } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { usePlace } from '~hooks/usePlace'
import Loading from '~components/Loading'
import PlaceDetail from '~components/Place/PlaceDetailPage/PlaceDetail'
import BookingScheduleProvider from '~components/Place/BookingScheduleProvider'
import BookingScheduleContext from '~components/Place/BookingScheduleContext'
import BookingConfirm from '~components/Place/BookingConfirm'
import { useRouter } from 'next/router'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { NextSeo } from 'next-seo'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import CampaignPlaceDetail from '~components/Campaign/Places/Detail/CampaignPlaceDetail'

const ViewHandler = ({
  place,
  currentCampaign,
  hasCampaignDisponibilities,
}) => {
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

  if (currentCampaign?.mode === 'applications' && hasCampaignDisponibilities) {
    return <CampaignPlaceDetail place={place} />
  }
  return <PlaceDetail place={place} />
}

interface Props {
  slug: string
}

const PlacePage = ({ slug }: Props) => {
  const { currentCampaign } = useCampaignContext()
  const router = useRouter()
  const { data: user } = useCurrentUser()
  const { data: place, isLoading } = usePlace(
    slug,
    { availableOnly: true },
    {
      onError: () => {
        router.push('/')
      },
    },
  )
  const campaignDisponibilities = place?.disponibilities?.filter(
    (d) => !!d?.campaign,
  )

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
    <Loading isLoading={isLoading || !place} pt={20}>
      <NextSeo
        title={place?.name}
        openGraph={{
          url: process.env.NEXT_PUBLIC_FRONT_URL + router.asPath,
          title: place?.name,
          images: [
            place &&
              place?.images.length > 0 && {
                url: place?.images[0].url,
                width: 400,
                height: 300,
              },
          ],
        }}
      />
      <BookingScheduleProvider>
        <ViewHandler
          place={place}
          currentCampaign={currentCampaign}
          hasCampaignDisponibilities={campaignDisponibilities?.length > 0}
        />
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
