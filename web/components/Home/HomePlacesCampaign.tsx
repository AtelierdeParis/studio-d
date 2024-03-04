import React from 'react'
import {
  Flex,
  Box,
  Text,
  Button,
  useBreakpointValue,
  HStack,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { usePlaces } from '~hooks/usePlaces'
import PlaceGrid from '~components/Place/PlaceGrid'
import { format } from '~utils/date'
import Link from '~components/Link'
import { ROUTE_PLACES } from '~constants'
import Tag from '~components/Tag'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import HomeHelperCampaign from '~components/Campaign/HomeHelperCampaign'

const HomePlacesCampaign = () => {
  const isLgOrSm = useBreakpointValue({
    base: false,
    sm: true,
    md: false,
    lg: true,
  })
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('home')
  const { t: tCommon } = useTranslation('common')
  const filters = {
    'disponibilities.campaign': currentCampaign?.id,
  }

  const { data: places } = usePlaces(
    {
      published_eq: true,
      _limit: 20,
      _sort: 'dispoAsc',
      ...filters,
    },
    'campaignPlaces',
  )

  if (!places || places.length === 0) return null

  return (
    <Box py={4} w="100%">
      <HStack alignItems="flex-start" pl={{ base: 0, md: 2 }} paddingY={4}>
        <Box w="18px">
          <Arrow />
        </Box>
        <Stack direction={{ base: 'column-reverse', sm: 'row' }}>
          <Text textStyle="h2" mb={4} pl={3} lineHeight={1}>
            {t('campaign.title', { title: currentCampaign?.title })}
          </Text>

          <Tag status="campaign" padding={2} fontSize="sm">
            {tCommon('campaign.open', {
              date: format(new Date(currentCampaign?.limitDate), 'd MMMM yyyy'),
            })}
          </Tag>
        </Stack>
      </HStack>

      <HomeHelperCampaign />

      <PlaceGrid
        places={places.slice(0, isLgOrSm ? 4 : 3)}
        gridMode="campaign"
      />
      <Flex justifyContent="center" pt={10} pb={{ base: 6, md: 0 }}>
        <Button
          as={Link}
          href={`${ROUTE_PLACES}?tab=1`}
          variant="outline"
          colorScheme="campaign"
          color={'campaign.dark'}
          _hover={{ bg: 'campaign.light', textDecor: 'none' }}
          whiteSpace="normal"
          textAlign="center"
          lineHeight="inherit"
          height="auto"
          size="xl"
          p={2}
        >
          {t('places.campaign.cta', {
            title: currentCampaign?.title,
          })}
        </Button>
      </Flex>
    </Box>
  )
}

export default HomePlacesCampaign
