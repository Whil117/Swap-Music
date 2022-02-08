import { FC } from 'react'
import * as S from '@Styles/components/Cards/Artist'
import Link from 'next/link'
import Image from '@Whil/components/Image'

const CardAlbum: FC<SpotifyApi.SavedAlbumObject> = (props) => {
  return (
    <Link
      href={{
        pathname: '/swap/album/[id]',
        query: {
          id: props.album.id,
        },
      }}
      passHref
    >
      <S.CardArtist>
        <Image
          src={props.album.images[0].url || 'https://via.placeholder.com/150'}
          alt={props.album.label}
          width={180}
          height={180}
          styles={{
            borderRadius: '5px',
          }}
        />
        {props.album.name.length > 35 ? (
          <h4>{props.album.name.slice(0, 35)}...</h4>
        ) : (
          <h4>{props.album.name}</h4>
        )}
        <p>{props.album.type}</p>
      </S.CardArtist>
    </Link>
  )
}

export default CardAlbum
