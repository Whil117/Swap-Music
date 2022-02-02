import HeadApp from '@Components/HeadApp'
import { persistor, store } from '@Redux/store'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from 'next-auth/react'
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HeadApp>
            <Component {...pageProps} />
          </HeadApp>
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
