// @ts-nocheck
import { Box, Divider, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Reference } from '~@types/reference'
import ApplicationSection from '~components/Account/Application/Place/DetailDrawer/ApplicationSection'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import { Application } from '~typings/api'

const ApplicationDetails = ({ application }: { application: Application }) => {
  const { t } = useTranslation('place')

  return (
    <VStack py={4}>
      <Box width="100%">
        <ApplicationFormTitle
          title={t('campaignApplication.references.title')}
          position="1."
        />
        <VStack
          px={4}
          mt={4}
          mb={10}
          width="100%"
          alignItems="flex-start"
          divider={<Divider opacity={0.4} />}
        >
          {application?.references?.map((reference: Reference, index) => (
            <Box key={index}>
              <Text color="blue.500" fontWeight="semibold">
                {t('campaignApplication.references.references_creation', {
                  index: index + 1,
                })}
              </Text>
              <Text>{`${reference?.title}, ${reference?.year}`}</Text>
              <Text>
                {t('campaignApplication.references.references_actors_display', {
                  number: reference?.actors,
                })}
                <Text color="#666666">
                  {(Boolean(reference?.other)
                    ? [reference?.partners, reference?.other]
                    : reference?.partners
                  )?.join(', ')}
                </Text>
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box width="100%">
        <ApplicationFormTitle
          title={t('campaignApplication.general.title')}
          position="2."
        />
        <VStack py={4} divider={<Divider opacity={0.4} />} spacing={4} mb={10}>
          <ApplicationSection
            label={t('campaignApplication.general.subtitle', {
              place:
                application?.disponibility?.espace?.users_permissions_user
                  ?.structureName,
            })}
          >
            {Boolean(application?.already_supported) ? 'Oui' : 'Non'}
          </ApplicationSection>
          <ApplicationSection label={t('campaignApplication.general.bio')}>
            {application?.cv}
          </ApplicationSection>
        </VStack>
      </Box>
      <Box width="100%">
        <ApplicationFormTitle
          title={t('campaignApplication.creation.title')}
          position="3."
        />
        <VStack py={4} divider={<Divider opacity={0.4} />} spacing={4} mb={10}>
          <ApplicationSection
            label={t('campaignApplication.creation.field_title')}
          >
            {application?.creation_title}
          </ApplicationSection>
          <ApplicationSection label={t('campaignApplication.creation.dancers')}>
            {application?.creation_dancers}
          </ApplicationSection>
          <ApplicationSection label={t('campaignApplication.creation.summary')}>
            {application?.creation_summary}
          </ApplicationSection>
          <ApplicationSection
            label={t('campaignApplication.creation.partnerships')}
          >
            {application?.creation_partnerships}
          </ApplicationSection>
          <ApplicationSection
            label={t('campaignApplication.creation.technical')}
          >
            {application?.creation_techical_requirements}
          </ApplicationSection>
          <ApplicationSection
            label={t('campaignApplication.creation.accomodation')}
          >
            {Boolean(application?.creation_accomodation)
              ? t('campaignApplication.creation.yes')
              : t('campaignApplication.creation.no')}
          </ApplicationSection>
        </VStack>
      </Box>
    </VStack>
  )
}

export default ApplicationDetails
