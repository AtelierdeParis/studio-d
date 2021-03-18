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
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import SigninForm from '~components/Signin/SigninForm'
import Link from '~components/Link'
import { ROUTE_SIGNUP } from '~constants'

const AuthMenu = () => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>{t('nav.signin')}</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent pt={6} overflow="hidden">
          <ModalHeader py={0} fontSize="lg" textAlign="center" fontWeight="500">
            {t('signin.title')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={6} pt={0}>
            <Divider my={6} />
            <SigninForm onClose={onClose} />
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
    </>
  )
}

export default AuthMenu
