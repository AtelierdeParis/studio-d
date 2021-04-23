import React, { useState } from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import InputPassword from '~components/InputPassword'
import { useForm } from 'react-hook-form'
import { Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import FormField from '~components/FormField'

interface Props {
  onSuccess: () => void
  setShowModal: (state: boolean) => void
}

const AskPasswordModal = ({ onSuccess, setShowModal }: Props) => {
  const [isLoading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const { t } = useTranslation('account')
  const { getValues, setError, errors } = useForm()
  const { errorToast } = useToast()
  const initialRef = React.useRef()

  const checkPassword = async () => {
    const { password } = getValues()
    if (value === '') {
      setError('password', {
        type: 'manual',
        message: t('information.modal.required'),
      })
      return
    }

    if (password === '') return false
    setLoading(true)
    client.users
      .checkPasswordCreate({ password })
      .then((res) => {
        if (!res.data) {
          errorToast(t('information.modal.error'))
          return
        }
        setShowModal(false)
        onSuccess()
      })
      .finally(() => setLoading(false))
  }

  return (
    <Modal
      initialRef={initialRef}
      isLoading={isLoading}
      isOpen={true}
      onClose={() => setShowModal(false)}
      w="100%"
      title={t('information.modal.title')}
      onConfirm={checkPassword}
      confirmText={t('information.modal.btn')}
      closeText={t('information.modal.back')}
    >
      {t('information.modal.text')}
      <Box pt={5}>
        <form>
          <FormField errors={errors?.password}>
            <InputPassword
              inputRef={initialRef}
              onChange={(event) => setValue(event.target.value)}
            />
          </FormField>
        </form>
      </Box>
    </Modal>
  )
}

export default AskPasswordModal
