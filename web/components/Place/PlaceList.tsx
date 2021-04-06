import React, { useMemo, useState } from 'react'
import { Box, VStack, Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Loading from '~components/Loading'
import Loader from '~components/Loader'
import PlaceListCard from '~components/Place/PlaceListCard'
// import PlaceListCardSkeleton from '~components/Place/PlaceListCardSkeleton'
const Map = dynamic(() => import('~components/Map'), { ssr: false })

const PlaceList = ({ places = [], isFetching, isLoading, listRef }) => {
  const [focusedPlace, setFocus] = useState(null)
  const markers = useMemo(
    () =>
      places.map(({ latitude, longitude, id }) => ({
        latitude,
        longitude,
        id,
      })),
    [places],
  )

  return (
    <Box>
      <Flex>
        <Box pr={8} w="45%" h="80vh" overflow="auto">
          <VStack spacing={7} ref={listRef} alignItems="flex-start">
            <Loading isLoading={isLoading}>
              {places.map((place) => (
                <PlaceListCard
                  place={place}
                  key={place.id}
                  setFocus={setFocus}
                />
              ))}
            </Loading>
          </VStack>
          {isFetching && !isLoading && <Loader mt={10} />}
        </Box>
        {markers.length > 0 && (
          <Map
            flex={1}
            h="80vh"
            markers={markers}
            focusedPlace={focusedPlace}
          />
        )}
      </Flex>
    </Box>
  )
}

export default PlaceList
