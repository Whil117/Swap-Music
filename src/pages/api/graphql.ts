import { gql, ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { DocumentNode } from 'graphql'
import { ApolloServerPlugin, BaseContext } from 'apollo-server-plugin-base'
import { NextApiRequest, NextApiResponse } from 'next'

const typeDefs = gql`
  type User {
    id: ID
  }

  type Query {
    getUser: User
  }
`

const resolvers = {
  Query: {
    getUser: () => {
      return {
        id: 'Foo',
      }
    },
  },
}
export type Resolver = ReturnType<typeof resolvers | any>

type TApolloServer = {
  typeDefs: DocumentNode
  resolvers: Resolver
  playground: boolean
  plugins: ApolloServerPlugin<BaseContext>[]
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
} as TApolloServer)

const startServer = apolloServer.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
