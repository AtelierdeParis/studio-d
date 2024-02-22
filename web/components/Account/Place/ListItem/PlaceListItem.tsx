import React, { useEffect } from 'react'
import Link from '~components/Link'
import { Box, Flex, Stack, VStack } from '@chakra-ui/react'
import { Espace } from '~typings/api'
import { useIsComplete } from '~hooks/useIsComplete'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import { Trans } from 'next-i18next'
import NotComplete from '~components/NotComplete'
import PlaceActions from '~components/Account/Place/ListItem/PlaceActions'
import PlaceDisponibilitiesInfo from '~components/Account/Place/ListItem/PlaceDisponibilitiesInfo'
import PlaceListItemInfo from '~components/Account/Place/ListItem/PlaceListItemInfo'
import PlaceListItemImage from '~components/Account/Place/ListItem/PlaceListItemImage'
import CampaignDisponibilitiesInfo from '~components/Account/Place/ListItem/CampaignDisponibilitiesInfo'
import useCampaignContext from '~components/Campaign/useCampaignContext'

interface Props {
  place: Espace
  setVisible: (type: boolean) => void
  isFirst?: boolean
}

const PlaceListItem = ({ place, setVisible, isFirst }: Props) => {
  const isComplete = useIsComplete(place)
  const { currentCampaign } = useCampaignContext()

  useEffect(() => {
    if (!isComplete) {
      setVisible(true)
    }
  }, [isComplete])

  const showCampaignDisponibilities =
    currentCampaign?.mode === 'disponibilities' ||
    (place?.disponibilities &&
      place?.disponibilities?.some(
        (d) => d?.campaign?.toString() === currentCampaign?.id.toString(),
      ))

  return (
    <Flex
      w="100%"
      paddingLeft={{ base: 0, md: 3 }}
      borderTop={!isFirst ? '2px solid' : 'none'}
      borderColor="gray.100"
      _hover={{
        bgColor: 'gray.hover',
      }}
      direction="column"
    >
      <Flex direction={{ base: 'column-reverse', lg: 'row' }}>
        <PlaceListItemImage place={place} />

        <Flex
          direction="column"
          justifyContent="space-between"
          flex={1}
          paddingBottom={4}
        >
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <VStack flex={1} alignItems="flex-start">
              <PlaceListItemInfo place={place} />
              <PlaceActions place={place} />
            </VStack>

            <VStack flex={1} spacing={8} alignItems="stretch">
              <PlaceDisponibilitiesInfo place={place} />
              {showCampaignDisponibilities && (
                <CampaignDisponibilitiesInfo place={place} />
              )}
            </VStack>
          </Stack>
        </Flex>
      </Flex>

      {!isComplete && (
        <NotComplete mt={8} w="fit-content">
          <Trans
            i18nKey="place:list.migration.error"
            components={{
              a: (
                <Link
                  href={{
                    pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
                    query: { id: place.slug },
                  }}
                  textDecoration="underline"
                />
              ),
            }}
          />
        </NotComplete>
      )}
    </Flex>
  )
}

export default PlaceListItem
