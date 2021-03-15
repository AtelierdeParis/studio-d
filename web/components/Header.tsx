import React from 'react'
import { Container } from '@chakra-ui/react'

interface IHeader {
  colorMode: 'white' | 'black'
}
const Header = () => {
  return <Container as="header">Header</Container>
}

export default Header
