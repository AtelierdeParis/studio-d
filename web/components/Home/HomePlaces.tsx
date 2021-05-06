import React from 'react'
import { Flex, Box, Text, Button, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { usePlaces } from '~hooks/usePlaces'
import PlaceGrid from '~components/Place/PlaceGrid'
import Link from '~components/Link'
import { ROUTE_PLACES } from '~constants'

interface Props {}

const HomePlaces = ({}: Props) => {
  const isLgOrSm = useBreakpointValue({
    base: false,
    sm: true,
    md: false,
    lg: true,
  })
  const { t } = useTranslation('home')
  const { data: places } = usePlaces({
    published_eq: true,
    _limit: 20,
    _sort: 'dispoAsc',
  })

  if (!places || places.length === 0) return null

  return (
    <Box py={4} w="100%">
      <Flex alignItems="flex-start" pl={{ base: 0, md: 2 }}>
        <Box w="18px">
          <Arrow />
        </Box>
        <Text textStyle="h2" mb={4} pl={3} lineHeight={1}>
          {t('places.title')}
        </Text>
      </Flex>
      <PlaceGrid places={places.slice(0, isLgOrSm ? 4 : 3)} />
      <Flex justifyContent="center" pt={10} pb={{ base: 6, md: 0 }}>
        <Button
          as={Link}
          href={ROUTE_PLACES}
          variant="outline"
          colorScheme="orange"
          size="xl"
          color="orange.500"
        >
          {t('places.btn')}
        </Button>
      </Flex>
    </Box>
  )
}

export default HomePlaces
