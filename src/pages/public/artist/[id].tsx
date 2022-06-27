/* eslint-disable no-console */
import { useQuery } from '@apollo/client'
import { ARTISTBYID } from '@Apollo/client/querys/artist'
import ColorThief from 'colorthief'
import AtomImage from 'lib/AtomImage'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageContext, NextPageFC } from 'next'
import { useEffect } from 'react'

type Props = {
  id: string
  reserve_token: string
  Artist: SpotifyApi.SingleArtistResponse
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
}
const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')

rgbToHex(102, 51, 153)
const ArtistById: NextPageFC<Props> = ({ id }) => {
  const { data } = useQuery(ARTISTBYID, {
    variables: {
      id: id,
    },
  })
  useEffect(() => {
    ;(async () => {
      const colorThief = new ColorThief()
      const img = new Image()
      img.addEventListener('load', function () {
        const data = colorThief.getPalette(img, 5)
        const hex = data.map((item: any) => rgbToHex(item[0], item[1], item[2]))
        console.log(hex)
      })

      img.crossOrigin = 'Anonymous'
      img.src = data?.artistById?.images[0]?.url
      // var url = data?.artistById?.images[0]?.url
      // var imgObj = new Image()
      // imgObj.src = googleProxyURL + encodeURIComponent(url)
      // imgObj.setAttribute('crossOrigin', '')
      // imgObj.crossOrigin = 'Anonymous'
      // imgObj.width = 100
      // imgObj.height = 100
      // if (imgObj) {
      //   const colorPallete = await getColor(imgObj)
      //   if (!imgObj.src.includes('undefined')) {
      //     const colors2 = getPaletteFromURL(imgObj.src)
      //     console.log(colors2)
      //   }
      //   // colors2.then((colors) => console.log(colors))
      // }
    })()
  }, [data?.artistById?.images[0]?.url])

  return (
    <AtomWrapper>
      <AtomSeoLayout
        title="Swap"
        page={data?.artistById?.name}
        image={data?.artistById?.images[0]?.url}
        description="Swap is a music platform that allows you to discover new music and connect with people who share the same taste."
      />
      <AtomWrapper>
        <AtomImage
          crossOrigin="anonymous"
          id="imgfile"
          src={data?.artistById?.images[0]?.url}
          width="100px"
          height="100px"
          alt={data?.artistById?.name}
        />

        {/* {ArtistAlbums?.items?.map((item) => (
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
        ))} */}
      </AtomWrapper>
      {data?.artistById?.images[0]?.url}
    </AtomWrapper>
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
