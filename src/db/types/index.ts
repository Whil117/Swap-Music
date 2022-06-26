import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  # Products

  type Image {
    url: String
    height: Int
    width: Int
  }
  type Colors {
    font: String
    background: String
  }
  input ImageInput {
    url: String
    height: Int
    width: Int
  }
  type Customize {
    colors: Colors
  }
  input ColorsInput {
    font: String
    background: String
  }
  input CustomizeInput {
    colors: ColorsInput
  }
  type Artist {
    id: String
    name: String
    description: String
    images: [Image]
    uri: String
    popularity: Int
    type: String
    followers: Int
    genres: [String]
    href: String
    backgroundCover: String
    customize: Customize
    biography: String
  }
  input ArtistInput {
    id: String!
    name: String!
    description: String
    images: [ImageInput]
    uri: String!
    popularity: Int
    type: String!
    followers: Int
    genres: [String]
    href: String
    backgroundCover: String
    customize: CustomizeInput
    biography: String
  }

  type Query {
    listArtist: [Artist]
    artistById(id: String!): Artist
  }

  type Mutation {
    createArtist(input: ArtistInput): Artist
  }
`

export default typeDefs
