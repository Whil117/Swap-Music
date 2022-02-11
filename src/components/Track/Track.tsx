import useTime from '@Hooks/useTime'
import Div from '@Whil/components/Div'
import Image from '@Whil/components/Image'
import P from '@Whil/components/P'
import Link from 'next/link'
import { TrackWrapper } from 'pages/swap/likedsongs'
import { FC } from 'react'

type Props = {
  id: string
  count: number
  name: string
  image: string
  artists: {
    name: string
    id: string
  }[]
  album: {
    id: string
    name: string
  }
  duration: number
}

const Track: FC<Props> = (props) => {
  const [hours, minutes, seconds] = useTime({ ms: props.duration })
  return (
    <TrackWrapper key={props.id}>
      <Div
        styles={{
          justifycontent: 'flex-start',
          width: '50%',
          flexdirection: 'row',
        }}
      >
        <Div
          styles={{
            width: '8px',
            margin: ' 10px 20px',
          }}
        >
          <P
            styles={{
              margin: '0px 20px',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            {props.count + 1}
          </P>
        </Div>
        <div>
          <Image
            src={props.image || ''}
            width={55}
            height={55}
            alt={props.name}
            styles={{
              margin: '20px',
              borderRadius: '5px',
            }}
          />
        </div>
        <Div
          styles={{
            alignitems: 'flex-start',
            margin: '0 20px',
          }}
        >
          <P styles={{ fontWeight: '600', margin: '5px 0' }}>
            {props.name.length > 40
              ? props.name.slice(0, 40) + '...'
              : props.name}
          </P>

          <Div
            styles={{
              justifycontent: 'flex-start',
              flexdirection: 'row',
            }}
          >
            {props.artists.map((artist, index) => (
              <Link
                href={{
                  pathname: '/swap/artist/[id]',
                  query: { id: artist.id },
                }}
                passHref
                key={artist.id}
              >
                <a>
                  <P
                    styles={{
                      opacity: 0.5,
                      width: 'auto',
                    }}
                    key={artist.id}
                  >
                    {index === 0 ? '' : ', '} {artist.name}
                  </P>
                </a>
              </Link>
            ))}
          </Div>
        </Div>
      </Div>

      <Div
        styles={{
          alignitems: 'flex-start',
          width: '50%',
        }}
      >
        <Link
          href={{
            pathname: '/swap/album/[id]',
            query: { id: props.album.id },
          }}
          passHref
        >
          <a>
            <P
              styles={{
                opacity: 0.5,
              }}
            >
              {props.album.name}
            </P>
          </a>
        </Link>
      </Div>
      <div>
        <p>
          {' '}
          {hours ? `${hours} ${minutes}` : ''}{' '}
          {!hours
            ? `${minutes}:${
                seconds?.toFixed(0).length === 1
                  ? `0${seconds.toFixed()}`
                  : seconds?.toFixed()
              }`
            : ''}
        </p>
      </div>
    </TrackWrapper>
  )
}

export default Track
