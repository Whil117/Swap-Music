import Link from 'next/link'
import { FC } from 'react'
import * as S from '@Styles/components/Cards/Artist'
import Image from '@Whil/components/Image'

const CardPlaylist: FC<SpotifyApi.PlaylistObjectSimplified> = (props) => {
  return (
    <Link
      href={{
        pathname: '/swap/album/[id]',
        query: {
          id: props.id,
        },
      }}
      passHref
    >
      <S.CardArtist>
        <Image
          src={props.images[0]?.url || 'https://via.placeholder.com/180'}
          alt={props.name}
          width={180}
          height={180}
          styles={{
            borderRadius: '5px',
          }}
        />
        {props.name.length > 35 ? (
          <h4>{props.name.slice(0, 35)}...</h4>
        ) : (
          <h4>{props.name}</h4>
        )}
        <p>{props.owner.display_name}</p>
      </S.CardArtist>
    </Link>
  )
}

export default CardPlaylist
