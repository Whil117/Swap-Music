// import { baseUrl } from 'lib/spotify/spotify'
import HeadApp from '@Components/HeadApp'
import Layout from '@Components/layout'
import { persistor, store } from '@Redux/store'
import { getSession, SessionProvider } from 'next-auth/react'
import type { AppContext, AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-form-builder2/dist/app.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const MyApp = ({
  router,
  Component,

  pageProps: { hidratation, accessToken, session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout {...{ router, hidratation, accessToken }}>
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
  const Session = await getSession(appContext.ctx)

  return {
    pageProps: {
      accessToken: Session?.accessToken,
      hidratation: appContext.router.pathname.includes('/swap') ? true : false,
    },
  }
}

export default MyApp
