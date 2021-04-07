import React from 'react'
import {
  Box,
  Flex,
  Divider,
  AspectRatio,
  Skeleton,
  SimpleGrid,
} from '@chakra-ui/react'

const PlaceListCardSkeletonItem = () => {
  return (
    <Flex
      h="100%"
      w="100%"
      pb={7}
      borderBottom="1px solid"
      borderBottomColor="gray.100"
    >
      <Flex>
        <AspectRatio
          w="12vw"
          h="100%"
          ratio={4 / 3}
          overflow="hidden"
          pos="relative"
          borderRadius="sm"
        >
          <Skeleton />
        </AspectRatio>
      </Flex>
      <Flex pl={5} flex={1} justifyContent="space-between" direction="column">
        <Box>
          <Skeleton h="20px" w="60%" mb={1.5} />
          <Skeleton h="20px" w="40%" />
        </Box>

        <SimpleGrid columns={2} pt={4} columnGap={2} rowGap={1} w="fit-content">
          <Skeleton h="12px" w="50px" />
          <Skeleton h="12px" w="50px" />
          <Skeleton h="12px" w="50px" />
          <Skeleton h="12px" w="50px" />
          <Skeleton h="12px" w="50px" />
          <Skeleton h="12px" w="50px" />
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

const PlaceListCardSkeleton = () => {
  return (
    <>
      <PlaceListCardSkeletonItem />
      <PlaceListCardSkeletonItem />
      <PlaceListCardSkeletonItem />
      <PlaceListCardSkeletonItem />
      <PlaceListCardSkeletonItem />
      <PlaceListCardSkeletonItem />
      <PlaceListCardSkeletonItem />
      <PlaceListCardSkeletonItem />
    </>
  )
}

export default PlaceListCardSkeleton
