/* eslint-disable no-console */
import refreshSpotifyToken from 'lib/spotify/refershSpotifyToken'
import { LOGIN_URL } from 'lib/spotify/spotify'
import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: (account?.expires_at as number) * 1000,
        }
      }
      if (Date.now() < token.accessTokenExpires) {
        // console.log('[NextAuth]: Token is valid; no need to refresh')
        return token
      }
      return await refreshSpotifyToken(token)
    },
    async session({ session, token }: any) {
      //  { session: Session; token: JWT  }
      if (session) {
        return {
          ...session,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpires: token.accessTokenExpires,
        }
      }
    },
  },
})
