import { Button, useDisclosure, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Add from 'public/assets/img/smallAdd.svg'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const ApplicationReferences = () => {
  const { t } = useTranslation('place')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <VStack width="100%" alignItems="flex-start">
      <ApplicationFormTitle
        title={t('campaignApplication.references.title')}
        position="1."
        helper={t('campaignApplication.references.helper')}
      />
      <VStack></VStack>
      <Button
        variant="outline"
        colorScheme="blue"
        rightIcon={<Add />}
        size="xl"
        onClick={onOpen}
        isDisabled
      >
        {t('campaignApplication.references.add')}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('campaignApplicationreference.new_ref')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {t('campaignApplicationreference.cancel')}
            </Button>
            <Button variant="ghost">
              {t('campaignApplicationreference.create')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default ApplicationReferences
