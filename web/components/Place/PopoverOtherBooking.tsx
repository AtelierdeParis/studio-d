import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Portal,
  Box,
  Circle,
} from '@chakra-ui/react'
import Link from '~components/Link'
import { useTranslation, Trans } from 'next-i18next'
import Help from 'public/assets/img/help.svg'

interface Props {
  children: React.ReactNode
}

const PopoverOtherBooking = ({ children }: Props) => {
  const { t } = useTranslation('place')
  return (
    <Popover placement="top" trigger="hover">
      <PopoverTrigger>
        <Box pos="relative" w="100%" h="100%">
          <Circle
            pos="absolute"
            right={1.5}
            top={1.5}
            zIndex={10}
            bgColor="gray.200"
            size="16px"
          >
            <Help />
          </Circle>
          {children}
        </Box>
      </PopoverTrigger>
      <Portal appendToParentPortal={false}>
        <PopoverContent
          py={5}
          px={8}
          borderRadius="lg"
          w="fit-content"
          zIndex={100}
          bgColor="blue.500"
          color="white"
          _focus={{
            boxShadow: 'none',
            outline: 'none',
          }}
        >
          <PopoverArrow bgColor="blue.500" />
          <PopoverBody w="450px">
            <Trans
              i18nKey="place:detail.tooltip"
              //   TODO: handle value
              values={{ name: 'XXXXXX' }}
              //   TODO: handle link
              components={{
                i: <i />,
                a: <Link href="/" textDecoration="underline" />,
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default PopoverOtherBooking
