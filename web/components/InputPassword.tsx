import React, { useState } from 'react'
import { InputGroup, Input, InputRightElement, Image } from '@chakra-ui/react'
import Key from 'public/assets/img/key.svg'

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
        children={<Key />}
      />
    </InputGroup>
  )
}

export default InputPassword
