import { useToast as useChakraToast } from '@chakra-ui/react'

const useToast = () => {
  const toast = useChakraToast()

  return {
    errorToast: (message) =>
      toast({
        description: message,
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
      }),
    successToast: (message) =>
      toast({
        description: message,
        position: 'top',
        status: 'success',
        duration: 4000,
        isClosable: true,
      }),
    infoToast: (message) =>
      toast({
        description: message,
        position: 'top',
        status: 'info',
        duration: 4000,
        isClosable: true,
      }),
  }
}

export default useToast
