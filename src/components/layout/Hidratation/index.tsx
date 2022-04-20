import spotifyAPI from 'lib/spotify/spotify'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  hidratation: boolean
  accessToken: string
  setShow: Dispatch<SetStateAction<boolean>>
  children: any
}

const Hidratation: FC<Props> = ({
  children,
  accessToken,
  hidratation,
  setShow,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const DataUserFetching = async () => {
    spotifyAPI.setAccessToken(accessToken as string)
    const me = await spotifyAPI.getMe().then((res) => res.body)

    const followedArtists = await spotifyAPI
      ?.getFollowedArtists({
        limit: 50,
      })
      .then((res) => res.body)
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
    const TopArtists = await spotifyAPI
      .getMyTopArtists({
        limit: 50,
      })
      .then((res) => {
        return {
          ...res.body,
          items: res.body.items.sort(() => Math.random() - 0.5),
        }
      })
    const Playlists = await spotifyAPI
      .getUserPlaylists({
        limit: 50,
      })
      .then((res) => res.body)
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
    const RecentlyPlayed = await spotifyAPI
      .getMyRecentlyPlayedTracks({
        limit: 50,
      })
      .then((res) => res.body)
    const featuredPlaylists = await spotifyAPI
      .getFeaturedPlaylists({
        limit: 50,
      })
      .then((res) => res.body)

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
    if (hidratation) {
      DataUserFetching()
        .then((res) => {
          setShow(false)
          dispatch({
            type: 'SETPLAY',
            payload: {
              play: false,
            },
          })
          dispatch({
            type: 'HIDRATATION',
            payload: res,
          })
        })
        .catch(() => {
          router.push('/')
        })
    }
  }, [hidratation])
  return children
}

export default Hidratation
