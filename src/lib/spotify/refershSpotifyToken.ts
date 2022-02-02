/* eslint-disable no-console */
import spotifyAPI from './spotify'

export default async function refreshSpotifyToken(token: any) {
  try {
    spotifyAPI.setAccessToken(token.accessToken)
    spotifyAPI.setRefreshToken(token.refreshToken)

    const data = await spotifyAPI.refreshAccessToken()
    console.log('[NextAuth]: Token refreshed')
    return {
      ...token,
      accessToken: data.body.access_token ?? token.accessToken,
      refreshToken: data.body.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + data.body.expires_in * 1000,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'Refresh Token',
    }
  }
}
