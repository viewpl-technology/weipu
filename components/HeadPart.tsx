import Script from 'next/script'
import Head from 'next/head'

export default function HeadPart() {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Viewpl Technology</title>

        {/* <!-- Meta SEO --> */}
        <meta name='title' content='Viewpl Technology' />
        <meta name='description' content='Internet, web & online services' />
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
        <meta name='author' content='Viewpl Technology' />

        {/* <!-- Social media share --> */}
        <meta property='og:title' content='Viewpl Technology' />
        <meta property='og:site_name' content='Themesberg' />
        <meta
          property='og:url'
          content='https://viewpl.com,https://viewpl.com.au'
        />
        <meta
          property='og:description'
          content='Internet, web & online services'
        />
        <meta property='og:type' content='' />
        {/* <meta
          property='og:image'
          content='https://themesberg.s3.us-east-2.amazonaws.com/public/github/landwind/og-image.png'
        /> */}
        {/* <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@themesberg' />
        <meta name='twitter:creator' content='@themesberg' /> */}

        {/* <!-- Favicon --> */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
    </>
  )
}
