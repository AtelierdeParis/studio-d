import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_PLACES, ROUTE_PLACES } from '~constants'
import { UsersPermissionsUser } from '~typings/api'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'

interface Props {
  user: UsersPermissionsUser
}

const InfoPlaceApplications = ({ user }: Props) => {
  const { t } = useTranslation('account')
  const { currentCampaign } = useCampaignContext()
  if (!currentCampaign) return null

  return (
    <Info
      img="/assets/img/companyApplicationsEmpty.svg"
      title={t(`applications.info.title.no_applications`, currentCampaign)}
      links={{
        url: user.type === 'place' ? ROUTE_ACCOUNT_PLACES : ROUTE_PLACES,
        text: t(`requests.info.link.${user.type}`),
      }}
    >
      {t(`applications.info.text.no_applications_company`, {
        ...currentCampaign,
        date: format(currentCampaign?.application_end, 'dd/MM'),
      })}
    </Info>
  )
}

export default InfoPlaceApplications
