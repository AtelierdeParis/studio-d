import { Box, Text, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Tag from '~components/Tag'
import useIsOccupied from '~hooks/useIsOccupied'
import useNbDisponibility from '~hooks/useNbDisponibility'
import { Espace } from '~typings/api'

const PlaceListItemInfo = ({ place }: { place: Espace }) => {
  const { booked } = useNbDisponibility(place.disponibilities)
  const isOccupied = useIsOccupied(booked)
  const { t } = useTranslation('place')

  return (
    <Box paddingY={4}>
      <Text fontSize="lg" fontFamily="mabry medium">
        {place.name}
      </Text>
      <Flex>
        <Text mr={2} display={{ base: 'none', md: 'block' }}>
          {place.address}
        </Text>
        {isOccupied && <Tag status="occupied">{t('list.occupied')}</Tag>}
      </Flex>
    </Box>
  )
}

export default PlaceListItemInfo
