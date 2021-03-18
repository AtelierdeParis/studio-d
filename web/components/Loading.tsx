import React from 'react'
import Loader from '~components/Loader'
import { BoxProps } from '@chakra-ui/react'

interface ILoading extends BoxProps {
  isLoading: boolean
  children: React.ReactNode
  skeleton?: React.ReactNode
  isCentered?: boolean
  size?: string
}

const Loading = ({
  isLoading,
  children,
  skeleton,
  isCentered = false,
  size = 'xl',
  ...rest
}: ILoading) => {
  if (isLoading) {
    if (skeleton) return <>{skeleton}</>
    return <Loader isCentered={isCentered} size={size} {...rest} />
  }
  return <>{children}</>
}

export default Loading
