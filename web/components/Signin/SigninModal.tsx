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
  Box,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import SigninForm from '~components/Signin/SigninForm'
import ResetPasswordModal from '~components/ResetPassword/ResetPasswordModal'
import Link from '~components/Link'
import { ROUTE_SIGNUP } from '~constants'

interface ISigninModal {
  children: React.ReactNode
}

const SigninModal = ({ children }: ISigninModal) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenReset,
    onOpen: onOpenReset,
    onClose: onCloseReset,
  } = useDisclosure()

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent pt={6} overflow="hidden">
          <ModalHeader py={0} fontSize="lg" textAlign="center" fontWeight="500">
            {t('signin.title')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={6} pt={0}>
            <Divider my={6} />
            <SigninForm onOpenReset={onOpenReset} onClose={onClose} />
          </ModalBody>
          <ModalFooter py={6} mt={8} bg="gray.100" justifyContent="center">
            <Link
              href={ROUTE_SIGNUP}
              fontSize="sm"
              textDecoration="underline"
              onClick={onClose}
            >
              {t('signin.signup')}
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ResetPasswordModal isOpen={isOpenReset} onClose={onCloseReset} />
    </>
  )
}

export default SigninModal
