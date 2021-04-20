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
import { Booking } from '~typings/api'
import { useTranslation, Trans } from 'next-i18next'
import Help from 'public/assets/img/help.svg'
import { ROUTE_ACCOUNT_REQUEST, ROUTE_ACCOUNT_BOOKING } from '~constants'

interface Props {
  children: React.ReactNode
  booking: Booking
}

const PopoverOtherBooking = ({ children, booking }: Props) => {
  const isAccepted = booking.status === 'accepted'
  const route = isAccepted ? ROUTE_ACCOUNT_BOOKING : ROUTE_ACCOUNT_REQUEST

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
              i18nKey={`place:detail.tooltip.${
                isAccepted ? 'booking' : 'request'
              }`}
              values={{ name: booking.espace.name }}
              components={{
                i: <i />,
                a: (
                  <Link
                    ml={2}
                    whiteSpace="pre"
                    alignSelf="flex-start"
                    href={`${route}?id=${booking.id}`}
                    as={`${route}/${booking.id}`}
                    textDecoration="underline"
                  />
                ),
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default PopoverOtherBooking
