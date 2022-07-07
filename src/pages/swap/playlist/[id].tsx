/* eslint-disable no-unused-vars */
import AtomBanner from '@Components/@atoms/AtomBanner'
import { controlsAtom } from '@Components/Navbar/player'
import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import { ActionPlayerTracks } from '@Redux/reducers/player'
import reducerplayer from '@Redux/reducers/player/controls'
import { useReducerAtom } from 'jotai/utils'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext, NextPageFC } from 'next'
import { getSession } from 'next-auth/react'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  Playlist: SpotifyApi.SinglePlaylistResponse
}

const convertPlayerTracks = (
  dispatch: Dispatch<ActionPlayerTracks>,
  player: {
    id: string
    data: SpotifyApi.TrackObjectSimplified[] | SpotifyApi.PlaylistTrackObject[]
  }
) => {
  dispatch({
    type: 'SETPLAYERTRACKS',
    payload: {
      tracks: player.data,
      currentTrackId: player.id,
      play: true,
    },
  })
}

const Playlist: NextPageFC<Props> = ({ Playlist }) => {
  const dispatch = useDispatch<Dispatch<ActionPlayerTracks>>()
  const [_, dispatchImage] = useReducerAtom(controlsAtom, reducerplayer)

  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page={Playlist.name}
        image={Playlist.images[0].url}
        keywords={[Playlist.description as string]}
      />
      <AtomWrapper
        css={css`
          width: 100%;
          @media (max-width: 980px) {
            width: auto;
          }
        `}
      >
        <AtomBanner
          type="playlist"
          image_url={Playlist?.images[0]?.url}
          name={Playlist.name}
          playlist={{
            artist: {
              name: Playlist.owner.display_name as string,
              id: Playlist.owner.id,
            },
            type: Playlist.type,
            total_tracks: Playlist.tracks.items.length,
            duration_ms: Playlist.tracks.items.reduce(
              (acc, cur) => acc + (cur?.track?.duration_ms as number),
              0
            ),
          }}
        />

        <AtomWrapper
          css={css`
            display: flex;
            alig-items: flex-start;
            padding: 0 90px;
            flex-direction: column;
            gap: 20px;
            @media (max-width: 980px) {
              padding: 0 30px;
            }
          `}
        >
          {Playlist.tracks.items.map((track, idx) => (
            <Track
              {...{ ...(track?.track as any) }}
              position={idx}
              key={track?.track?.id}
              withImage
              onPlayer={() => {
                dispatchImage({
                  type: 'VIEWIMAGESIDEBAR',
                  payload: {
                    image: track?.track?.album?.images[0].url,
                  },
                })
                convertPlayerTracks(dispatch, {
                  id: track?.track?.id as string,
                  data: Playlist.tracks.items,
                })
              }}
            />
          ))}
        </AtomWrapper>
      </AtomWrapper>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  const Session = await getSession(context)
  spotifyAPI.setAccessToken(Session?.accessToken as string)

  const PLAY = await spotifyAPI
    .getPlaylist(id as string)
    .then((res) => res.body)

  Playlist.SEO = {
    title: PLAY.name,
    image: PLAY.images[0].url,
    keywords: [PLAY.owner.display_name as string],
  }

  return {
    props: {
      Playlist: PLAY,
    },
  }
}
Playlist.Layout = 'swap'

export default Playlist
