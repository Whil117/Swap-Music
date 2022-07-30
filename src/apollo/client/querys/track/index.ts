import { gql } from '@apollo/client'

export const TRACKBYSLUG = gql`
  # Write your query or mutation here
  query trackBySlug($slug: String, $artist: String, $title_track: String) {
    trackBySlug(slug: $slug, artist: $artist, title_track: $title_track) {
      id
      slug
      youtube_url
      youtube_video
      lyrics
      url
      __typename
    }
  }
`
