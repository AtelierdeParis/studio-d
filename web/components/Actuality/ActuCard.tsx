import React from 'react'
import { Text, Box, Button, AspectRatio, LinkBox } from '@chakra-ui/react'
import LinkOverlay from '~components/LinkOverlay'
import Image from '~components/Image'
import { format } from '~utils/date'
import { ROUTE_ACTU_DETAIL } from '~constants'
import { Actuality } from '~typings/api'
import { useTranslation } from 'next-i18next'
import removeMd from 'remove-markdown'

interface IActuCard {
  actu: Actuality
}

const ActuCard = ({ actu }: IActuCard) => {
  const { t } = useTranslation('actuality')

  return (
    <LinkBox
      role="group"
      _hover={{
        bgColor: 'gray.hover',
      }}
    >
      <AspectRatio w="100%" maxH="300px" ratio={16 / 9} overflow="hidden">
        <Image
          src={actu?.image?.url}
          objectFit="cover"
          transition="transform ease-in-out 200ms"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
      </AspectRatio>
      <Box px={4} py={4}>
        <LinkOverlay
          href={{
            pathname: ROUTE_ACTU_DETAIL,
            query: { id: actu.id },
          }}
        >
          <Text fontFamily="mabry medium" fontSize="lg">
            {actu.title}
          </Text>
        </LinkOverlay>
        <Text color="gray.600">
          {t('date', {
            date: format(actu.created_at, 'd MMMM yyyy'),
          })}
        </Text>
        <Text fontSize="sm" color="gray.600" mt={5} noOfLines={4}>
          {removeMd(actu.content)}
        </Text>
        <Button variant="line" fontSize="sm" mt={5}>
          {t('more')}
        </Button>
      </Box>
    </LinkBox>
  )
}

export default ActuCard
