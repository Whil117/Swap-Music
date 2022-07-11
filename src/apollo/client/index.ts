/* eslint-disable no-console */
import {
  ApolloClient,
  createHttpLink,
  // split
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
const cache = new InMemoryCache()

// const httpLink = createHttpLink({
//   uri: `https://swapbackend.vercel.app/api/graphql`,
// })
const httpLink = createHttpLink({
  uri: `https://swapbackend.vercel.app/api/graphql`,
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

const link = errorLink.concat(httpLink)

const clierner = new ApolloClient({
  link,
  ssrMode: true,
  cache,
  connectToDevTools: true,
  queryDeduplication: true,
})

export default clierner
