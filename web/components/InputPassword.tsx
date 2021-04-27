import React, { useState } from 'react'
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import Eye from 'public/assets/img/eye.svg'
import EyeClosed from 'public/assets/img/eye-closed.svg'

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
}: Props) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <InputGroup>
      <Input
        name={name}
        type={isVisible ? 'text' : 'password'}
        ref={inputRef || register}
        placeholder={placeholder}
        onChange={onChange}
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
