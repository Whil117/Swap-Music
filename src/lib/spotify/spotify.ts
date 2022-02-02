import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  //User
  'user-read-private',
  'user-read-email',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',

  //Playlist
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',

  //Library
  'user-library-read',
  'user-library-modify',

  //Follow
  'user-follow-read',
  'user-follow-modify',

  //Streaming
  'streaming',
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
