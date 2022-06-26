import { gql } from '@apollo/client'

export const ARTISTBYID = gql`
  query artistById($id: String!) {
    artistById(id: $id) {
      id
      name
      images {
        url
      }
      followers
    }
  }
`
export const LISTARTISTS = gql`
  query {
    listArtist {
      id
      name
      description
      genres
      type
      images {
        url
        height
        width
      }
      biography
      followers
    }
  }
`
