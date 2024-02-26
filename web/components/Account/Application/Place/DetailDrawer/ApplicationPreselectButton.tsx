import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { Application } from '~typings/api'
import ApplicationSelected from 'public/assets/img/applicationSelected.svg'
import { useTranslation } from 'next-i18next'
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import RemoveIcon from '~public/assets/icons/RemoveIcon'
import Link from '~components/Link'
import { ROUTE_CONTACT } from '~constants'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const ApplicationPreselectButton = ({
  application,
}: {
  application: Application
}) => {
  const { selectedCampaign } = useSelectedCampaign()
  const { t } = useTranslation('application')
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  const { query } = useRouter()

  const handleStatusChange = async (status) => {
    try {
      //@ts-expect-error
      await client.applications.applicationsUpdate(application.id, {
        ...application,
        status,
      })
      queryClient.refetchQueries([
        'myApplications',
        query.disponibility_eq as string,
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
    <VStack spacing={4}>
      <Button
        isFullWidth
        borderRadius={0}
        leftIcon={
          application?.status === 'preselected' ? (
            <RemoveIcon stroke="black" />
          ) : (
            <ApplicationSelected />
          )
        }
        display="flex"
        justifyContent={'flex-start'}
        p={3}
        backgroundColor={
          application?.status === 'preselected'
            ? 'transparent'
            : 'rgba(110, 174, 127, 0.25)'
        }
        border={
          application?.status === 'preselected'
            ? '2px solid rgba(110, 174, 127, 0.25)'
            : 'none'
        }
        color="black"
        _hover={{
          backgroundColor: 'rgba(110, 174, 127, 0.4)',
        }}
        _active={{
          backgroundColor: 'rgba(110, 174, 127, 0.6)',
        }}
        height="auto!important"
        onClick={() => {
          handleStatusChange(
            application.status === 'preselected' ? null : 'preselected',
          )
        }}
        isDisabled={
          application?.status === 'confirmed' ||
          selectedCampaign?.mode === 'closed'
        }
      >
        <Text pl={1}>
          {application?.status === 'preselected'
            ? t('place.detail.deselect')
            : t('place.detail.preselect')}
        </Text>
      </Button>

      {application?.status === 'confirmed' && (
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
