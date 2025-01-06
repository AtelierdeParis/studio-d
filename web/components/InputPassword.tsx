import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import EyeClosed from 'public/assets/img/eye-closed.svg'
import Eye from 'public/assets/img/eye.svg'
import React, { useState } from 'react'

interface Props {
  register?: () => void
  inputRef?: React.RefObject<any>
  placeholder?: string
  name?: string
  onChange?: (value: any) => void
}

const InputPassword = ({
  register,
  inputRef,
  placeholder,
  name = 'password',
  onChange = null,
  ...props
}: Props & InputProps) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <InputGroup>
      <Input
        name={name}
        type={isVisible ? 'text' : 'password'}
        ref={inputRef || register}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      <InputRightElement
        cursor="pointer"
        onClick={() => setVisible(!isVisible)}
        children={isVisible ? <EyeClosed /> : <Eye />}
      />
    </InputGroup>
  )
}

export default InputPassword
