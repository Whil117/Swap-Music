/* eslint-disable @next/next/no-page-custom-font */
import { Global } from '@emotion/react'
import Normalize from '@Styles/global/normalize'
import Head from 'next/head'
import { FC } from 'react'

type Props = {}

const HeadApp: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Global styles={Normalize} />
      {children}
    </>
  )
}

export default HeadApp
