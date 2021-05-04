import React, { useMemo } from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { useUser } from '~hooks/useUser'
import PlaceGrid from '~components/Place/PlaceGrid'
import { useRouter } from 'next/router'

interface Props {
  userId: string
}

const OtherPlaces = ({ userId }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('place')
  const { data: user } = useUser(userId)

  const places = useMemo(() => {
    if (!user?.espaces || user?.espaces.length === 0) return null
    return user?.espaces.filter((place) => place.slug !== router.query.id)
  }, [user?.espaces, router.query.placeId])

  if (!places || places.length === 0) return null

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
      <PlaceGrid places={places} />
    </Box>
  )
}

export default OtherPlaces
