import React from 'react'
import { Image as ChakraImage, ImageProps } from '@chakra-ui/react'
import FallbackImage from '~components/FallbackImage'

const Image = ({ src, ...rest }: ImageProps) => {
  return <ChakraImage fallback={<FallbackImage />} {...rest} src={`${src}`} />
}

export default Image
