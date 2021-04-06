import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import Loading from '~components/Loading'
import Loader from '~components/Loader'
import PlaceGridCard from '~components/Place/PlaceGridCard'
import PlaceGridCardSkeleton from '~components/Place/PlaceGridCardSkeleton'

const PlaceGrid = ({ places = [], isFetching, isLoading, gridRef }) => {
  return (
    <Box>
      <SimpleGrid columns={4} columnGap={5} rowGap={8} ref={gridRef}>
        <Loading isLoading={isLoading} skeleton={<PlaceGridCardSkeleton />}>
          {places.map((place) => (
            <PlaceGridCard place={place} key={place.id} />
          ))}
        </Loading>
      </SimpleGrid>
      {isFetching && !isLoading && <Loader mt={10} />}
    </Box>
  )
}

export default PlaceGrid
