import React, { useState } from 'react'
import {
  Button,
  useDisclosure,
  Modal as ChakraModal,
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

interface IModal {
  children: React.ReactNode
  title: string
  closeText?: string
  confirmText?: string
  button: JSX.Element
  onConfirm: () => Promise<any>
}

const Modal = ({
  children,
  title,
  button,
  onConfirm,
  closeText = null,
  confirmText = null,
}: IModal) => {
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('modal')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClick = async () => {
    setLoading(true)
    onConfirm().finally(() => {
      setLoading(false)
      onClose()
    })
  }

  return (
    <>
      <Box onClick={onOpen} alignSelf="center">
        {button}
      </Box>
      <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent pt={6} overflow="hidden">
          <ModalHeader py={0} fontSize="lg" textAlign="center" fontWeight="500">
            {title}
            <Divider my={6} />
          </ModalHeader>
          <ModalCloseButton top="20px" />
          <ModalBody px={6} pt={0} color="gray.600">
            {children}
          </ModalBody>
          <ModalFooter py={6}>
            {!isLoading && (
              <Button
                onClick={onClose}
                variant="unstyled"
                mr={4}
                color="gray.500"
              >
                {closeText || t(`close`)}
              </Button>
            )}
            <Button onClick={onClick} size="lg" isLoading={isLoading}>
              {confirmText || t('confirm')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export default Modal