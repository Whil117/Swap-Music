/* eslint-disable no-console */
import { ARTISTBYID } from '@Apollo/client/querys/artist'
import OrganismBanner from '@Components/@organisms/OrganismBanner'
import { IArtist, IQueryFilter } from '@Types/index'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomWrapper from 'lib/Atomwrapper'
import { GetServerSideProps, NextPageFC } from 'next'
import { client } from 'pages/_app'
type Props = {
  artistById: IArtist
}

const ArtistById: NextPageFC<Props> = ({ artistById }) => {
  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page={artistById?.name}
        image={artistById?.images && artistById?.images[0]?.url}
        description="Swap is a music platform that allows you to discover new music and connect with people who share the same taste."
      />
      <AtomWrapper>
        <OrganismBanner
          fullData={[] as any}
          name={artistById?.name as string}
          title={artistById?.name as string}
          image_url={artistById?.images && artistById?.images[0]?.url}
          type={artistById?.type as string}
          followers={artistById?.followers}
          id={artistById?.id}
        />
      </AtomWrapper>
    </>
  )
}
ArtistById.Layout = 'public'
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string
  const data = await client
    .query<IQueryFilter<'artistById'>>({
      query: ARTISTBYID,
      fetchPolicy: 'network-only',
      variables: {
        id: id,
      },
    })
    .catch((err) => {
      console.log(err)
    })
  console.log(id)

  ArtistById.Layout = 'public'

  return {
    props: {
      artistById: data?.data?.artistById || {},
    },
  }
}

export default ArtistById
