/* eslint-disable no-console */
import { useQuery } from '@apollo/client'
import { ARTISTBYID } from '@Apollo/client/querys/artist'
import OrganismBanner from '@Components/@organisms/OrganismBanner'
import AtomSeoLayout from 'lib/AtomSeo'
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

  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page={data?.artistById?.name}
        image={data?.artistById?.images[0]?.url}
        description="Swap is a music platform that allows you to discover new music and connect with people who share the same taste."
      />
      <AtomWrapper>
        <OrganismBanner
          fullData={[] as any}
          name={data?.artistById?.name}
          title={data?.artistById?.name}
          image_url={data?.artistById?.images[0]?.url}
          type={data?.artistById?.type}
          followers={data?.artistById?.followers}
        />
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
