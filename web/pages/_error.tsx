import React from 'react'
import NextErrorPage from 'next/error'
// import Bugsnag, { isBugsnagEnabled } from 'utils/bugsnag'
import { NextPage } from 'next'

const ErrorPage: NextPage<{ statusCode: number }> = ({
  statusCode,
}: {
  statusCode: number
}) => {
  return <NextErrorPage statusCode={statusCode} />
}

ErrorPage.getInitialProps = async (ctx) => {
  // if (ctx.err && isBugsnagEnabled) Bugsnag.notify(ctx.err)
  return NextErrorPage.getInitialProps(ctx)
}

export default ErrorPage
