import React, { useState, useRef } from 'react'
import { Box, Text, Button, Link, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import Compass from 'public/assets/img/compass.svg'
interface Props {
  place: Espace
}

const PlaceItinerary = ({ place }: Props) => {
  const { t } = useTranslation('place')
  const [link, setLink] = useState('')
  const [isLoading, setLoading] = useState(false)
  const ref = useRef()

  if (!('geolocation' in navigator)) return null

  return (
    <Flex alignItems="flex-start" pt={{ base: 14, lg: 20 }} id="map">
      <Box w="18px" mt={0.5}>
        <Compass />
      </Box>
      <Box pl={5}>
        <Text textStyle="h2" mb={5}>
          {t('detail.howToGo')}
        </Text>
        <Text>{t('detail.located', { address: place?.address })}</Text>
        <Link href={link !== '' ? link : null} ref={ref} target="_blank">
          <Button
            variant="line"
            textDecoration="underline"
            borderBottom="none"
            color="gray.500"
            isLoading={isLoading}
            onClick={() => {
              setLoading(true)
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const currentLatitude = position.coords.latitude
                  const currentLongitude = position.coords.longitude
                  setLink(
                    `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${currentLatitude},${currentLongitude};${place?.longitude},${place?.latitude}&geometries=geojson`,
                  )
                  if (typeof ref.current !== 'undefined') {
                    // @ts-ignore
                    ref.current.click()
                  }
                  setLoading(false)
                },
                (err) => {
                  console.log('err', err)
                  setLoading(false)
                },
                {
                  timeout: 30000,
                  enableHighAccuracy: true,
                  maximumAge: 75000,
                },
              )
            }}
          >
            {t('detail.itinerary')}
          </Button>
        </Link>
      </Box>
    </Flex>
  )
}

export default PlaceItinerary
