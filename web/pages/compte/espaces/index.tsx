import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoPlace from '~components/Account/Info/InfoPlace'
import PlaceList from '~components/Account/Place/PlaceList'
import Loading from '~components/Loading'
import { useMyPlaces } from '~hooks/useMyPlaces'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import PlacesAdminCampaignHelper from '~components/Campaign/Places/Admin/PlacesAdminCampaignHelper'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'
import { Box } from '@chakra-ui/react'
interface Props {
  user: UsersPermissionsUser
}

const AccountPlace = ({ user }: Props) => {
  const { currentCampaign, isCampaignPlace } = useCampaignContext()
  const { t } = useTranslation('account')
  const { t: TPlace } = useTranslation('place')
  const { data: places, isLoading } = useMyPlaces()

  return (
    <Loading isLoading={isLoading} isCentered>
      <NextSeo title={t('title.places')} />
      {isCampaignPlace && currentCampaign?.mode === 'disponibilities' && (
        <Box paddingY={4}>
          <PlacesAdminCampaignHelper
            title={TPlace(`campaign.helpers.disponibilities.home.title`, {
              title: currentCampaign?.title,
            })}
            description={TPlace(
              `campaign.helpers.disponibilities.home.description`,
              {
                date: format(currentCampaign?.disponibility_end, 'dd/MM/yyyy'),
              },
            )}
          />
        </Box>
      )}
      {!places || places?.length === 0 ? (
        <InfoPlace />
      ) : (
        <PlaceList places={places} />
      )}
    </Loading>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'account',
          'place',
          'modal',
        ])),
      },
    }
  },
)

export default AccountPlace
