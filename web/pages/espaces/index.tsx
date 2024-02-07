import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import useCampaignContext from '~components/Campaign/useCampaignContext'
import PlacesPage from '~components/Place/PlacesPage'

import PlacesTabs from '~components/Place/PlacesTab'

const Places = () => {
  const { currentCampaign } = useCampaignContext()

  if (!currentCampaign) return <PlacesPage />

  return <PlacesTabs />
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
