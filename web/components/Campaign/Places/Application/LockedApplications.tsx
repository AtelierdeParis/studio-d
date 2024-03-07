import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useContext, useMemo } from 'react'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Link from '~components/Link'
import BookingScheduleContext from '~components/Place/Booking/BookingScheduleContext'
import { ROUTE_ACCOUNT_MY_APPLICATIONS } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { Disponibility } from '~typings/api'
import { format } from '~utils/date'

const LockedApplications = ({
  disponibilities,
}: {
  disponibilities: Disponibility[]
}) => {
  const { t } = useTranslation('place')
  const {
    data: user,
    canApply,
    applications,
    remainingApplications,
  } = useCurrentUser()
  const { currentCampaign } = useCampaignContext()

  const { selected } = useContext(BookingScheduleContext)

  const unselectedDisponibilities = useMemo(
    () =>
      disponibilities
        .map((d) => d?.id)
        ?.filter(
          (d) =>
            !selected
              ?.map((s) => s?.extendedProps?.id.toString())
              ?.includes(d.toString()),
        ),
    [disponibilities, selected],
  )

  const hasReachedMaxWithSelected =
    selected?.length + applications?.length >=
      currentCampaign?.applications_max && unselectedDisponibilities?.length > 0

  if (remainingApplications === 0) {
    return (
      <Box backgroundColor="gray.100" p={6} width="100%" borderRadius="8px">
        <Text as="span" fontWeight="bold">
          {t('detail.campaign.locked_max_start')}
        </Text>
        <Text as="span" pl={1}>
          {t(`detail.campaign.locked_max_middle`, {
            title: currentCampaign?.title,
          })}
        </Text>
        <Link href={ROUTE_ACCOUNT_MY_APPLICATIONS}>
          <Text as="span" pl={1} textDecoration="underline">
            {t(`detail.campaign.locked_max_cta`, {
              end_applications_date: format(currentCampaign?.application_end),
            })}
          </Text>
        </Link>
        <Text as="span" pl={1}>
          {t(`detail.campaign.locked_max_end`)}
        </Text>
      </Box>
    )
  }

  if (hasReachedMaxWithSelected) {
    const plural = remainingApplications === 1 ? 'singular' : 'plural'
    return (
      <Box backgroundColor="gray.100" p={6} width="100%" borderRadius="8px">
        <Text as="span" fontWeight="bold">
          {t(`detail.campaign.locked_application_start_remaining_${plural}`, {
            nb: remainingApplications,
          })}
        </Text>
        <Text as="span" pl={1}>
          {t(`detail.campaign.locked_application_middle`, {
            title: currentCampaign?.title,
          })}
        </Text>
        <Link href={ROUTE_ACCOUNT_MY_APPLICATIONS}>
          <Text as="span" pl={1} textDecoration="underline">
            {t(`detail.campaign.locked_application_cta_${plural}`)}
          </Text>
        </Link>
        <Text as="span" pl={1}>
          {t(`detail.campaign.locked_application_remaining_end`)}
        </Text>
      </Box>
    )
  }

  if (!canApply && user?.type === 'company') {
    const plural = applications?.length === 1 ? 'singular' : 'plural'
    return (
      <Box backgroundColor="gray.100" p={6} width="100%" borderRadius="8px">
        <Text as="span" fontWeight="bold">
          {t(`detail.campaign.locked_application_start_${plural}`, {
            nb: applications?.length,
          })}
        </Text>
        <Text as="span" pl={1}>
          {t(`detail.campaign.locked_application_middle`, {
            title: currentCampaign?.title,
          })}
        </Text>
        <Link href={ROUTE_ACCOUNT_MY_APPLICATIONS}>
          <Text as="span" pl={1} textDecoration="underline">
            {t(`detail.campaign.locked_application_cta_${plural}`)}
          </Text>
        </Link>
        <Text as="span" pl={1}>
          {t(`detail.campaign.locked_application_end`)}
        </Text>
      </Box>
    )
  }
  return null
}

export default LockedApplications
