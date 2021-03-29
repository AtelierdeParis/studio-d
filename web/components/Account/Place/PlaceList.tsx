import React from 'react'
import { Place } from '~@types/place.d'
import { ROUTE_ACCOUNT_ADD_PLACES } from '~constants'
import Link from '~components/Link'
import { Box, Button, Text, Flex, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface IPlaceList {
  places: Place[]
}

const PlaceList = ({ places }: IPlaceList) => {
  const { t } = useTranslation('place')
  return (
    <Box>
      <Flex alignItems="center">
        <Text textStyle="accountTitle">{t('list.title')}</Text>
        <Button as={Link} href={ROUTE_ACCOUNT_ADD_PLACES} colorScheme="blue">
          {t('list.add')}
        </Button>
      </Flex>
      <VStack>
        {places.map((place) => (
          <Flex key={place.id}>
            <Text>{place.id}</Text>
            <Text>{place.name}</Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  )
}

export default PlaceList
