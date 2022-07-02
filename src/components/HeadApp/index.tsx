/* eslint-disable @next/next/no-page-custom-font */
import { Global } from '@emotion/react'
import Normalize from '@Styles/global/normalize'
import { FC } from 'react'

type Props = {}

const HeadApp: FC<Props> = ({ children }) => {
  return (
    <>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <Global styles={Normalize} />
      {children}
    </>
  )
}

export default HeadApp
