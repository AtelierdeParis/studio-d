import React, { useContext } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container } from '@chakra-ui/react'
import { usePlace } from '~hooks/usePlace'
import Loading from '~components/Loading'
import PlaceDetail from '~components/Place/PlaceDetail'
import BookingScheduleProvider from '~components/Place/BookingScheduleProvider'
import BookingScheduleContext from '~components/Place/BookingScheduleContext'
import BookingConfirm from '~components/Place/BookingConfirm'

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
  placeId: string
}

const PlacePage = ({ placeId }: Props) => {
  const { data: place, isLoading } = usePlace(placeId)

  return (
    <Container pt={12}>
      <Loading isLoading={isLoading} pt={20}>
        <BookingScheduleProvider>
          <ViewHandler place={place} />
        </BookingScheduleProvider>
      </Loading>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  return {
    props: {
      placeId: query.placeId,
      ...(await serverSideTranslations(locale, ['common', 'place'])),
    },
  }
}

export default PlacePage
