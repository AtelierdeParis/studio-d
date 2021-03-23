import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Image, Box } from '@chakra-ui/react'

const renderers = {
  image: ({ alt, src, title, node }) => {
    return (
      <Image
        alt={alt}
        src={src}
        title={title}
        mx="auto"
        py={node.position.start.line > 1 ? 18 : 0}
        mb={4}
      />
    )
  },
  paragraph: ({ node, children }) => {
    const hasImage = node.children.some((child) => child.type === 'image')

    return (
      <Box pb={4} maxW={hasImage ? 'container.md' : 'container.sm'} mx="auto">
        {children}
      </Box>
    )
  },
}

const MarkdownRenderer = ({ children }) => {
  return (
    <ReactMarkdown
      unwrapDisallowed
      renderers={renderers}
      transformImageUri={(uri) => process.env.NEXT_PUBLIC_BACK_URL + uri}
    >
      {children}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer
