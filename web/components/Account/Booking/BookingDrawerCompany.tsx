import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import PlaceInfo from '~components/Account/Booking/PlaceInfo'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'

const BookingDrawerCompany = ({ company }) => {
  const { t } = useTranslation('booking')
  return (
    <>
      <Box>
        <Text fontFamily="mabry medium" fontWeight="500">
          {company?.structureName}
        </Text>
        <Text>{company?.address}</Text>
        <Text>
          {company?.zipCode} {company?.city}
        </Text>
      </Box>
      <Box pt={5}>
        <PlaceInfo label={t('tel')} value={company?.phone} />
        <PlaceInfo label={t('email')} value={company?.email} />
        {company?.website && (
          <Link href={company?.website}>
            <Text
              textDecoration="underline"
              color="gray.300"
              _hover={{ color: 'blue.500' }}
            >
              {company.website}
            </Text>
          </Link>
        )}
      </Box>

      <Box pt={5}>
        <PlaceInfo label={t('siret')} value={company?.siret} />
        <PlaceInfo label={t('ape')} value={company?.ape} />
        <PlaceInfo label={t('insurance')} value={company?.insuranceName} />
        <PlaceInfo label={t('insuranceNb')} value={company?.insuranceNumber} />
        <PlaceInfo label={t('licence')} value={company?.license} />
      </Box>
    </>
  )
}

export default BookingDrawerCompany
