import React from 'react'
import Link from '~components/Link'
import Image from '~components/Image'
import FallbackImage from '~components/FallbackImage'
import { AspectRatio, Box } from '@chakra-ui/react'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import { Espace } from '~typings/api'

const PlaceListItemImage = ({ place }: { place: Espace }) => {
  return (
    <Box paddingY={4}>
      <Link
        href={{
          pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
          query: { id: place.slug },
        }}
      >
        <AspectRatio
          w={{ base: '100%', lg: '230px' }}
          ratio={4 / 3}
          mr={8}
          alignItems="center"
          {...(!place.published
            ? { filter: 'grayscale(1)', opacity: 0.5 }
            : {})}
        >
          {place.images.length > 0 ? (
            <Image src={place.images[0].url} />
          ) : (
            <FallbackImage />
          )}
        </AspectRatio>
      </Link>
    </Box>
  )
}

export default PlaceListItemImage
