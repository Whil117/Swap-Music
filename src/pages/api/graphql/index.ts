import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '../../../db/index'
import resolvers from '../../../db/resolvers'
import typeDefs from '../../../db/types'

connectMongoDB()

const apolloServer = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
})
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

// export default apolloServer.createHandler({ path: '/api/graphql' })
