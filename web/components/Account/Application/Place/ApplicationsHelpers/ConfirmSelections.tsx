import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import PreselectionsWarning from 'public/assets/img/preselectionsWarning.svg'
import { useTranslation } from 'next-i18next'
import useToast from '~hooks/useToast'
import { client } from '~api/client-api'
import { Application, Disponibility } from '~typings/api'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'

const ConfirmSelections = ({
  preselectedApplications,
}: {
  preselectedApplications: Application[]
}) => {
  const { query } = useRouter()
  const queryClient = useQueryClient()
  const preselections = preselectedApplications?.length
  const { t } = useTranslation('application')
  const { errorToast, successToast } = useToast()
  const { campaign } = query
  const confirmSelections = async () => {
    try {
      await client.disponibilities.campaignConfirmCreate(
        preselectedApplications[0]?.disponibility.id as string,
        campaign as string,
        //@ts-expect-error
        preselectedApplications[0]?.disponibility,
      )

      queryClient.refetchQueries([
        'myApplications',
        query?.disponibility as string,
      ])
      successToast(t('place.helper.confirm_success'))
    } catch (e) {
      errorToast(t('error'))
    }
  }

  return (
    <Box paddingY={2}>
      <Stack
        background="orange.100"
        borderRadius="4px"
        p={4}
        direction={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <HStack>
          <PreselectionsWarning />
          <Text as="span" color="orange.600" pl={1}>
            {t(
              `place.helper.confirm_preselection${
                preselections > 1 ? 's' : ''
              }`,
              {
                num: preselections,
              },
            )}
          </Text>
        </HStack>
        <Button
          whiteSpace="normal"
          textAlign="center"
          lineHeight="inherit"
          height="auto!important"
          size="xl"
          p={2}
          onClick={confirmSelections}
        >
          {t('place.helper.confirm_cta')}
        </Button>
      </Stack>
    </Box>
  )
}

export default ConfirmSelections
