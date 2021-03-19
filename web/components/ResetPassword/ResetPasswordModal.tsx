import React from 'react'
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  Divider,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ResetPasswordForm from '~components/ResetPassword/ResetPasswordForm'
import Link from '~components/Link'
import { ROUTE_SIGNUP } from '~constants'

interface IResetPasswordModal {
  isOpen: boolean
  onClose: () => void
}

const ResetPasswordModal = ({ isOpen, onClose }: IResetPasswordModal) => {
  const { t } = useTranslation('common')

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent pt={6} pb={8} overflow="hidden">
        <ModalHeader py={0} fontSize="lg" textAlign="center" fontWeight="500">
          {t('reset.title')}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={6} pt={0}>
          <Divider mt={6} mb={3} />
          <Text color="gray.400" mb={5}>
            {t('reset.text')}
          </Text>
          <ResetPasswordForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ResetPasswordModal
