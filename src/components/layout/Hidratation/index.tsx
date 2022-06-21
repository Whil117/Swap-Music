/* eslint-disable no-console */
import spotifyAPI from 'lib/spotify/spotify'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>
  children: JSX.Element
}

const Hidratation: FC<Props> = ({ children, setShow }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const Session = getSession()

  const DataUserFetching = async (accessToken: string) => {
    spotifyAPI.setAccessToken(accessToken as string)
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
      .then((res) => {
        return {
          ...res.body,
          items: res.body.items.map((track) => ({
            ...track,
            saved: true,
          })),
        }
      })
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
    Session.then((res) => {
      if (res?.accessToken) {
        Promise.resolve(DataUserFetching(res?.accessToken as string))
          .then((hidratation) => {
            setShow(false)

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
          .catch(() => {
            router.push('/')
          })
      }
    })
  }, [])
  return children
}

export default Hidratation
