import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import { ROUTE_PLACES } from '~constants'
import { UsersPermissionsUser } from '~typings/api'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'
import { Text } from '@chakra-ui/react'

interface Props {
  user: UsersPermissionsUser
}

const InfoCompanyApplications = ({ user }: Props) => {
  const { t } = useTranslation('account')
  const { currentCampaign } = useCampaignContext()

  if (!currentCampaign) return null

  return (
    <Info
      img={
        currentCampaign?.mode === 'applications'
          ? '/assets/img/companyApplicationsEmpty.svg'
          : '/assets/img/companyApplicationsNext.svg'
      }
      title={
        currentCampaign?.mode === 'applications'
          ? t(`applications.info.title.no_applications`, currentCampaign)
          : t(`applications.info.title.next`, currentCampaign)
      }
      links={
        currentCampaign?.mode === 'applications'
          ? {
              text: t('applications.info.cta.no_applications'),
              url: ROUTE_PLACES + '?tab=1',
            }
          : currentCampaign?.article_link
          ? {
              text: t('applications.info.cta.next'),
              url: currentCampaign?.article_link,
            }
          : []
      }
    >
      <Text whiteSpace="pre-line">
        {currentCampaign?.mode === 'applications'
          ? t(`applications.info.text.no_applications`, {
              ...currentCampaign,
              application_end: format(
                currentCampaign?.application_end,
                'dd/MM/yyyy',
              ),
            })
          : t(`applications.info.text.next`, {
              ...currentCampaign,
              application_start: format(
                currentCampaign?.application_start,
                'dd/MM',
              ),
              application_end: format(
                currentCampaign?.application_end,
                'dd/MM',
              ),
            })}
      </Text>
    </Info>
  )
}

export default InfoCompanyApplications
