import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
  Head,
} from 'next/document'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/assets/fonts/mabry-pro.otf"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/fonts/mabry-pro-medium.otf"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
