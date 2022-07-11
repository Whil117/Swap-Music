import { gql } from '@apollo/client'

export const ARTISTBYID = gql`
  query artistById($id: String!) {
    artistById(id: $id) {
      id
      name
      description
      images {
        url
        height
        width
      }
      uri
      followers
      type
      genres
      biography
      backgroundCover
      href
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
