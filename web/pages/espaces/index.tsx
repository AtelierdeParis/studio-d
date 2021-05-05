import React, { useRef, useState, useMemo, useEffect } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Container,
  Flex,
  Select,
  Button,
  Text,
  ButtonGroup,
  useBreakpointValue,
} from '@chakra-ui/react'
import PlaceSearch from '~components/Place/PlaceSearch'
import { useInfinitePlaces } from '~hooks/useInfinitePlaces'
import { useScrollBottom } from '~hooks/useScrollBottom'
import PlaceGrid from '~components/Place/PlaceGrid'
import PlaceList from '~components/Place/PlaceList'
import { formatSearch } from '~utils/search'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { useTranslation } from 'next-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { SortOptions } from '~utils/search'
import { useQueryClient } from 'react-query'
import NoResult from '~components/Place/NoResult'
import MobileMap from '~components/Place/MobileMap'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { formatSearchToQuery } from '~utils/search'
import { ROUTE_PLACES } from '~constants'

const styleSelected = {
  color: 'blue.500',
  borderBottomColor: 'blue.500',
}

const Places = () => {
  const router = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { t } = useTranslation('place')
  const ref = useRef(null)
  const [isGridView, setGridView] = useState<boolean>(true)
  const form = useForm({
    defaultValues: router.query,
  })
  const [searchParams, setSearchParams] = useState<any>({
    published_eq: true,
  })
  const queryClient = useQueryClient()

  const {
    data: places,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfinitePlaces({
    _limit: isGridView ? 12 : 6,
    ...searchParams,
  })
  const nbPlaces = useMemo(() => places?.pages?.flat().length, [places?.pages])
  const isPlural = useMemo(() => nbPlaces > 1, [nbPlaces])

  useEffect(() => {
    if (isMobile) setGridView(true)
  }, [isMobile])

  useScrollBottom(
    ref,
    () => {
      if (hasNextPage && !isFetching) {
        fetchNextPage()
      }
    },
    isGridView,
  )

  const onSubmit = (data) => {
    let forceSort
    if (
      !searchParams['disponibilities.start_gte'] &&
      Boolean(data?.startDate)
    ) {
      forceSort = true
      form.setValue('sortBy', 'nbDispoDesc')
    }
    const newSearch = formatSearch(data, forceSort)

    setSearchParams(newSearch)

    router.push({
      pathname: ROUTE_PLACES,
      query: formatSearchToQuery(data),
    })
  }

  return (
    <Container px={0}>
      <NextSeo title={t('common:title.places')} />
      <FormProvider {...form}>
        <PlaceSearch onSubmit={onSubmit} />
        {!isLoading && !isFetching && places?.pages?.flat().length === 0 ? (
          <NoResult />
        ) : (
          <>
            <MobileMap places={places?.pages?.flat()} />
            <Flex justifyContent="space-between" pb={4} alignItems="center">
              <Flex alignItems="center">
                {nbPlaces > 0 && (
                  <>
                    <Arrow />
                    <Text textStyle="h2" pl={4}>
                      {t(
                        `search.${
                          Object.keys(router.query).length > 0
                            ? 'nbPlacesWithDispo'
                            : 'nbPlace'
                        }${isPlural ? 's' : ''}`,
                        {
                          nb: nbPlaces,
                        },
                      )}
                    </Text>
                  </>
                )}
              </Flex>
              {!isMobile && (
                <ButtonGroup
                  spacing={4}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="line"
                    color="gray.500"
                    borderBottomColor="transparent"
                    {...(isGridView ? styleSelected : {})}
                    onClick={() => setGridView(true)}
                  >
                    {t('search.grid')}
                  </Button>
                  <Button
                    variant="line"
                    color="gray.500"
                    borderBottomColor="transparent"
                    {...(!isGridView ? styleSelected : {})}
                    onClick={() => setGridView(false)}
                  >
                    {t('search.list')}
                  </Button>
                  <Flex pl={10} alignItems="center">
                    <Text color="gray.500" whiteSpace="nowrap" pr={3}>
                      {t('search.filterBy.label')}
                    </Text>
                    <Select
                      variant="unstyled"
                      ref={form.register}
                      name="sortBy"
                      onChange={() => {
                        queryClient.refetchQueries(['places'], { active: true })
                      }}
                    >
                      <option value={SortOptions.DISPO_ASC}>
                        {t('search.filterBy.dispo')}
                      </option>
                      <option value={SortOptions.NB_DISPO_DESC}>
                        {t('search.filterBy.nbDispo')}
                      </option>
                      <option value={SortOptions.SURFACE_ASC}>
                        {t('search.filterBy.surfaceAsc')}
                      </option>
                      <option value={SortOptions.SURFACE_DESC}>
                        {t('search.filterBy.surfaceDesc')}
                      </option>
                    </Select>
                  </Flex>
                </ButtonGroup>
              )}
            </Flex>
            {isGridView ? (
              <PlaceGrid
                searchParams={searchParams}
                places={places?.pages?.flat()}
                isFetching={isFetching}
                isLoading={isLoading}
                gridRef={ref}
              />
            ) : (
              <PlaceList
                places={places?.pages?.flat()}
                isFetching={isFetching}
                isLoading={isLoading}
                listRef={ref}
              />
            )}
          </>
        )}
      </FormProvider>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'place'])),
    },
  }
}

export default Places
