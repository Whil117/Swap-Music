/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { accessTokenAtom } from '@Components/@atoms/AtomBarScroll'
import AtomLoader from '@Components/@atoms/AtomLoader'
import { atom, useAtom, useSetAtom } from 'jotai'
import spotifyAPI from 'lib/spotify/spotify'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  children: JSX.Element
}
export const showAtom = atom(true)

const Hidratation: FC<Props> = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const Session = getSession()
  const [show, setShow] = useAtom(showAtom)
  const setaccessTokenAtom = useSetAtom(accessTokenAtom)

  const DataUserFetching = async (accessToken: string) => {
    spotifyAPI.setAccessToken(accessToken as string)
    setaccessTokenAtom(accessToken)
    const me = await spotifyAPI
      .getMe()
      .then((res) => res.body)
      .catch((err) => {
        console.log(err)
      })

    const followedArtists = await spotifyAPI
      ?.getFollowedArtists({
        limit: 50,
      })
      .then((res) => res.body)
      .catch((err) => {
        console.log(err)
      })
    const SavedAlbums = await spotifyAPI
      .getMySavedAlbums({
        limit: 50,
      })
      .then((res) => {
        return {
          ...res.body,
          items: res.body.items.sort(() => Math.random() - 0.5),
        }
      })
      .catch((err) => {
        console.log(err)
      })
    const TopArtists = await spotifyAPI
      .getMyTopArtists({
        limit: 50,
      })
      .then((res) => {
        return {
          ...res.body,
          items: res?.body?.items.sort(() => Math.random() - 0.5),
        }
      })
      .catch((err) => {
        console.log(err)
      })
    const Playlists = await spotifyAPI
      .getUserPlaylists({
        limit: 50,
      })
      .then((res) => res.body)
      .catch((err) => {
        console.log(err)
      })
    const NewReleases = await spotifyAPI
      .getNewReleases({
        limit: 50,
      })
      .then((res) => {
        return {
          ...res.body,
          items: res.body.albums.items.sort(() => Math.random() - 0.5),
        }
      })
      .catch((err) => {
        console.log(err)
      })
    const RecentlyPlayed = await spotifyAPI
      .getMyRecentlyPlayedTracks({
        limit: 50,
      })
      .then((res) => res.body)
      .catch((err) => {
        console.log(err)
      })
    const featuredPlaylists = await spotifyAPI
      .getFeaturedPlaylists({
        limit: 50,
      })
      .then((res) => res.body)
      .catch((err) => {
        console.log(err)
      })

    const SavedTracks = await spotifyAPI
      .getMySavedTracks({
        limit: 50,
      })
      .then((res) => res.body)
      .catch((err) => {
        console.log(err)
      })

    return {
      me,
      NewReleases,
      featuredPlaylists,
      RecentlyPlayed,
      SavedTracks,
      Playlists,
      SavedAlbums,
      TopArtists,
      followedArtists,
    }
  }
  useEffect(() => {
    Session.then(async (res) => {
      if (res?.accessToken) {
        await Promise.resolve(DataUserFetching(res?.accessToken as string))
          .then((hidratation) => {
            dispatch({
              type: 'HIDRATATION',
              payload: {
                ...hidratation,
                me: {
                  ...hidratation.me,
                  accessToken: res.accessToken,
                },
              },
            })
          })
          .then(() => {
            setShow(false)
          })
          .catch(() => {
            router.push('/')
          })
      } else {
        router.push('/')
      }
    }).catch(() => {
      router.push('/')
    })
  }, [])

  return show ? <AtomLoader /> : children
}

export default Hidratation
