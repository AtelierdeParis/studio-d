import { HStack, Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ApplicationPlaceFetcher from '~components/Account/Application/Place/ApplicationPlaceFetcher'
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
    name: ['myApplications', searchParams?.disponibility_eq as string],
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
      <Box p={4}>
        <Text>{t('place.no_places')}</Text>
      </Box>
    )
  }

  return (
    <>
      {Boolean(places?.length) && !isLoading && !isFetching && (
        <HStack>
          <ApplicationSelector
            places={places?.map((p) => ({
              ...p,
              disponibilities: p.disponibilities?.filter(
                (d) => d.campaign?.toString() === query.campaign.toString(),
              ),
            }))}
            hasConfirmedSelection={hasConfirmedSelection}
          />
        </HStack>
      )}

      {Boolean(searchParams && Object.keys(searchParams)?.length) && (
        <ApplicationPlaceFetcher searchParams={searchParams} />
      )}
    </>
  )
}

export default DisponibilitiesSelector
