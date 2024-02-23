import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { requireAuth } from '~utils/auth'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { Box } from '@chakra-ui/react'
import PlacesAdminCampaignHelper from '~components/Campaign/Places/Admin/PlacesAdminCampaignHelper'
import CampaignSelector from '~components/Account/Application/Place/CampaignSelector/CampaignSelector'
import DisponibilitiesSelector from '~components/Account/Application/Place/DisponibilitiesSelector/DisponibilitiesSelector'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const PlaceApplications = () => {
  const { t } = useTranslation('application')
  const { t: tAccount } = useTranslation('account')
  const { selectedCampaign } = useSelectedCampaign()

  return (
    <>
      <NextSeo title={tAccount('title.requests')} />
      {selectedCampaign?.mode === 'applications' && (
        <Box paddingY={4}>
          <PlacesAdminCampaignHelper
            title={t(`place.helper.open_applications_start`, {
              title: selectedCampaign?.title,
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
