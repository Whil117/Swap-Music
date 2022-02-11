import * as S from '@Styles/components/Cards/Artist'
import Image from '@Whil/components/Image'
import Link from 'next/link'
import { FC } from 'react'

type Card = {
  id: string
  type: string
  image: string
  name: string
}

const Card: FC<Card> = (props) => {
  const ImageTypes = ['album', 'track', 'playlist']
  return (
    <Link
      href={{
        pathname: `/swap/${props.type}/[id]`,
        query: {
          id: props.id,
        },
      }}
      passHref
    >
      <S.CardArtist>
        <Image
          src={props.image || 'https://via.placeholder.com/150'}
          alt={props.name}
          width={180}
          height={180}
          styles={{
            borderRadius: ImageTypes.includes(props.type) ? '5px' : '50%',
          }}
        />
        {props.name.length > 35 ? (
          <h4>{props.name.slice(0, 35)}...</h4>
        ) : (
          <h4>{props.name}</h4>
        )}
        <p>{props.type}</p>
      </S.CardArtist>
    </Link>
  )
}

export default Card
