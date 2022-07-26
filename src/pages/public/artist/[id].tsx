/* eslint-disable no-console */
import { ARTISTBYID } from '@Apollo/client/querys/artist'
import AtomBanner from '@Components/@atoms/AtomBanner'
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
        <AtomBanner
          type="artist"
          name={artistById?.name as string}
          image_url={artistById?.images && (artistById?.images[0]?.url as any)}
          followers={artistById?.followers as number}
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

  ArtistById.Layout = 'public'
  ArtistById.SEO = {
    title: data?.data?.artistById?.name,
    image:
      data?.data?.artistById?.images &&
      (data?.data?.artistById?.images[0]?.url as string),
    description:
      'Swap is a music platform that allows you to discover new music and connect with people who share the same taste.',
  }

  return {
    props: {
      artistById: data?.data?.artistById || {},
    },
  }
}

export default ArtistById
