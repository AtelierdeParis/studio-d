import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Select,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import Arrow from 'public/assets/img/arrow-bottom.svg'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import PlacesListCampaignHelper from '~components/Campaign/Places/PlacesListCampaignHelper'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import MobileMap from '~components/Place/MobileMap'
import NoResult from '~components/Place/NoResult'
import PlaceGrid from '~components/Place/PlaceGrid'
import PlaceList from '~components/Place/PlaceList'
import PlaceSearch from '~components/Place/PlaceSearch'
import { ROUTE_PLACES } from '~constants'
import { useInfinitePlaces } from '~hooks/useInfinitePlaces'
import { useScrollBottom } from '~hooks/useScrollBottom'
import { SortOptions, formatSearch, formatSearchToQuery } from '~utils/search'

const styleSelected = {
  color: 'blue.500',
  borderBottomColor: 'blue.500',
}

const PlacesPage = () => {
  const {
    currentCampaign,
    isLoading: campaignLoading,
    hasActiveCampaign,
  } = useCampaignContext()
  const router = useRouter()
  const isCampaignTab = (router.query.tab as string) === '1'

  const initialFilters =
    hasActiveCampaign && isCampaignTab
      ? {
          'disponibilities.campaign': currentCampaign?.id,
        }
      : {}

  const isMobile = useBreakpointValue({ base: true, md: false })
  const { t } = useTranslation('place')
  const ref = useRef(null)
  const [isGridView, setGridView] = useState<boolean>(true)
  const form = useForm<any>({
    defaultValues: {
      perimeter: 15,
      ...router.query,
    },
  })

  const [searchParams, setSearchParams] = useState<any>(initialFilters)

  useEffect(() => {
    setSearchParams({ ...initialFilters, ...formatSearch(router.query) })
  }, [hasActiveCampaign, isCampaignTab])
  const queryClient = useQueryClient()

  const {
    data: places,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfinitePlaces(
    {
      _limit: 48,
      ...searchParams,
    },
    isCampaignTab ? 'campaignPlaces' : 'solidarityPlaces',
    !campaignLoading,
  )

  const filteredPlaces = places?.pages?.flat() ?? []

  const nbPlaces = useMemo(() => filteredPlaces.length, [
    places?.pages,
    searchParams,
  ])
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

    setSearchParams({ ...newSearch, ...initialFilters })

    router.push({
      pathname: ROUTE_PLACES,
      query: formatSearchToQuery(data),
    })
  }

  return (
    <Container px={0}>
      <NextSeo title={t('common:title.places')} />
      <FormProvider {...form}>
        {hasActiveCampaign && isCampaignTab ? (
          <Stack
            direction={{ base: 'column', xl: 'row' }}
            spacing={4}
            paddingBottom={10}
          >
            <Box flex={1}>
              <PlacesListCampaignHelper marginBottom={0} />
            </Box>
            <Flex flex={1} alignItems="stretch">
              <PlaceSearch onSubmit={onSubmit} isCampaignTab={isCampaignTab} />
            </Flex>
          </Stack>
        ) : (
          <Box>
            <PlaceSearch onSubmit={onSubmit} isCampaignTab={isCampaignTab} />
          </Box>
        )}
        {!isLoading && !isFetching && filteredPlaces.length === 0 ? (
          <NoResult />
        ) : (
          <>
            <MobileMap places={filteredPlaces} />
            <Flex justifyContent="space-between" pb={4} alignItems="center">
              <Flex alignItems="center">
                {nbPlaces > 0 && (
                  <>
                    <Arrow />
                    <Text textStyle="h2" pl={4}>
                      {isCampaignTab
                        ? t(
                            `search.${
                              isPlural
                                ? 'nbCampaignPlacesWithDispos'
                                : 'nbCampaignPlaceWithDispo'
                            }`,
                            {
                              nb: nbPlaces,
                            },
                          )
                        : t(
                            `search.${
                              Object.keys(router.query).filter(
                                (k) => k !== 'sortBy',
                              ).length > 0
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
                      onChange={(event) => {
                        form.setValue('sortBy', event.target.value)
                        onSubmit(form.getValues())
                        queryClient.refetchQueries(
                          [
                            isCampaignTab
                              ? 'campaignPlaces'
                              : 'solidarityPlaces',
                          ],
                          { active: true },
                        )
                      }}
                    >
                      {!isCampaignTab && (
                        <option value={SortOptions.DISPO_ASC}>
                          {t('search.filterBy.dispo')}
                        </option>
                      )}
                      {!isCampaignTab && (
                        <option value={SortOptions.NB_DISPO_DESC}>
                          {t('search.filterBy.nbDispo')}
                        </option>
                      )}
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
                places={filteredPlaces}
                isFetching={isFetching}
                isLoading={isLoading}
                gridRef={ref}
                gridMode={
                  isCampaignTab
                    ? 'campaign'
                    : hasActiveCampaign
                    ? 'solidarity'
                    : undefined
                }
              />
            ) : (
              <PlaceList
                places={filteredPlaces}
                isFetching={isFetching}
                isLoading={isLoading}
                listRef={ref}
                listMode={
                  isCampaignTab
                    ? 'campaign'
                    : hasActiveCampaign
                    ? 'solidarity'
                    : undefined
                }
              />
            )}
          </>
        )}
      </FormProvider>
    </Container>
  )
}

export default PlacesPage
