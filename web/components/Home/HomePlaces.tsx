import React from 'react'
import {
  Flex,
  Box,
  Text,
  Button,
  useBreakpointValue,
  HStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { usePlaces } from '~hooks/usePlaces'
import PlaceGrid from '~components/Place/PlaceGrid'
import { ActiveCampaign } from '~components/Campaign/CampaignContext'
import { format } from '~utils/date'
import Link from '~components/Link'
import { ROUTE_PLACES } from '~constants'
import PlacesListCampaignHelper from '~components/Campaign/Places/PlacesListCampaignHelper'
import Tag from '~components/Tag'

interface Props {
  campaign?: ActiveCampaign
}

const HomePlaces = ({ campaign }: Props) => {
  const isLgOrSm = useBreakpointValue({
    base: false,
    sm: true,
    md: false,
    lg: true,
  })
  const { t } = useTranslation('home')
  const { t: tCommon } = useTranslation('common')
  const filters = campaign
    ? {
        'disponibilities.campaign': campaign?.id,
      }
    : {}
  const { data: places } = usePlaces(
    {
      published_eq: true,
      _limit: 20,
      _sort: 'dispoAsc',
      ...filters,
    },
    campaign && 'campaignPlaces',
  )

  if (!places || places.length === 0) return null

  return (
    <Box py={4} w="100%">
      <HStack alignItems="flex-start" pl={{ base: 0, md: 2 }}>
        <Box w="18px">
          <Arrow />
        </Box>
        <Text textStyle="h2" mb={4} pl={3} lineHeight={1}>
          {campaign
            ? t('campaign.title', { title: campaign?.title })
            : t('places.title')}
        </Text>
        {campaign && (
          <Tag status="campaign" padding={2} fontSize="sm">
            {tCommon('campaign.open', {
              date: format(new Date(campaign?.limitDate), 'd MMMM yyyy'),
            })}
          </Tag>
        )}
      </HStack>

      <PlacesListCampaignHelper campaign={campaign} limitLines />

      <PlaceGrid places={places.slice(0, isLgOrSm ? 4 : 3)} />
      <Flex justifyContent="center" pt={10} pb={{ base: 6, md: 0 }}>
        {campaign?.mode === 'applications' ? (
          <Button
            as={Link}
            href={ROUTE_PLACES}
            variant="outline"
            colorScheme="campaign"
            size="xl"
            color={'campaign.dark'}
            _hover={{ bg: 'campaign.light', textDecor: 'none' }}
          >
            {t('places.campaign.cta', {
              title: campaign?.title,
            })}
          </Button>
        ) : (
          <Button
            as={Link}
            href={ROUTE_PLACES}
            variant="outline"
            colorScheme="blue"
            size="xl"
          >
            {t('places.btn')}
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default HomePlaces
