// import { baseUrl } from 'lib/spotify/spotify'
import HeadApp from '@Components/HeadApp'
import Layout from '@Components/layout'
import { persistor, store } from '@Redux/store'
import { SessionProvider } from 'next-auth/react'
import type { AppContext, AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const MyApp = ({
  router,
  Component,

  pageProps: { hidratation, session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout {...{ router, hidratation }}>
            <HeadApp>
              <Component {...pageProps} />
            </HeadApp>
          </Layout>
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    pageProps: {
      hidratation: appContext.router.pathname.includes('/swap') ? true : false,
    },
  }
}

export default MyApp
