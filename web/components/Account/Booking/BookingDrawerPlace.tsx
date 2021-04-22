import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import PlaceInfo from '~components/Account/Booking/PlaceInfo'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'

const BookingDrawerPlace = ({ place }) => {
  const { t } = useTranslation('booking')
  return (
    <>
      <Text fontFamily="mabry medium" fontWeight="500">
        {t('address')}
      </Text>
      <Text>{place?.address}</Text>
      <Box pt={5}>
        <PlaceInfo label={t('tel')} value={place?.phone} />
        <PlaceInfo label={t('email')} value={place?.email} />
        {place?.website && (
          <Link href={place?.website}>
            <Text textDecoration="underline" color="gray.300">
              {place.website}
            </Text>
          </Link>
        )}
      </Box>
    </>
  )
}

export default BookingDrawerPlace
