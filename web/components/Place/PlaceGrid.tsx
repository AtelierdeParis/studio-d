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
  searchParams?: SearchQuery
  gridMode?: 'solidarity' | 'campaign'
}

const PlaceGrid = ({
  places = [],
  isLoading = null,
  isFetching = false,
  gridRef = null,
  searchParams = null,
  gridMode,
}: Props) => {
  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        columnGap={5}
        rowGap={{ base: 3, md: 8 }}
        ref={gridRef}
      >
        <Loading isLoading={isLoading} skeleton={<PlaceGridCardSkeleton />}>
          {places.map((place) => (
            <PlaceGridCard
              place={place}
              key={place.id}
              searchParams={searchParams}
              gridMode={gridMode}
            />
          ))}
        </Loading>
      </SimpleGrid>
      {isFetching && !isLoading && <Loader mt={10} />}
    </Box>
  )
}

export default PlaceGrid
