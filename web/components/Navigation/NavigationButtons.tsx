import React from 'react'
import {
  Text,
  MenuItem as ChakraMenuItem,
  MenuItemProps,
  LinkProps,
} from '@chakra-ui/react'
import Link from '~components/Link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react-markdown'

export const DropdownNavButton = ({
  children,
  ...props
}: { children: ReactNode } & MenuItemProps & LinkProps) => {
  return (
    <ChakraMenuItem
      _hover={{ color: 'blue.500', bg: 'white' }}
      as={Link}
      {...props}
    >
      {children}
    </ChakraMenuItem>
  )
}

export const NavButton = ({ href, text }) => {
  const router = useRouter()
  return (
    <Link
      href={href}
      lineHeight="1.2"
      borderBottom="1px solid"
      borderBottomColor={
        router.pathname === href ? 'orange.500' : 'transparent'
      }
      display={{
        base: 'none',
        lg: 'block',
      }}
      _hover={{
        borderColor: 'orange.500',
      }}
    >
      <Text>{text}</Text>
    </Link>
  )
}
