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
  BoxProps,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface Props extends BoxProps {
  initialRef?: React.RefObject<any>
  isOpen?: boolean
  isLoading?: boolean
  children: React.ReactNode
  title: string
  closeText?: string
  size?: string
  confirmText?: string
  button?: JSX.Element
  onConfirm: () => Promise<any>
  onClose?: () => void
}

const Modal = ({
  isLoading,
  children,
  title,
  button,
  onConfirm,
  closeText = null,
  confirmText = null,
  size = 'md',
  isOpen = false,
  onClose = null,
  initialRef = null,
  ...rest
}: Props) => {
  const [isLoadingInternal, setLoading] = useState(false)
  const { t } = useTranslation('modal')
  const {
    isOpen: isOpenInternal,
    onOpen,
    onClose: onCloseInternal,
  } = useDisclosure()

  const onClick = async () => {
    setLoading(true)
    onConfirm().finally(() => {
      setLoading(false)
      onCloseInternal()
    })
  }

  return (
    <>
      {button && (
        <Box onClick={onOpen} alignSelf="center" {...rest}>
          {button}
        </Box>
      )}
      <ChakraModal
        initialFocusRef={initialRef}
        isOpen={isOpen || isOpenInternal}
        onClose={onClose || onCloseInternal}
        isCentered
        size={size}
      >
        <ModalOverlay />
        <ModalContent pt={6} overflow="hidden">
          <ModalHeader
            py={0}
            fontSize="lg"
            textAlign="center"
            fontWeight="500"
            fontFamily="mabry medium"
          >
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
                onClick={onClose || onCloseInternal}
                variant="unstyled"
                mr={4}
                color="gray.500"
              >
                {closeText || t(`close`)}
              </Button>
            )}
            <Button
              onClick={onClick}
              size="lg"
              isLoading={isLoading || isLoadingInternal}
            >
              {confirmText || t('confirm')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export default Modal
