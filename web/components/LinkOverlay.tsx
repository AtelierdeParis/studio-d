import React from 'react'
import { LinkOverlay as ChakraLinkOverlay } from '@chakra-ui/react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

interface ILinkOverlay extends Pick<NextLinkProps, 'href' | 'passHref'> {
  children: React.ReactNode
}

const LinkOverlay = ({ children, ...props }: ILinkOverlay) => {
  return (
    <NextLink {...props} passHref>
      <ChakraLinkOverlay>{children}</ChakraLinkOverlay>
    </NextLink>
  )
}

export default LinkOverlay
