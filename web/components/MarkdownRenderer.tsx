import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Image,
  Box,
  Heading,
  HeadingProps,
  Circle,
  Flex,
  VStack,
} from '@chakra-ui/react'
import Link from 'components/Link'
import rehypeRaw from 'rehype-raw'
import gfm from 'remark-gfm'

const Title = ({ children, ...rest }: HeadingProps) => (
  <Heading
    {...rest}
    fontFamily="mabry medium"
    className="md-title"
    fontWeight="500"
    mt={2}
  >
    {children}
  </Heading>
)

const renderers = {
  a: (props) => {
    return (
      <Link href={props.href} color="blue.500" isExternal>
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
      <Title as="h2" fontSize="22px">
        {props.children}
      </Title>
    )
  },
  h2: ({ node, ...props }) => {
    return (
      <Title as="h3" fontSize="20px">
        {props.children}
      </Title>
    )
  },
  h3: ({ node, ...props }) => {
    return (
      <Title as="h4" fontSize="18px">
        {props.children}
      </Title>
    )
  },
  h4: ({ node, ...props }) => {
    return (
      <Title as="h5" fontSize="16px">
        {props.children}
      </Title>
    )
  },
  h5: ({ node, ...props }) => {
    return (
      <Title as="h6" fontSize="14px">
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
  ul: ({ node, ...props }) => {
    return (
      <Box>
        <ul>{props.children}</ul>
      </Box>
    )
  },
  ol: ({ node, ...props }) => {
    return (
      <Box>
        <ol>{props.children}</ol>
      </Box>
    )
  },
  li: (props) => {
    return (
      <Flex alignItems="flex-start" mb={2}>
        {props.ordered ? (
          <Box w="28px" minW="28px" textAlign="center">
            {props.index + 1}.
          </Box>
        ) : (
          <Flex justifyContent="center" w="28px" minW="28px">
            <Circle size="6px" bgColor="gray.200" mt="6px" />
          </Flex>
        )}
        <Box pl={2}>{props.children}</Box>
      </Flex>
    )
  },
  p: ({ children }) => {
    return <Box whiteSpace="pre-line">{children}</Box>
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
    <VStack spacing={6} alignItems="flex-start" className="md-renderer">
      <ReactMarkdown
        unwrapDisallowed
        skipHtml
        remarkPlugins={[[gfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw]}
        components={renderers}
      >
        {children}
      </ReactMarkdown>
    </VStack>
  )
}

export default MarkdownRenderer
