import React, { useState } from 'react'
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import Eye from 'public/assets/img/eye.svg'
import EyeClosed from 'public/assets/img/eye-closed.svg'

interface IInputPassword {
  register: () => void
  placeholder?: string
  name?: string
}

const InputPassword = ({
  register,
  placeholder,
  name = 'password',
}: IInputPassword) => {
  const [isVisible, setVisible] = useState(false)
  return (
    <InputGroup>
      <Input
        name={name}
        type={isVisible ? 'text' : 'password'}
        ref={register}
        placeholder={placeholder}
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
