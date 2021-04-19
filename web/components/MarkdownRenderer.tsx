import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Image,
  Box,
  Heading,
  HeadingProps,
  Circle,
  Flex,
} from '@chakra-ui/react'
import Link from 'components/Link'
import rehypeRaw from 'rehype-raw'
import gfm from 'remark-gfm'

const Title = ({ children, ...rest }: HeadingProps) => (
  <Heading {...rest} mb={3} fontFamily="mabry medium" fontWeight="500">
    {children}
  </Heading>
)

const renderers = {
  a: (props) => {
    return (
      <Link href={props.href} color="orange.500" isExternal>
        {props.children}
      </Link>
    )
  },
  u: (props) => {
    return (
      <Box as="span" textDecoration="underline">
        {props.children}
      </Box>
    )
  },
  img: ({ node, ...props }) => {
    return (
      <Box mx="-5rem">
        <Image {...props} mx="auto" mb={4} />
      </Box>
    )
  },
  h1: ({ node, ...props }) => {
    return (
      <Title as="h1" fontSize="22px">
        {props.children}
      </Title>
    )
  },
  h2: ({ node, ...props }) => {
    return (
      <Title as="h2" fontSize="20px">
        {props.children}
      </Title>
    )
  },
  h3: ({ node, ...props }) => {
    return (
      <Title as="h3" fontSize="18px">
        {props.children}
      </Title>
    )
  },
  h4: ({ node, ...props }) => {
    return (
      <Title as="h4" fontSize="16px">
        {props.children}
      </Title>
    )
  },
  h5: ({ node, ...props }) => {
    return (
      <Title as="h5" fontSize="14px">
        {props.children}
      </Title>
    )
  },
  h6: ({ node, ...props }) => {
    return (
      <Title as="h6" fontSize="12px">
        {props.children}
      </Title>
    )
  },
  li: (props) => {
    return (
      <Flex alignItems="flex-start">
        {props.ordered ? (
          <Box>{props.index + 1} -</Box>
        ) : (
          <Circle size="6px" bgColor="gray.200" mt="6px" />
        )}
        <Box pl={3}>{props.children}</Box>
      </Flex>
    )
  },
  p: ({ children }) => {
    return <Box pb={4}>{children}</Box>
  },
  strong: (props) => {
    return (
      <Box as="span" fontFamily="mabry medium" fontWeight="500">
        {props.children}
      </Box>
    )
  },
}

const MarkdownRenderer = ({ children }) => {
  return (
    <ReactMarkdown
      unwrapDisallowed
      skipHtml
      remarkPlugins={[[gfm, { singleTilde: false }]]}
      rehypePlugins={[rehypeRaw]}
      components={renderers}
      transformImageUri={(uri) =>
        uri.includes(process.env.NEXT_PUBLIC_BACK_URL)
          ? uri
          : process.env.NEXT_PUBLIC_BACK_URL + uri
      }
    >
      {children}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer
