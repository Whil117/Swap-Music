import { LISTARTISTS } from '@Apollo/client/querys/artist'
import AtomCard from '@Components/@atoms/AtomCard'
import { css } from '@emotion/react'
import { IArtist, IQueryFilter } from '@Types/index'
import AtomButton from 'lib/Atombutton'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFC } from 'next'
import { useRouter } from 'next/router'
import { client } from 'pages/_app'

type PropsPage = {
  listArtist: IArtist[]
}

const Public: NextPageFC<PropsPage> = ({ listArtist }) => {
  const router = useRouter()
  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page="Public"
        image={
          [...(listArtist as any)]?.find((item) => item?.type === 'artist')
            ?.images[0]?.url
        }
        description="Swap is a music platform that allows you to discover new music and connect with people who share the same taste."
      />
      <AtomWrapper
        padding="0px 90px"
        width="1440px"
        css={css`
          @media (max-width: 980px) {
            padding: 0px 30px;
          }
        `}
      >
        <AtomText>Artist</AtomText>
        <AtomWrapper
          flexDirection="row"
          flexWrap="wrap"
          css={css`
            display: flex;
            gap: 5px;
          `}
        >
          {listArtist?.map((artist: any) => (
            <>
              <AtomCard
                key={artist?.id}
                id={artist?.id}
                name={artist?.name}
                image={artist?.images[0]?.url}
                type={artist?.type}
                customUrl={{
                  pathname: `/public/artist/[id]`,
                  query: {
                    id: artist?.id,
                  },
                }}
              />
              <AtomButton
                onClick={() => {
                  router.push({
                    pathname: `/public/artist/[id]`,
                    query: {
                      id: artist?.id,
                    },
                  })
                }}
              >
                View
              </AtomButton>
            </>
          ))}
        </AtomWrapper>
      </AtomWrapper>
    </>
  )
}
export async function getServerSideProps() {
  const data = await client?.query<IQueryFilter<'listArtist'>>({
    query: LISTARTISTS,
    variables: {},
  })

  return {
    props: {
      listArtist: data?.data?.listArtist || [],
    },
  }
}
Public.Layout = 'public'

export default Public
