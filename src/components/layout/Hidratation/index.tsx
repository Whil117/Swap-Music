/* eslint-disable no-console */
import spotifyAPI from 'lib/spotify/spotify'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  hidratation: boolean
  accessToken: string
}

const Hidratation: FC<Props> = ({ children, hidratation, accessToken }) => {
  const dispatch = useDispatch()

  const DataUserFetching = async () => {
    const followedArtists = await spotifyAPI
      .getFollowedArtists({
        limit: 50,
      })
      .then((res) => {
        return {
          ...res.body.artists,
          items: res.body.artists.items.sort(() => Math.random() - 0.5),
        }
      })
    return {
      followedArtists,
    }
  }

  useEffect(() => {
    if (hidratation) {
      spotifyAPI.setAccessToken(accessToken as string)
      DataUserFetching().then((res) => {
        console.log('Hidratation')
        dispatch({
          type: 'HIDRATATION',
          payload: res,
        })
      })
    }
  }, [hidratation])

  return <>{children}</>
}

export default Hidratation
