import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import HeadApp from '@Components/HeadApp'
import Layout from '@Components/layout'
import { persistor, store } from '@Redux/store'
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
import '../styles/global/style.css'

export const client = new ApolloClient({
  uri: `https://swapbackend.vercel.app/api/graphql`,
  cache: new InMemoryCache(),
})

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const SEO = Component.SEO
  console.log(SEO)

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
                <HeadApp>
                  <ToastContainer />
                  <Component {...pageProps} />
                </HeadApp>
              </Layout>
            </PersistGate>
          </Provider>
        </SessionProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
