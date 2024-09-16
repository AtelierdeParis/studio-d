import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import HomeHelperSolidarity from '~components/Campaign/HomeHelperSolidarity'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Link from '~components/Link'
import PlaceGrid from '~components/Place/PlaceGrid'
import { ROUTE_PLACES } from '~constants'
import { usePlaces } from '~hooks/usePlaces'

const HomePlacesSolidarity = () => {
  const isLgOrSm = useBreakpointValue({
    base: false,
    sm: true,
    md: false,
    lg: true,
  })
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('home')

  const { data: places } = usePlaces({
    published_eq: true,
    _limit: 20,
    _sort: 'dispoAsc',
  })

  // We should only display places that have solidarity slots available
  const filteredPlaces = places?.filter((place) =>
    place.disponibilities.some((disponibility) => {
      return disponibility.campaign === null
    }),
  )

  if (!filteredPlaces || filteredPlaces.length === 0) return null

  return (
    <Box py={4} w="100%">
      <HStack alignItems="flex-start" pl={{ base: 0, md: 2 }} paddingY={4}>
        <Box w="18px">
          <Arrow />
        </Box>
        <Stack direction={{ base: 'column-reverse', sm: 'row' }}>
          <Text textStyle="h2" mb={4} pl={3} lineHeight={1}>
            {t('places.title')}
          </Text>
        </Stack>
      </HStack>

      {currentCampaign?.mode === 'applications' && <HomeHelperSolidarity />}

      <PlaceGrid
        places={filteredPlaces.slice(0, isLgOrSm ? 4 : 3)}
        gridMode={
          currentCampaign?.mode === 'applications' ? 'solidarity' : null
        }
      />
      <Flex justifyContent="center" pt={10} pb={{ base: 6, md: 0 }}>
        <Button
          as={Link}
          href={ROUTE_PLACES}
          variant="outline"
          colorScheme="blue"
          size="xl"
        >
          {t('places.btn')}
        </Button>
      </Flex>
    </Box>
  )
}

export default HomePlacesSolidarity
