import spotifyAPI from 'lib/spotify/spotify'
import { getSession } from 'next-auth/react'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  hidratation: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  children: any
}

const Hidratation: FC<Props> = ({ children, hidratation, setLoading }) => {
  const dispatch = useDispatch()

  const DataUserFetching = async () => {
    const Session = await getSession()
    spotifyAPI.setAccessToken(Session?.accessToken as string)

    const followedArtists = await spotifyAPI
      .getFollowedArtists({
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
      me: Session?.user,
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
      DataUserFetching().then((res) => {
        // eslint-disable-next-line no-console
        console.log('Hidratation')
        dispatch({
          type: 'HIDRATATION',
          payload: res,
        })
        setTimeout(() => {
          setLoading(true)
        }, 2000)
      })
    }
  }, [hidratation])
  return children
}

export default Hidratation
