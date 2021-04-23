import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { ROUTE_ACCOUNT_REQUEST } from '~constants'

const RequestDetail = () => {
  return null
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  query,
}) => {
  return {
    redirect: {
      destination: `${ROUTE_ACCOUNT_REQUEST}?id=${query.id}`,
      permanent: false,
    },
  }
}

export default RequestDetail
