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

  // context: ({ req }) => {
  //   const token = req.headers.authorization || ''
  //   if (!token) {
  //     throw new AuthenticationError('you must be logged in')
  //   }

  //   if (token !== process.env.NEXT_PUBLIC_GRAPHQL_TOKEN) {
  //     throw new AuthenticationError('invalid token')
  //   }
  //   return { token }
  // },
  playground: true,
  introspection: true,
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
