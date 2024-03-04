import { Box, Text, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ApplicationDownloadAll from '~components/Account/Application/Place/ApplicationDownloadAll'
import ApplicationPlaceData from '~components/Account/Application/Place/ApplicationPlaceData'
import ApplicationsSearch from '~components/Account/Application/Place/ApplicationsSearch'
import ApplicationSelector from '~components/Account/Application/Place/DisponibilitiesSelector/DisponibilitiesSelectorFields'
import { useMyApplications } from '~hooks/useMyApplications'
import { useMyPlaces } from '~hooks/useMyPlaces'

const DisponibilitiesSelector = () => {
  const { t } = useTranslation('application')
  const [searchParams, setSearchParams] = useState<any>()
  const { query } = useRouter()
  const { data: places, isLoading, isFetching } = useMyPlaces(
    {
      'disponibilities.campaign': query.campaign,
    },
    { enabled: Boolean(query.campaign) },
    ['myPlaces', query.campaign as string],
  )

  const { data: applications } = useMyApplications({
    name: ['myApplications', query?.disponibility as string],
    campaignId: query.campaign as string,
    searchParams: { ...searchParams, _sort: 'company.structureName:asc' },
    options: {
      enabled:
        Boolean(searchParams?.disponibility_eq) &&
        Boolean(searchParams?.espace_eq),
    },
  })

  const hasConfirmedSelection = applications?.some(
    (application) => application?.status === 'confirmed',
  )

  useEffect(() => {
    const search = {}
    if (query.disponibility) {
      search['disponibility_eq'] = Number(query.disponibility)
    }
    if (query.espace) {
      search['espace_eq'] = Number(query.espace)
    }
    setSearchParams(search)
  }, [query])

  if (!places?.length) {
    return (
      <Box p={4} backgroundColor="gray.50" borderRadius={4}>
        <Text>{t('place.no_places')}</Text>
      </Box>
    )
  }

  return (
    <>
      {Boolean(places?.length) && !isLoading && !isFetching && (
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          justifyContent="space-between"
          alignItems="baseline"
        >
          <ApplicationSelector
            places={places?.map((p) => ({
              ...p,
              disponibilities: p.disponibilities?.filter(
                (d) => d.campaign?.toString() === query.campaign.toString(),
              ),
            }))}
            hasConfirmedSelection={hasConfirmedSelection}
          />
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            width={{ base: '100%', sm: 'auto' }}
            spacing={{ base: 0, sm: '' }}
          >
            <ApplicationsSearch />
            <ApplicationDownloadAll />
          </Stack>
        </Stack>
      )}

      {Boolean(searchParams && Object.keys(searchParams)?.length) && (
        <ApplicationPlaceData searchParams={searchParams} />
      )}
    </>
  )
}

export default DisponibilitiesSelector
