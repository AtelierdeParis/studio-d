import React from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { useUser } from '~hooks/useUser'
import PlaceGrid from '~components/Place/PlaceGrid'

interface OtherPlacesProps {
  userId: string
}

const OtherPlaces = ({ userId }: OtherPlacesProps) => {
  const { t } = useTranslation('place')
  const { data: user } = useUser(userId)

  if (!user?.espaces || user?.espaces.length === 0) return null

  return (
    <Box pt={12}>
      <Flex alignItems="flex-start" pl={2}>
        <Box w="18px">
          <Arrow />
        </Box>
        <Text textStyle="h2" mb={4} pl={3} lineHeight={1}>
          {t('detail.otherPlaces', { name: user?.structureName })}
        </Text>
      </Flex>
      <PlaceGrid places={user?.espaces} />
    </Box>
  )
}

export default OtherPlaces
