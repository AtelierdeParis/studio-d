import React from 'react'
import { Espace } from '~typings/api'
import { ROUTE_ACCOUNT_ADD_PLACES } from '~constants'
import Link from '~components/Link'
import { Box, Button, Text, Flex, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Add from 'public/assets/img/add.svg'
import PlaceListItem from '~components/Account/Place/PlaceListItem'

interface IPlaceList {
  places: Espace[]
}

const PlaceList = ({ places }: IPlaceList) => {
  const { t } = useTranslation('place')

  return (
    <Box py={8}>
      <Flex
        alignItems="center"
        pb={4}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Text textStyle="accountTitle" mr={5} pl={4}>
          {t('list.title')}
        </Text>
        <Button
          as={Link}
          href={ROUTE_ACCOUNT_ADD_PLACES}
          colorScheme="blue"
          rightIcon={<Add />}
        >
          {t('list.add')}
        </Button>
      </Flex>
      <VStack alignItems="flex-start">
        {places.map((place) => (
          <PlaceListItem place={place} key={place.id} />
        ))}
      </VStack>
    </Box>
  )
}

export default PlaceList
