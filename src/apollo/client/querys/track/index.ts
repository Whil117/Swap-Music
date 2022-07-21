import { gql } from '@apollo/client'

export const TRACKBYSLUG = gql`
  query trackBySlug($slug: String) {
    trackBySlug(slug: $slug) {
      id
      slug
      url
    }
  }
`
