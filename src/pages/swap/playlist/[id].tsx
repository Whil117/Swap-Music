/* eslint-disable no-unused-vars */
import OrganismBanner from '@Components/@organisms/OrganismBanner'
import { controlsAtom } from '@Components/Navbar/player'
import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import { ActionPlayerTracks } from '@Redux/reducers/player'
import reducerplayer from '@Redux/reducers/player/controls'
import { ArtistWrapper } from '@Styles/pages/swap/artist'
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
      <ArtistWrapper>
        <OrganismBanner
          fullData={[] as any}
          id={
            Playlist?.tracks?.items?.find(
              (item) =>
                item?.track?.artists[0]?.name === Playlist?.owner?.display_name
            )?.track?.artists[0]?.id as string
          }
          title={Playlist.name}
          name={Playlist.owner.display_name as string}
          image_url={
            Playlist?.images[0]?.url ??
            'https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2FFrame%2094.svg?alt=media&token=e9c9283e-808b-40ac-ba7b-3ce37452a9a2'
          }
          type={Playlist.type}
          release_date=""
          total_tracks={Playlist.tracks.total}
          useTime={{
            tracks: [
              ...Playlist.tracks.items.map(
                (item) => item.track as SpotifyApi.TrackObjectSimplified
              ),
            ],
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
      </ArtistWrapper>
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
