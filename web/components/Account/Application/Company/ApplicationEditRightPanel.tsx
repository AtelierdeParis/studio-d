import { VStack, Divider, Button, Text, HStack, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Application } from '~typings/api'
import BackIcon from '~public/assets/icons/BackIcon'
import ForbiddenIcon from '~public/assets/icons/ForbiddenIcon'
import ValidateIcon from '~public/assets/icons/ValidateIcon'
import ConfirmButton from '~components/Account/Application/ConfirmButton'
import Link from '~components/Link'

const ApplicationEditRightPanel = ({
  application,
  isLoading,
  handleBack,
  handleDelete,
  handleSubmit,
}: {
  application: Application
  isLoading?: boolean
  handleBack: () => void
  handleDelete: () => void
  handleSubmit: () => void
}) => {
  const { t } = useTranslation('application')

  const espace = application?.disponibility?.espace
  //   @ts-expect-error
  const { email, phone, website } = espace?.users_permissions_user ?? {}

  return (
    <VStack p={{ base: 0, md: 4 }} spacing={4}>
      <VStack width="100%" alignItems="stretch">
        <Button
          isFullWidth
          borderRadius={0}
          leftIcon={<BackIcon stroke={'black'} />}
          display="flex"
          justifyContent={'flex-start'}
          p={3}
          backgroundColor="gray.100"
          _hover={{
            backgroundColor: 'gray.200',
          }}
          _active={{
            backgroundColor: 'gray.300',
          }}
          color="black"
          height="auto!important"
          onClick={handleBack}
          isDisabled={isLoading}
        >
          <Text pl={1}>{t('company.detail.back')}</Text>
        </Button>

        <ConfirmButton
          helper={t('company.table.delete_helper')}
          handleConfirm={handleDelete}
          confirmLabel={t('company.table.delete')}
        >
          <Button
            isFullWidth
            borderRadius={0}
            leftIcon={<ForbiddenIcon stroke={'#B62525'} />}
            display="flex"
            justifyContent={'flex-start'}
            p={3}
            backgroundColor="rgba(182, 37, 37, 0.18)"
            _hover={{
              backgroundColor: 'rgba(182, 37, 37, 0.28)',
            }}
            _active={{
              backgroundColor: 'rgba(182, 37, 37, 0.38)',
            }}
            color="black"
            height="auto!important"
            isDisabled={isLoading}
          >
            <Text pl={1}>{t('company.detail.cancel')}</Text>
          </Button>
        </ConfirmButton>

        <Button
          isFullWidth
          borderRadius={0}
          leftIcon={<ValidateIcon stroke={'white'} />}
          display="flex"
          justifyContent={'flex-start'}
          p={3}
          backgroundColor="rgba(40,53,131, 0.3)"
          _hover={{
            backgroundColor: 'rgba(40,53,131, 0.4)',
          }}
          _active={{
            backgroundColor: 'rgba(40,53,131, 0.5)',
          }}
          color="white"
          height="auto!important"
          //   isDisabled={isLoading}
          isLoading={isLoading}
          loadingText={t('company.detail.saving')}
          type="submit"
          id="submit"
        >
          <Text pl={1}>{t('company.detail.save')}</Text>
        </Button>
      </VStack>

      <Divider />

      <VStack alignItems="flex-start" fontWeight="600" spacing={4}>
        {/* @ts-expect-error */}
        <Text>{espace.name}</Text>
        <Box>
          <HStack>
            <Text as="span">{t('place.detail.right_panel.phone')}</Text>
            <Text as="span">{phone}</Text>
          </HStack>

          <HStack>
            <Text as="span">{t('place.detail.right_panel.email')}</Text>
            <Text as="span">{email}</Text>
          </HStack>

          <Text
            as={Link}
            href={website}
            target="_blank"
            color="gray.300"
            fontWeight={'500'}
            textDecoration="underline"
          >
            {website}
          </Text>
        </Box>
      </VStack>
    </VStack>
  )
}

export default ApplicationEditRightPanel
