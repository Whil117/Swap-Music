import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type User {
    id: ID
  }

  type Query {
    getUser: User
  }
`

export default typeDefs
