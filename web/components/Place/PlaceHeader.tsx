import React from 'react'
import { Flex, Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import Link from '~components/Link'
import { Espace } from '~typings/api'
import { useMyPlaces } from '~hooks/useMyPlaces'

interface Props {
  place: Espace
}

const PlaceHeader = ({ place }: Props) => {
  const { t } = useTranslation('place')
  const { data: places } = useMyPlaces()
  if (!places || !places.some((p) => p.id === place.id)) return null

  return (
    <Flex
      bgColor="blue.50"
      justifyContent="flex-end"
      px={5}
      py={2.5}
      alignItems="center"
    >
      {!place.filledUntil && (
        <Text color="grayText.1">{t(`header.noDispo`)}</Text>
      )}
      <Button
        ml={5}
        colorScheme="blue"
        as={Link}
        href={{
          pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
          query: { id: place.id },
        }}
      >
        {t('header.edit')}
      </Button>
    </Flex>
  )
}

export default PlaceHeader
