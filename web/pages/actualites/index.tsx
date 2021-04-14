import React, { useRef } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import { useActualities } from '~hooks/useActualities'
import { useNbActualities } from '~hooks/useNbActualities'
import { useScrollBottom } from '~hooks/useScrollBottom'
import ActuCard from '~components/Actuality/ActuCard'
import ActuSkeleton from '~components/Actuality/ActuSkeleton'
import Loading from '~components/Loading'
import Loader from '~components/Loader'
import { useTranslation } from 'next-i18next'

const Actuality = () => {
  const ref = useRef(null)
  const { t } = useTranslation('actuality')
  const { data: nbActu } = useNbActualities()
  const {
    data: actus,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useActualities(nbActu)

  useScrollBottom(
    ref,
    () => {
      if (hasNextPage && !isFetching) {
        fetchNextPage()
      }
    },
    true,
  )

  return (
    <Container>
      <Heading
        as="h1"
        textStyle="h1"
        mt={16}
        mb={18}
        textAlign="center"
        maxW="container.sm"
        mx="auto"
      >
        {t('title')}
      </Heading>
      <SimpleGrid
        columns={{
          lg: 3,
          md: 2,
          base: 1,
        }}
        columnGap={8}
        rowGap={16}
        ref={ref}
      >
        <Loading isLoading={isLoading} skeleton={<ActuSkeleton />}>
          {actus?.pages &&
            actus.pages
              .flat()
              .map((actu) => <ActuCard actu={actu} key={actu.id} />)}
        </Loading>
      </SimpleGrid>
      {isFetching && <Loader mt={10} />}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'actuality'])),
    },
  }
}

export default Actuality
