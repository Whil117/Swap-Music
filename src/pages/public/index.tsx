import { useQuery } from '@apollo/client'
import { LISTARTISTS } from '@Apollo/client/querys/artist'
import Card from '@Components/Cards/Card'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'

const Public: NextPageFCProps = () => {
  const { data } = useQuery(LISTARTISTS)
  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page={data?.listArtist[0]?.name}
        image={data?.listArtist[0]?.images[0]?.url}
        description="Swap is a music platform that allows you to discover new music and connect with people who share the same taste."
      />
      <AtomWrapper>
        <AtomText as="h1">Public Music</AtomText>
        {data?.listArtist?.map((artist: any) => (
          <Card
            key={artist?.id}
            id={artist?.id}
            name={artist?.name}
            image={artist?.images[0]?.url}
            type={artist?.type}
            customUrl={{
              pathname: `/public/artist/${artist?.id}`,
            }}
          />
        ))}
      </AtomWrapper>
    </>
  )
}
export async function getServerSideProps() {
  // const data = await client?.query({
  //   query: LISTARTISTS,
  //   variables: {},
  // })
  // console.log(data)

  return {
    props: {},
  }
}
Public.Layout = 'public'

export default Public
