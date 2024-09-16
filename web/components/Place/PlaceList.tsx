import { Box, Flex, VStack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import Loader from '~components/Loader'
import Loading from '~components/Loading'
import PlaceListCard from '~components/Place/PlaceListCard'
import PlaceListCardSkeleton from '~components/Place/PlaceListCardSkeleton'
const Map = dynamic(() => import('~components/Map'), { ssr: false })

const PlaceList = ({
  places = [],
  isFetching,
  isLoading,
  listRef,
  listMode,
}) => {
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
        <Box pr={8} w="45%" h="80vh" overflow="auto" ref={listRef}>
          <VStack spacing={7} alignItems="flex-start">
            <Loading isLoading={isLoading} skeleton={<PlaceListCardSkeleton />}>
              {places.map((place) => (
                <PlaceListCard
                  place={place}
                  key={place.id}
                  setFocus={setFocus}
                  listMode={listMode}
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
            zoomControl
          />
        )}
      </Flex>
    </Box>
  )
}

export default PlaceList
