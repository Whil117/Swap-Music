import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro'
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

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
