import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  # Products

  type Image {
    url: String
    height: Int
    width: Int
  }
  input ImageInput {
    url: String
    height: Int
    width: Int
  }

  type Artist {
    id: String
    name: String
    description: String
    image: [Image]
    uri: String
    popularity: Int
    type: String
    followers: Int
    genres: [String]
    href: String
  }
  input ArtistInput {
    id: String!
    name: String!
    description: String
    image: [ImageInput]
    uri: String!
    popularity: Int
    type: String!
    followers: Int
    genres: [String]
    href: String
  }

  type Query {
    listArtist: [Artist]
  }

  type Mutation {
    createArtist(input: ArtistInput): Artist
  }
`

export default typeDefs
