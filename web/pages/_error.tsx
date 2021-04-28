import React from 'react'
import NextErrorPage from 'next/error'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextPage } from 'next'

const ErrorPage: NextPage<{ statusCode: number }> = ({
  statusCode,
}: {
  statusCode: number
}) => {
  return <NextErrorPage statusCode={statusCode} />
}

export const getServerSideProps = async ({ locale, res, err }) => {
  return {
    props: {
      statusCode: res ? res.statusCode : err ? err.statusCode : 404,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default ErrorPage
