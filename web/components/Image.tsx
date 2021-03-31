import React from 'react'
import { Image as ChakraImage, ImageProps } from '@chakra-ui/react'
import FallbackImage from '~components/FallbackImage'

const Image = ({ src, ...rest }: ImageProps) => {
  return (
    <ChakraImage
      fallback={<FallbackImage />}
      {...rest}
      src={`${process.env.NEXT_PUBLIC_BACK_URL}${src}`}
    />
  )
}

export default Image
