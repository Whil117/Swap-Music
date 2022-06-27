import * as cookie from 'cookie'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext, NextPageFC } from 'next'

type Props = {
  reserve_token: string
  Artist: SpotifyApi.SingleArtistResponse
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
}
const ArtistById: NextPageFC<Props> = ({
  reserve_token,
  Artist,
  ArtistAlbums,
}) => {
  return (
    <AtomWrapper>
      <AtomSeoLayout
        title="Swap"
        page={Artist.name}
        image={Artist?.images[0]?.url}
        description="Swap is a music platform that allows you to discover new music and connect with people who share the same taste."
      />
      <AtomWrapper>
        <h1>ArtistById {reserve_token}</h1>
        <AtomImage
          src={Artist?.images[0]?.url}
          width="100px"
          height="100px"
          alt={Artist?.name}
        />
        {ArtistAlbums?.items?.map((item) => (
          <AtomWrapper key={item.id}>
            <AtomLink
              color="white"
              href={{
                pathname: `/public/album/${item.id}`,
              }}
            >
              <a>
                <AtomText as="a" color="white">
                  {item.name}
                </AtomText>
              </a>
            </AtomLink>
          </AtomWrapper>
        ))}
      </AtomWrapper>
    </AtomWrapper>
  )
}
export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  const { reserve_token } = cookie.parse(context.req?.headers.cookie as string)
  spotifyAPI.setAccessToken(reserve_token as string)

  const Artist = await spotifyAPI
    .getArtist(id as string)
    .then((artist) => artist.body)

  const ArtistAlbums = await spotifyAPI
    .getArtistAlbums(id as string)
    .then((releases) => releases.body)
  ArtistById.SEO = {
    title: Artist.name as string,
    image: Artist?.images[0]?.url,
    description:
      'Swap is a music platform that allows you to discover new music and connect with people who share the same taste.',
  }
  return {
    props: {
      reserve_token,
      Artist,
      ArtistAlbums,
    },
  }
}
ArtistById.Layout = 'public'

export default ArtistById
