import React, { useState } from 'react'
import Modal from '~components/Modal'
import { client } from '~api/client-api'
import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useToast from '~hooks/useToast'
import Delete from 'public/assets/img/delete.svg'
import { signOut } from 'next-auth/client'

const DesactivateAccountModal = () => {
  const { errorToast, successToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('account')

  const onConfirm = () => {
    setLoading(true)
    return client.users
      .putUsers({
        blocked: true,
      })
      .then(() => {
        signOut({ callbackUrl: '/' })
        successToast(t('desactivate.success'))
      })
      .catch(() => errorToast(t('desactivate.error')))
      .finally(() => setLoading(false))
  }

  return (
    <Modal
      w="100%"
      button={
        <Button
          leftIcon={<Delete width="20px" height="20px" />}
          variant="delete"
          isLoading={isLoading}
        >
          <Text pl={3}>{t('information.desactivate.btn')}</Text>
        </Button>
      }
      title={t('desactivate.title')}
      onConfirm={onConfirm}
      confirmText={t('desactivate.btn')}
      closeText={t('desactivate.back')}
    >
      {t('desactivate.text')}
    </Modal>
  )
}

export default DesactivateAccountModal
