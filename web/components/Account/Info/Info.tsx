import React, { useMemo } from 'react'
import { Box, Flex, HStack, Image, Text, Button } from '@chakra-ui/react'
import Link from '~components/Link'

interface ILink {
  url: string
  text: string
}

interface IInfoLogo {
  img: string
  title: string
  children: React.ReactNode
  links: ILink | ILink[]
}

const InfoLogo = ({ img, title, children, links }: IInfoLogo) => {
  const arrayLinks = useMemo(() => (Array.isArray(links) ? links : [links]), [
    links,
  ])
  return (
    <Flex justifyContent="center" alignItems="center" h="100%">
      <Box textAlign="center" maxW="34rem">
        <Image src={img} mb={10} mx="auto" />
        <Text fontSize="3xl" color="blue.500" mb={5} fontWeight="500">
          {title}
        </Text>
        <Text pb={10} lineHeight="1.55" color="grayText.1">
          {children}
        </Text>
        <Flex justifyContent="center">
          <HStack spacing={5}>
            {arrayLinks.map(({ text, url }) => (
              <Button as={Link} variant="lineBlue" href={url} key={url}>
                {text}
              </Button>
            ))}
          </HStack>
        </Flex>
      </Box>
    </Flex>
  )
}

export default InfoLogo
