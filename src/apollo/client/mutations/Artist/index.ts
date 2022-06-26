import { gql } from '@apollo/client'

export const CREATEARTIST = gql`
  mutation createArtist($input: ArtistInput) {
    createArtist(input: $input) {
      id
      name
      uri
    }
  }
`
