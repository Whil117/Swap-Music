import * as S from '@Styles/components/Cards/Artist'
import Image from '@Whil/components/Image'
import Link from 'next/link'
import { FC } from 'react'

const CardArtist: FC<SpotifyApi.ArtistObjectFull> = (props) => {
  return (
    <Link
      href={{
        pathname: '/swap/artist/[id]',
        query: {
          id: props.id,
        },
      }}
      passHref
    >
      <S.CardArtist>
        <Image
          src={props.images[0].url || 'https://via.placeholder.com/150'}
          alt={props.name}
          width={180}
          height={180}
          styles={{
            borderRadius: '50%',
          }}
        />
        <h4>{props.name}</h4>
        <p>Artist</p>
      </S.CardArtist>
    </Link>
  )
}

export default CardArtist
