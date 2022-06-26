/* eslint-disable no-console */
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
// import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { onError } from '@apollo/client/link/error'
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';
const cache = new InMemoryCache()

// const isWindows = typeof window === 'undefined';

// if (!isWindows) {
//   persistCache({
//     cache,
//     storage: new LocalStorageWrapper(window.localStorage)
//   });
// }

const httpLink = createHttpLink({
  uri: `/api/graphql`,
})

// const authLink = setContext((_, { headers }) => ({
//   headers: {
//     ...headers,
//     authorization: `Bearer ${cookie.get(`bearer`)}`,
//   },
// }))

// const isBrowser = typeof window !== 'undefined';

// const wsLink = new WebSocketLink({
//   uri: `${CONFIG.GRAPHQL_URL_WS}`,
//   options: {
//     reconnect: true
//   }
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription' &&
//       isBrowser
//     );
//   },
//   httpLink,
//   wsLink
// );

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (
    graphQLErrors &&
    !graphQLErrors.filter((error) => error.message === `INVALID_TOKEN`)
  )
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.warn(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.warn(`[Network error]: ${networkError}`)
})

const link = errorLink.concat(httpLink)

const client = new ApolloClient({
  link,
  ssrMode: true,
  cache,
  connectToDevTools: true,
  queryDeduplication: true,
})

export default client
