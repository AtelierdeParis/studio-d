import React from 'react'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

interface ILink extends Omit<LinkProps, 'href'>, Pick<NextLinkProps, 'href'> {
  shallow?: boolean
}

const Link = (props: ILink) => {
  const { children, href, shallow = false, ...rest } = props
  return (
    <NextLink passHref href={href} shallow={shallow}>
      <ChakraLink
        {...rest}
        _focus={{
          outline: 'none',
        }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
export default Link
