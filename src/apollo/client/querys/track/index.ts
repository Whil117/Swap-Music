import { gql } from '@apollo/client'

export const TRACKBYSLUG = gql`
  # Write your query or mutation here
  query trackBySlug($slug: String) {
    trackBySlug(slug: $slug) {
      id
      slug
      youtube_url
      youtube_video
      url
      __typename
    }
  }
`
