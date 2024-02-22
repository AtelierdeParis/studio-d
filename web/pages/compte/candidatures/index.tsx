import React, { useEffect, useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { requireAuth } from '~utils/auth'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import ApplicationSelector from '~components/Account/Application/Place/Selectors/ApplicationSelector'
import ApplicationPlaceData from '~components/Account/Application/Place/ApplicationPlaceData'
import { useRouter } from 'next/router'
import { useMyPlaces } from '~hooks/useMyPlaces'
import PlacesAdminCampaignHelper from '~components/Campaign/Places/Admin/PlacesAdminCampaignHelper'
import { format } from '~utils/date'

const PlaceApplications = () => {
  const { t } = useTranslation('application')
  const { t: tAccount } = useTranslation('account')
  const { currentCampaign } = useCampaignContext()
  const [searchParams, setSearchParams] = useState<any>()
  const router = useRouter()
  const { disponibility, espace } = router.query
  const { data: places } = useMyPlaces(
    {
      'disponibilities.campaign': currentCampaign?.id,
    },
    { enabled: Boolean(currentCampaign?.id) },
  )

  useEffect(() => {
    const search = {}
    if (disponibility) {
      search['disponibility_eq'] = Number(disponibility)
    }
    if (espace) {
      search['espace_eq'] = Number(espace)
    }
    setSearchParams(search)
  }, [router.query])

  if (currentCampaign)
    return (
      <>
        <NextSeo title={tAccount('title.requests')} />
        {currentCampaign?.mode === 'applications' && (
          <Box paddingY={4}>
            <PlacesAdminCampaignHelper
              title={t(`place.helper.open_applications_start`, {
                title: currentCampaign?.title,
              })}
              description={t(`place.helper.open_applications_end`)}
            />
          </Box>
        )}
        <Flex
          alignItems="center"
          pt={{ base: 4, md: 8 }}
          pb={4}
          justifyContent={{ base: 'flex-end', md: 'space-between' }}
        >
          <Text
            textStyle="accountTitle"
            pl={4}
            display={{ base: 'none', md: 'block' }}
            fontSize="24px"
            fontWeight="400"
            fontFamily="mabry"
          >
            {t('place.title', { title: currentCampaign?.title })}
          </Text>
        </Flex>
        {Boolean(places?.length) && (
          <HStack>
            <ApplicationSelector
              places={places?.map((p) => ({
                ...p,
                disponibilities: p.disponibilities?.filter(
                  //@ts-expect-error
                  (d) => d.campaign === currentCampaign?.id,
                ),
              }))}
            />
          </HStack>
        )}

        {Boolean(searchParams && Object.keys(searchParams)?.length) && (
          <ApplicationPlaceData searchParams={searchParams} />
        )}
      </>
    )

  return null
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['account', 'application'])),
      },
    }
  },
)

export default PlaceApplications
