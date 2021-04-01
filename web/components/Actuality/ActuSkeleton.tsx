import React from 'react'
import { Skeleton, Flex, AspectRatio, Box } from '@chakra-ui/react'

const SkeletonItem = () => (
  <Flex direction="column">
    <AspectRatio w="100%" maxH="300px" ratio={16 / 9}>
      <Skeleton />
    </AspectRatio>
    <Box px={4} py={4}>
      <Skeleton h="20px" mb={2} w="50%" />
      <Skeleton h="20px" w="40%" />
      <Skeleton mt={5} h="80px" />
      <Skeleton mt={5} h="15px" w="85px" />
    </Box>
  </Flex>
)

const ActuSkeleton = () => {
  return (
    <>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </>
  )
}

export default ActuSkeleton
