import React, { useRef } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Heading, SimpleGrid } from '@chakra-ui/react'
import { useInfiniteActualities } from '~hooks/useInfiniteActualities'
import { useNbActualities } from '~hooks/useNbActualities'
import { useScrollBottom } from '~hooks/useScrollBottom'
import ActuCard from '~components/Actuality/ActuCard'
import ActuSkeleton from '~components/Actuality/ActuSkeleton'
import Loading from '~components/Loading'
import Loader from '~components/Loader'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'

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
  } = useInfiniteActualities(nbActu)

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
    <>
      <NextSeo title={t('common:title.actus')} />
      <Heading
        as="h1"
        textStyle="h1"
        layerStyle="mainTitle"
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
        columnGap={{ base: 4, md: 8 }}
        rowGap={{ base: 6, md: 16 }}
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
    </>
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
