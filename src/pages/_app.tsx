import {
  ApolloClient,
  ApolloProvider,
  DefaultOptions,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
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

const createClient = () => {
  const httpLink = new HttpLink({
    uri: `https://swapbackend1.herokuapp.com/api/graphql`,
  })

  const httpAuthLink = from([httpLink])
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === `OperationDefinition` &&
        definition.operation === `subscription`
      )
    },

    httpAuthLink
  )

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    ssrMode: true,
  })
  return client
}
let apolloClient: ApolloClient<any>

export const client = new ApolloClient({
  uri: `https://swapbackend1.herokuapp.com/api/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
})

export const getApolloClient = (initialState?: object) => {
  const _apolloClient = apolloClient ?? createClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === `undefined`) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}
export const useApollo = (initialState: object) => {
  if (apolloClient) {
    return apolloClient
  }
  return getApolloClient(initialState)
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const SEO = Component.SEO
  const { initialApolloState } = pageProps
  const apolloClient = useApollo(initialApolloState)

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
      <ApolloProvider client={apolloClient}>
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
