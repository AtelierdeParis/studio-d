import React from 'react'
import { Flex } from '@chakra-ui/react'

const canceledStyle = {
  opacity: 0.2,
}

const Cell = ({
  children,
  status = null,
  fullOpacity = false,
  isHeader = false,
}) => {
  return (
    <Flex
      alignItems="center"
      py="2.5"
      pl="5"
      pr="2"
      lineHeight="1"
      borderBottom="1px solid"
      borderColor="gray.100"
      {...(isHeader && {
        bgColor: 'blue.100',
        color: 'grayText.1',
        pl: 2.5,
        borderBottom: 'none',
      })}
    >
      <Flex
        {...(['canceled', 'canceledbyplace'].includes(status) &&
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
