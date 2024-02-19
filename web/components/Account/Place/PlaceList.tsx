import React, { useState } from 'react'
import { Espace } from '~typings/api'
import { ROUTE_ACCOUNT_ADD_PLACES } from '~constants'
import Link from '~components/Link'
import { Box, Button, Text, Flex, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Add from 'public/assets/img/add.svg'
import PlaceListItem from '~components/Account/Place/ListItem/PlaceListItem'
import MigrationMessage from '~components/MigrationMessage'

interface Props {
  places: Espace[]
}

const PlaceList = ({ places }: Props) => {
  const { t } = useTranslation('place')
  const [isVisible, setVisible] = useState(false)

  return (
    <Box py={{ base: 4, md: 8 }}>
      {isVisible && (
        <MigrationMessage
          title={t('list.migration.title')}
          message={t('list.migration.message')}
        />
      )}
      <Flex
        alignItems="center"
        pb={4}
        borderBottom="1px solid"
        borderColor="gray.100"
        justifyContent={{ base: 'flex-end', md: 'flex-start' }}
      >
        <Text
          textStyle="accountTitle"
          mr={5}
          pl={3}
          display={{ base: 'none', md: 'block' }}
        >
          {t('list.title')}
        </Text>
        <Button
          as={Link}
          href={ROUTE_ACCOUNT_ADD_PLACES}
          colorScheme="blue"
          rightIcon={<Add />}
        >
          {t('list.addPlace')}
        </Button>
      </Flex>
      <VStack alignItems="flex-start" spacing={8}>
        {places.map((place, index) => (
          <PlaceListItem
            place={place}
            key={place.id}
            setVisible={setVisible}
            isFirst={index === 0}
          />
        ))}
      </VStack>
    </Box>
  )
}

export default PlaceList
