import React from 'react'
import {
  Flex,
  Box,
  Text,
  Button,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { useActualities } from '~hooks/useActualities'
import Link from '~components/Link'
import { ROUTE_ACTU } from '~constants'
import ActuCard from '~components/Actuality/ActuCard'

interface Props {}

const HomeActus = ({}: Props) => {
  const { t } = useTranslation('home')
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })
  const { data: actus } = useActualities({
    _limit: isMobile ? 2 : 3,
    _sort: 'created_at:desc',
  })

  if (!actus || actus.length === 0) return null

  return (
    <Box w="100%">
      <Flex alignItems="flex-start" pl={{ base: 0, md: 2 }}>
        <Box w="18px">
          <Arrow />
        </Box>
        <Text textStyle="h2" mb={4} pl={3} lineHeight={1}>
          {t('news.title')}
        </Text>
      </Flex>
      <SimpleGrid
        columns={{
          lg: 3,
          md: 2,
          base: 1,
        }}
        columnGap={8}
        rowGap={{ base: 5, md: 16 }}
      >
        {actus.slice(0, isMobile ? 2 : 3).map((actu) => (
          <ActuCard actu={actu} key={actu.id} />
        ))}
      </SimpleGrid>
      <Flex justifyContent="center" pt={10}>
        <Button
          as={Link}
          href={ROUTE_ACTU}
          variant="outline"
          colorScheme="blue"
          size="xl"
        >
          {t('news.btn')}
        </Button>
      </Flex>
    </Box>
  )
}

export default HomeActus
