import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import PlaceInfo from '~components/Account/Booking/PlaceInfo'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'

const BookingDrawerPlace = ({ place, espace }) => {
  const { t } = useTranslation('booking')
  return (
    <Box fontSize={{ base: 'sm', sm: 'md' }}>
      <Text fontFamily="mabry medium" fontWeight="500">
        {t('address')}
      </Text>
      <Text>{espace?.address}</Text>
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
    </Box>
  )
}

export default BookingDrawerPlace
