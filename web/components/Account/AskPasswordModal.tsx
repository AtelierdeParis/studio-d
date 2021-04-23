import React, { useState } from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import useToast from '~hooks/useToast'
import InputPassword from '~components/InputPassword'
import { useForm } from 'react-hook-form'
import { Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface Props {
  onSuccess: () => void
  setShowModal: (state: boolean) => void
}

const AskPasswordModal = ({ onSuccess, setShowModal }: Props) => {
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('account')
  const { register, getValues } = useForm()
  const { errorToast } = useToast()

  const checkPassword = async () => {
    const { password } = getValues()
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
          <InputPassword register={register} />
        </form>
      </Box>
    </Modal>
  )
}

export default AskPasswordModal
