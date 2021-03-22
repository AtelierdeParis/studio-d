import React, { useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import PlaceForm from '~components/Account/Place/PlaceForm'
import PlaceImage from '~components/Account/Place/PlaceImage'
// import PlaceSchedule from '~components/Account/Place/PlaceSchedule'
import { User } from '~@types/user.d'
import { useTranslation } from 'next-i18next'

interface ICreatePlace {
  user: User
}

const CreatePlace = ({ user }: ICreatePlace) => {
  const { t } = useTranslation('place')
  const [currentStep, setStep] = useState(1)
  const [place, setPlace] = useState(null)

  return (
    <Box>
      <Tabs mt={6} isLazy index={currentStep}>
        <TabList borderColor="gray.100" borderBottom="1px solid" mb={6}>
          <Tab
            px={0}
            mx={2.5}
            isDisabled={currentStep !== 0}
            fontFamily="mabry medium"
            mb="-1px"
          >
            {t('tabs.info')}
          </Tab>
          <Tab px={0} mx={2.5} isDisabled={currentStep !== 1} mb="-1px">
            {t('tabs.image')}
          </Tab>
          <Tab px={0} mx={2.5} isDisabled={currentStep !== 2} mb="-1px">
            {t('tabs.slot', { nb: 0 })}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <PlaceForm
              onSuccess={(res) => {
                setStep(1)
              }}
              user={user}
            />
          </TabPanel>
          <TabPanel>
            <PlaceImage />
          </TabPanel>
          <TabPanel>{/* <PlaceSchedule /> */}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['account', 'place'])),
    },
  }
}

export default CreatePlace
