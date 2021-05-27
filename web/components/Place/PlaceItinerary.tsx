import React, { useState, useEffect } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'

interface Props {
  place: Espace
}

const PlaceItinerary = ({ place }: Props) => {
  const { t } = useTranslation('place')
  const [isEnabled, setEnabled] = useState(true)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
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

  return (
    <Box pl={5}>
      <Text textStyle="h2" mb={5}>
        {t('detail.howToGo')}
      </Text>
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
                const windowToOpen = window.open(null, '_blank')
                windowToOpen.location.href = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${currentLatitude},${currentLongitude};${place?.longitude},${place?.latitude}&geometries=geojson`
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
  )
}

export default PlaceItinerary
