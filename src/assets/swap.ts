export const baseUrl = 'https://accounts.spotify.com/authorize'
export const publicUrl = 'https://swap-coral-six.vercel.app/swap'

export const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

export const Scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-follow-read',
  'user-library-read',
  'user-read-private',
]

export const ScopesUrlParams = Scopes.join('%20')
const url = `${baseUrl}?client_id=${clientId}&redirect_uri=${publicUrl}&scope=${ScopesUrlParams}&response_type=token&show_dialog=true`

export default url
