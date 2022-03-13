import SpotifyWebApi from 'spotify-web-api-node'

export const baseUrl = 'http://localhost:3000'

const scopes = [
  //User
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-follow-read',
  'user-read-recently-played',
  'user-library-read',
  'user-read-private',
]

const params: any = {
  scope: scopes,
}

const queryParam = new URLSearchParams(params)
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParam.toString()}`

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
})
export { LOGIN_URL }

export default spotifyAPI
