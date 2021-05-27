import React, { useState, useEffect, useRef } from 'react'
import { Box, Text, Button, Link, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import Compass from 'public/assets/img/compass.svg'
interface Props {
  place: Espace
}

const PlaceItinerary = ({ place }: Props) => {
  const { t } = useTranslation('place')
  const [isEnabled, setEnabled] = useState(true)
  const [link, setLink] = useState('')
  const ref = useRef()

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((res) => {
          setEnabled(res.state === 'granted')
        })
        .catch(() => {
          setEnabled(false)
        })
    }
  }, [])

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
        <Link target="_blank" href={link} ref={ref} />
        <Text>{t('detail.located', { address: place?.address })}</Text>
        {'geolocation' in navigator && (
          <Button
            variant="line"
            color="gray.500"
            borderBottomColor="gray.500"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  if (!isEnabled) setEnabled(true)
                  const currentLatitude = position.coords.latitude
                  const currentLongitude = position.coords.longitude
                  setLink(
                    `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${currentLatitude},${currentLongitude};${place?.longitude},${place?.latitude}&geometries=geojson`,
                  )
                  if (typeof ref.current !== 'undefined') {
                    // @ts-ignore
                    ref.current.click()
                  }
                },
                (err) => {
                  setEnabled(false)
                  console.log('err', err)
                },
                {
                  timeout: 30000,
                  enableHighAccuracy: true,
                  maximumAge: 75000,
                },
              )
            }}
          >
            {isEnabled ? t('detail.itinerary') : t('detail.notEnabled')}
          </Button>
        )}
      </Box>
    </Flex>
  )
}

export default PlaceItinerary
