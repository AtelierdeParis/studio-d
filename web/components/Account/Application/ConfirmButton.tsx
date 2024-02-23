import {
  Button,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  ButtonGroup,
  useDisclosure,
  PopoverTrigger,
  Box,
} from '@chakra-ui/react'
import { ReactNode } from 'react-markdown'
import { useTranslation } from 'next-i18next'

const ConfirmButton = ({
  helper,
  children,
  handleConfirm,
  confirmLabel,
}: {
  helper: string
  children: ReactNode
  handleConfirm: () => void
  confirmLabel: string
}) => {
  const { t } = useTranslation('application')
  const { isOpen, onClose, onToggle } = useDisclosure()

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom-end">
      <PopoverTrigger>
        <Box onClick={onToggle}>{children}</Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverBody>{helper}</PopoverBody>
        <ButtonGroup p={2} display="flex" justifyContent="center">
          <Button
            colorScheme={'red'}
            onClick={() => {
              handleConfirm()
              onClose()
            }}
          >
            {confirmLabel}
          </Button>
          <Button variant="outline" onClick={onClose}>
            {t('company.table.cancel')}
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  )
}

export default ConfirmButton
