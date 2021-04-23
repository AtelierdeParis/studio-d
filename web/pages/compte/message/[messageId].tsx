import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { ROUTE_ACCOUNT_MESSAGE } from '~constants'

const MessageDetail = () => {
  return null
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  query,
}) => {
  return {
    redirect: {
      destination: `${ROUTE_ACCOUNT_MESSAGE}?conversation=${query.messageId}`,
      permanent: false,
    },
  }
}

export default MessageDetail
