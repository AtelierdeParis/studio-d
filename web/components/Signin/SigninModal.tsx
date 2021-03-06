import React, { useRef } from 'react'
import {
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

interface Props {
  children: React.ReactNode
  redirect?: boolean
}

const SigninModal = ({ children, redirect = true }: Props) => {
  const { t } = useTranslation('common')
  const initialRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenReset,
    onOpen: onOpenReset,
    onClose: onCloseReset,
  } = useDisclosure()

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent pt={6} overflow="hidden">
          <ModalHeader py={0} fontSize="lg" textAlign="center" fontWeight="500">
            {t('signin.title')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={{ base: 4, md: 6 }} pt={0}>
            <Divider my={6} />
            <SigninForm
              redirect={redirect}
              initialRef={initialRef}
              onOpenReset={onOpenReset}
              onClose={onClose}
            />
          </ModalBody>
          <ModalFooter
            py={6}
            mt={{ base: 4, md: 8 }}
            bg="gray.100"
            justifyContent="center"
          >
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
