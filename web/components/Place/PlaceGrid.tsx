import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import Loading from '~components/Loading'
import Loader from '~components/Loader'
import PlaceGridCard from '~components/Place/PlaceGridCard'
import PlaceGridCardSkeleton from '~components/Place/PlaceGridCardSkeleton'
import { Espace } from '~typings/api'
import { SearchQuery } from '~utils/search'

interface Props {
  places?: Espace[]
  gridRef?: React.RefObject<any>
  isFetching?: boolean
  isLoading?: boolean
  searchQuery?: SearchQuery
}

const PlaceGrid = ({
  places = [],
  isLoading = null,
  isFetching = false,
  gridRef = null,
  searchQuery = null,
}: Props) => {
  return (
    <Box>
      <SimpleGrid columns={4} columnGap={5} rowGap={8} ref={gridRef}>
        <Loading isLoading={isLoading} skeleton={<PlaceGridCardSkeleton />}>
          {places.map((place) => (
            <PlaceGridCard
              place={place}
              key={place.id}
              searchQuery={searchQuery}
            />
          ))}
        </Loading>
      </SimpleGrid>
      {isFetching && !isLoading && <Loader mt={10} />}
    </Box>
  )
}

export default PlaceGrid
