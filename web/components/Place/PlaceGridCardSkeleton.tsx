import React from 'react'
import { Box, Flex, Divider, AspectRatio, Skeleton } from '@chakra-ui/react'

const PlaceGridCardSkeletonItem = () => {
  return (
    <Flex
      direction="column"
      overflow="hidden"
      borderRadius="sm"
      className="placeCard"
      role="group"
      h="100%"
    >
      <AspectRatio w="100%" maxH="250px" ratio={4 / 3} pos="relative">
        <Skeleton />
      </AspectRatio>
      <Flex
        flex={1}
        justifyContent="space-between"
        direction="column"
        p={4}
        borderBottomRadius="sm"
        border="1px solid"
        borderColor="gray.100"
      >
        <Box>
          <Skeleton h="18px" mb={1} w="70%" />
          <Skeleton h="18px" mb={1} w="50%" />
        </Box>
        <Box fontSize="sm" pt={6}>
          <Flex w="100%">
            <Skeleton h="15px" mb={1} w="40%" />
          </Flex>
          <Divider my={2} />
          <Flex justifyContent="space-between" alignItems="center">
            <Flex flex={1}>
              <Skeleton h="15px" mb={1} w="40%" />
            </Flex>
            <Divider orientation="vertical" h="20px" />
            <Flex flex={1} ml={5}>
              <Skeleton h="15px" mb={1} w="40%" />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

const PlaceGridCardSkeleton = () => {
  return (
    <>
      <PlaceGridCardSkeletonItem />
      <PlaceGridCardSkeletonItem />
      <PlaceGridCardSkeletonItem />
      <PlaceGridCardSkeletonItem />
      <PlaceGridCardSkeletonItem />
      <PlaceGridCardSkeletonItem />
      <PlaceGridCardSkeletonItem />
      <PlaceGridCardSkeletonItem />
    </>
  )
}

export default PlaceGridCardSkeleton
