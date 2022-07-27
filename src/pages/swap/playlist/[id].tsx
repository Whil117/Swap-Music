/* eslint-disable no-unused-vars */
import AtomBanner from '@Components/@atoms/AtomBanner'
import AtomTrack from '@Components/@atoms/AtomTrack'
import { css } from '@emotion/react'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext, NextPageFC } from 'next'
import { getSession } from 'next-auth/react'

type Props = {
  Playlist: SpotifyApi.SinglePlaylistResponse
}

const Playlist: NextPageFC<Props> = ({ Playlist }) => {
  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page={Playlist.name}
        image={Playlist.images[0]?.url}
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
              type: Playlist.owner.type,
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
          {Playlist?.tracks?.items?.map((track, idx) => (
            <AtomTrack
              key={track?.track?.id}
              type="likedsongs"
              id={track?.track?.album.id as string}
              likedSongs={{
                id: track?.track?.album.id,
                idTrack: track?.track?.id,
                name: track?.track?.name,
                preview_url: track?.track?.preview_url as string,
                position: idx,
                album: {
                  id: track?.track?.album.id,
                  name: track?.track?.album.name,
                  image: track?.track?.album.images[0]?.url as string,
                },
                image: track?.track?.album.images[0]?.url,
                duration: track?.track?.duration_ms,
                artists: track?.track?.artists,
                context: Playlist?.tracks?.items.map((track) => ({
                  id: track?.track?.id,
                  name: track?.track?.name,
                  preview_url: track?.track?.preview_url as string,
                  position: idx,
                  album: {
                    id: track?.track?.album.id,
                    name: track?.track?.album.name,
                    image: track?.track?.album.images[0]?.url as string,
                  },
                  image: track?.track?.album.images[0]?.url,
                  duration: track?.track?.duration_ms,
                  artists: track?.track?.artists,
                  type: 'playlist',
                })),
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
    .then((res) => res?.body)

  Playlist.SEO = {
    title: PLAY.name,
    image: PLAY.images[0]?.url,
    keywords: [PLAY?.owner?.display_name as string],
  }

  return {
    props: {
      Playlist: PLAY,
    },
  }
}
Playlist.Layout = 'swap'

export default Playlist
