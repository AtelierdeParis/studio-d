import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

const canceledStyle = {
  opacity: 0.2,
}
interface Props extends FlexProps {
  children: React.ReactNode
  status?: string
  fullOpacity?: boolean
  isHeader?: boolean
}

const Cell = ({
  children,
  status = null,
  fullOpacity = false,
  isHeader = false,
  ...rest
}: Props) => {
  return (
    <Flex
      alignItems="center"
      py="2.5"
      pl="5"
      pr="2"
      lineHeight="1"
      borderBottom="1px solid"
      borderColor="gray.100"
      cursor="pointer"
      {...(isHeader && {
        cursor: 'auto',
        bgColor: 'blue.100',
        color: 'grayText.1',
        pl: 2.5,
        borderBottom: 'none',
      })}
      {...rest}
    >
      <Flex
        {...([
          'requestcanceled',
          'requestcanceledbyplace',
          'bookingcanceledbyplace',
        ].includes(status) &&
          !fullOpacity &&
          canceledStyle)}
        w="100%"
        alignItems="center"
      >
        {children}
      </Flex>
    </Flex>
  )
}

export default Cell
