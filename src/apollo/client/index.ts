/* eslint-disable no-console */
import {
  ApolloClient,
  createHttpLink,
  // split
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import cookie from 'js-cookie'
const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: `/api/graphql`,
})
0
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `${
        window.location.pathname.includes('swap')
          ? cookie.get(`validateToken`)
          : cookie.get(`reserve_public`)
      }`,
      mode: 'no-cors',
    },
  }
})

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

const link = errorLink.concat(authLink.concat(httpLink))

const client = new ApolloClient({
  link,
  ssrMode: true,
  cache,
  headers: {
    mode: 'no-cors',
  },
  connectToDevTools: true,
  queryDeduplication: true,
})

export default client
