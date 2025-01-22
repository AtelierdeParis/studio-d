import { Box, HStack, Tooltip } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Warning from 'public/assets/img/warning.svg'
import { useQuery } from 'react-query'
import { client } from '~api/client-api'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const THRESHOLD = 3

const ApplicationCountAlert = ({
  applicationId,
  onlyIcon = false,
}: {
  applicationId: string
  onlyIcon?: boolean
}) => {
  const { selectedCampaign } = useSelectedCampaign()
  const { t } = useTranslation('application')
  const { data } = useQuery(['application-count', applicationId], () =>
    client.applications.preselectedCountDetail(applicationId),
  )

  // @ts-ignore
  const count = data?.data?.count || 0

  if (count >= THRESHOLD && selectedCampaign?.mode === 'preselections') {
    return (
      <HStack color="gray.400" alignItems="center" spacing={3}>
        <Tooltip
          isDisabled={!onlyIcon}
          label={t('place.detail.preselected_count')}
        >
          <Box color="gray.400" opacity={0.7}>
            <Warning />
          </Box>
        </Tooltip>
        {!onlyIcon && (
          <Box lineHeight="1.25">{t('place.detail.preselected_count')}</Box>
        )}
      </HStack>
    )
  }

  return null
}

export default ApplicationCountAlert
