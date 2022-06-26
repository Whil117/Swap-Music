import { useQuery } from '@apollo/client'
import { LISTARTISTS } from '@Apollo/client/querys/artist'
import Card from '@Components/Cards/Card'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'

const Public: NextPageFCProps = () => {
  const { data } = useQuery(LISTARTISTS)
  return (
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
  )
}
Public.Layout = 'public'

export default Public
