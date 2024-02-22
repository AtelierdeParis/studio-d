import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { requireAuth } from '~utils/auth'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import PlacesAdminCampaignHelper from '~components/Campaign/Places/Admin/PlacesAdminCampaignHelper'
import CampaignSelector from '~components/Account/Application/Place/CampaignSelector/CampaignSelector'
import DisponibilitiesSelector from '~components/Account/Application/Place/DisponibilitiesSelector/DisponibilitiesSelector'

const PlaceApplications = () => {
  const { t } = useTranslation('application')
  const { t: tAccount } = useTranslation('account')
  const { allPlaceCampaigns } = useCampaignContext()
  const router = useRouter()
  const { campaign } = router.query
  const selectedCampaign = allPlaceCampaigns?.find(
    (c) => c?.id?.toString() === campaign?.toString(),
  )

  if (allPlaceCampaigns)
    return (
      <>
        <NextSeo title={tAccount('title.requests')} />
        {selectedCampaign?.mode === 'applications' && (
          <Box paddingY={4}>
            <PlacesAdminCampaignHelper
              title={t(`place.helper.open_applications_start`, {
                title: allPlaceCampaigns?.find(
                  (c) => c?.id.toString() === campaign?.toString(),
                )?.title,
              })}
              description={t(`place.helper.open_applications_end`)}
            />
          </Box>
        )}
        <CampaignSelector>
          <DisponibilitiesSelector />
        </CampaignSelector>
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
