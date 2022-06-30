/* eslint-disable no-console */
import { useQuery } from '@apollo/client'
import { ARTISTBYID } from '@Apollo/client/querys/artist'
import { css } from '@emotion/react'
import UseColor from '@Hooks/UseColor'
import FollowNumbers from '@Utils/Followers'
import AtomImage from 'lib/AtomImage'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageContext, NextPageFC } from 'next'
type Props = {
  id: string
  reserve_token: string
  Artist: SpotifyApi.SingleArtistResponse
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
}

const ArtistById: NextPageFC<Props> = ({ id }) => {
  const { data } = useQuery(ARTISTBYID, {
    variables: {
      id: id,
    },
  })
  const colors = UseColor({ url: data?.artistById?.images[0]?.url })

  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page={data?.artistById?.name}
        image={data?.artistById?.images[0]?.url}
        description="Swap is a music platform that allows you to discover new music and connect with people who share the same taste."
      />
      <AtomWrapper>
        <AtomWrapper
          css={css`
            height: 400px;
            display: flex;
            align-items: center;
            padding: 0px 90px;
            justify-content: flex-start;
            transition: all 0.3s ease;
            background: linear-gradient(
                180deg,
                rgba(100, 100, 100, 0) 0%,
                #121216 100%
              ),
              ${colors[0]};
            @media (max-width: 768px) {
              justify-content: center;
              height: 600px;
              padding: 0;
            }
          `}
        >
          <AtomImage
            crossOrigin="anonymous"
            id="imgfile"
            src={data?.artistById?.images[0]?.url}
            width="280px"
            height="280px"
            borderRadius="10px"
            alt={data?.artistById?.name}
          />
          <AtomWrapper flexDirection="column" width="1160px" padding="20px">
            <AtomText fontWeight="bold">ARTIST</AtomText>
            <AtomText fontWeight="bold" fontSize="48px">
              {data?.artistById?.name}
            </AtomText>
            <AtomText fontWeight="normal" fontSize="16px">
              {FollowNumbers(data?.artistById?.followers)}
            </AtomText>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  return {
    props: {
      id,
    },
  }
}
ArtistById.Layout = 'public'

export default ArtistById
