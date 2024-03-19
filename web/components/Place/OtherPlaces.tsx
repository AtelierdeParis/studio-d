import React, { useMemo } from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { useUser } from '~hooks/useUser'
import PlaceGrid from '~components/Place/PlaceGrid'
import { useRouter } from 'next/router'
import { usePlaces } from '~hooks/usePlaces'

interface Props {
  userId: string
}

const OtherPlaces = ({ userId }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('place')
  const { data: user } = useUser(userId)
  const { tab, id } = router?.query

  const { data: places } = usePlaces(
    {
      published_eq: true,
      users_permissions_user: userId,
      slug_ne: id,
      _limit: 20,
      _sort: 'dispoAsc',
    },
    'otherPlaces',
  )

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
      <PlaceGrid places={places} gridMode={tab ? 'solidarity' : null} />
    </Box>
  )
}

export default OtherPlaces
