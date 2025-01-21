import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import ApplicationSelected from 'public/assets/img/applicationSelected.svg'
import { useQueryClient } from 'react-query'
import { client } from '~api/client-api'
import Link from '~components/Link'
import { ROUTE_CONTACT } from '~constants'
import useSelectedCampaign from '~hooks/useSelectedCampaign'
import useToast from '~hooks/useToast'
import RemoveIcon from '~public/assets/icons/RemoveIcon'
import { Application } from '~typings/api'

const ApplicationPreselectButton = ({
  application,
  canPreselect,
  hasValidatedApplications,
}: {
  application: Application
  canPreselect: boolean
  hasValidatedApplications: boolean
}) => {
  const { t } = useTranslation('application')
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  const { query } = useRouter()
  const { selectedCampaign } = useSelectedCampaign()

  const handleStatusChange = async (status) => {
    try {
      //@ts-expect-error
      await client.applications.applicationsUpdate(application.id, {
        ...application,
        status,
      })
      queryClient.refetchQueries([
        'myApplications',
        query?.disponibility as string,
      ])
      successToast(
        t(
          `place.detail.${
            status === 'preselected'
              ? 'preselected_success'
              : 'deselected_success'
          }`,
        ),
      )
    } catch (e) {
      errorToast(t('error'))
    }
  }

  return (
    <VStack spacing={4} width="100%">
      {(application?.status === 'preselected' ||
        application?.status === 'confirmed') && (
        <Button
          isFullWidth
          borderRadius={0}
          leftIcon={<RemoveIcon stroke="#b62525" />}
          display="flex"
          justifyContent={'flex-start'}
          p={3}
          backgroundColor={'rgba(182,37,37, 0.18)'}
          color="black"
          _hover={{
            backgroundColor: 'rgba(182,37,37, 0.28)',
          }}
          _active={{
            backgroundColor: 'rgba(182,37,37, 0.38)',
          }}
          height="auto!important"
          onClick={() => {
            handleStatusChange(null)
          }}
          isDisabled={
            selectedCampaign?.mode !== 'preselections' ||
            application?.status === 'confirmed'
          }
        >
          <Text pl={1}>{t('place.detail.deselect')}</Text>
        </Button>
      )}

      {application?.status === null && (
        <>
          <Button
            isFullWidth
            borderRadius={0}
            leftIcon={<ApplicationSelected />}
            display="flex"
            justifyContent={'flex-start'}
            p={3}
            backgroundColor={'rgba(110, 174, 127, 0.25)'}
            color="black"
            _hover={{
              backgroundColor: 'rgba(110, 174, 127, 0.4)',
            }}
            _active={{
              backgroundColor: 'rgba(110, 174, 127, 0.6)',
            }}
            height="auto!important"
            onClick={() => {
              handleStatusChange('preselected')
            }}
            isDisabled={
              !canPreselect ||
              application?.status === 'confirmed' ||
              hasValidatedApplications
            }
          >
            <Text pl={1}>{t('place.detail.preselect')}</Text>
          </Button>

          {!canPreselect && (
            <Text pl={1} color="gray.500">
              {t('place.preselected_limit_reached')}
            </Text>
          )}
        </>
      )}

      {(application?.status === 'confirmed' || hasValidatedApplications) && (
        <Box color="gray.500">
          <Text as="span">{t('place.detail.confirmed_helper_start')}</Text>
          <Text
            as={Link}
            href={ROUTE_CONTACT}
            pl={1}
            textDecoration="underline"
          >
            {t('place.detail.confirmed_helper_cta')}
          </Text>
          <Text as="span" pl={1}>
            {t('place.detail.confirmed_helper_end')}
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export default ApplicationPreselectButton
