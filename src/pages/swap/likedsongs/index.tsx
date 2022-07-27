/* eslint-disable react-hooks/rules-of-hooks */
import AtomBanner from '@Components/@atoms/AtomBanner'
import { likedSongsAtom } from '@Components/@atoms/AtomBarScroll'
import AtomTrack from '@Components/@atoms/AtomTrack'
import { css } from '@emotion/react'
import { useAtomValue } from 'jotai'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'

const LikedSongs: NextPageFCProps = () => {
  const likedSongs = useAtomValue(likedSongsAtom)

  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page="Liked Songs"
        image=""
        keywords={['songs', 'liked']}
      />
      <AtomWrapper>
        <AtomBanner
          type="likedSongs"
          image_url="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/likd.png"
        />
        <AtomWrapper
          maxWidth="1440px"
          css={css`
            padding: 0 90px;
            flex-direction: column;
            @media (max-width: 980px) {
              width: auto;
              padding: 0 20px;
            }
          `}
        >
          {likedSongs?.items?.map((track, idx) => (
            <AtomTrack
              key={track.track.id}
              type="likedsongs"
              id={track.track.album.id}
              likedSongs={{
                id: track.track.album.id,
                name: track.track.name,
                idTrack: track.track.id,
                preview_url: track.track.preview_url as string,
                position: idx,
                album: {
                  id: track.track.album.id,
                  name: track.track.album.name,
                  image: track.track.album.images[0].url as string,
                },
                image: track.track.album.images[0].url,
                duration: track.track.duration_ms,
                artists: track.track.artists,
                context: likedSongs?.items.map((track) => ({
                  id: track.track.id,
                  name: track.track.name,
                  preview_url: track.track.preview_url as string,
                  position: idx,
                  album: {
                    id: track.track.album.id,
                    name: track.track.album.name,
                    image: track.track.album.images[0].url as string,
                  },
                  image: track.track.album.images[0].url,
                  duration: track.track.duration_ms,
                  artists: track.track.artists,
                  type: 'likedsongs',
                })),
              }}
            />
          ))}
        </AtomWrapper>
      </AtomWrapper>
    </>
  )
}
LikedSongs.SEO = {
  title: 'Liked Songs',
  image: '',
  keywords: ['songs', 'liked'],
}
export async function getServerSideProps() {
  return {
    props: {},
  }
}
LikedSongs.Layout = 'swap'
export default LikedSongs
