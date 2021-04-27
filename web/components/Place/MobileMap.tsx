import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, useBreakpointValue, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
const Map = dynamic(() => import('~components/Map'), { ssr: false })

const MobileMap = ({ places = [] }) => {
  const { t } = useTranslation('place')
  const [isVisible, setVisible] = useState(true)

  const onMarkerClick = (id) => {
    const top = document.getElementById(`place-${id}`).scrollIntoView()
  }

  const markers = useMemo(() => {
    if (!places) return []
    return places.map(({ latitude, longitude, id }) => ({
      latitude,
      longitude,
      id,
    }))
  }, [places])
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (!isMobile) return null

  return (
    <>
      {isVisible && (
        <Map
          flex={1}
          mt={10}
          h="240px"
          markers={markers}
          onMarkerClick={onMarkerClick}
        />
      )}
      <Flex justifyContent="flex-end" pt={3} pb={7}>
        <Button
          variant="line"
          color="gray.500"
          borderColor="gray.500"
          fontSize="sm"
          onClick={() => setVisible(!isVisible)}
        >
          {isVisible ? t('search.hide') : t('search.show')}
        </Button>
      </Flex>
    </>
  )
}

export default MobileMap
