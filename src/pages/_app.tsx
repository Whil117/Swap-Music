import {
  ApolloClient,
  ApolloProvider,
  DefaultOptions,
  InMemoryCache,
} from '@apollo/client'
import Layout from '@Components/layout'
import { Global } from '@emotion/react'
import { persistor, store } from '@Redux/store'
import Normalize from '@Styles/global/normalize'
import AtomSeoLayout from 'lib/AtomSeo'
import { SessionProvider } from 'next-auth/react'
import type { AppPropsWithLayout } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export const client = new ApolloClient({
  uri: `https://swapbackend.vercel.app/api/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
})

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const SEO = Component.SEO

  return (
    <>
      {SEO?.title && (
        <AtomSeoLayout
          title="Swap"
          page={SEO?.title}
          image={SEO?.image}
          keywords={SEO?.keywords}
          description={SEO?.description}
        />
      )}
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Layout Layout={Component.Layout} SEO={SEO}>
                <Global styles={Normalize} />
                <ToastContainer />
                <Component {...pageProps} />
              </Layout>
            </PersistGate>
          </Provider>
        </SessionProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
