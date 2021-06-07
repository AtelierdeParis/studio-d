import React from 'react'
import { Text, Box, Flex, Button, AspectRatio, LinkBox } from '@chakra-ui/react'
import LinkOverlay from '~components/LinkOverlay'
import Image from '~components/Image'
import Link from '~components/Link'
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
    <Link
      _hover={{
        textDecoration: 'none',
      }}
      href={{
        pathname: ROUTE_ACTU_DETAIL,
        query: { id: actu.slug },
      }}
    >
      <AspectRatio w="100%" maxH="300px" ratio={16 / 9} overflow="hidden">
        <Image
          // @ts-ignore
          src={actu?.image.formats.thumbnail.url || actu?.image?.url}
          objectFit="cover"
          transition="transform ease-in-out 200ms"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
      </AspectRatio>
      <Flex
        px={{ base: 0, md: 4 }}
        py={4}
        direction="column"
        alignItems="flex-start"
        flex={1}
      >
        <Box>
          <Text fontFamily="mabry medium" fontSize="lg">
            {actu.title}
          </Text>

          <Text color="gray.600">
            {t('date', {
              date: format(actu.created_at, 'd MMMM yyyy'),
            })}
          </Text>
          <Text
            fontSize="sm"
            color="gray.600"
            mt={5}
            noOfLines={4}
            wordBreak="break-all"
          >
            {removeMd(actu.content)}
          </Text>
        </Box>
        <Button variant="line" fontSize="sm" mt={5}>
          {t('more')}
        </Button>
      </Flex>
    </Link>
  )
}

export default ActuCard
