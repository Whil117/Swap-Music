import AtomTracksDuration from '@Components/@atoms/AtomTracksDuration'
import { UseTimeProps } from '@Hooks/useTime'
import {
  LikedSongsProps,
  LikedSongsWrapper,
} from '@Styles/pages/swap/liked songs'
import Div from '@Whil/components/Div'
import Image from '@Whil/components/Image'
import P from '@Whil/components/P'
import Link from 'next/link'
import { FC, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'

type Props = {
  id: string
  title: string
  name: string
  desc?: string
  image_url: string
  image_url_avatar?: string
  type: string
  release_date: string
  total_tracks: number
  useTime: UseTimeProps
}

const stringToHTML = (str?: string) => {
  const parser = new DOMParser()

  const doc = parser.parseFromString(str as string, 'text/html')
  return doc.body
}

const OrganismBanner: FC<Props> = (props) => {
  const [color, setColor] = useState<string[]>([])
  return (
    <LikedSongsWrapper color={color[0]}>
      <Div
        styles={{
          boxshadow: 'a',
          justifycontent: 'flex-start',
          flexdirection: 'row',
        }}
      >
        <ColorExtractor
          src={props.image_url}
          getColors={(colors: string[]) => setColor(colors)}
        />

        <Image
          src={props.image_url || 'https://via.placeholder.com/150/92c952'}
          width={240}
          height={240}
          alt={props.name}
          styles={{
            borderRadius: '5px',
          }}
        />
        <LikedSongsProps>
          <h4>{props.type.toUpperCase()}</h4>
          <h1>{props.title}</h1>
          {props.desc && (
            <P
              styles={{
                opacity: 0.75,
              }}
            >
              {stringToHTML(props.desc).innerText}
            </P>
          )}
          <Div
            styles={{
              width: '100%',
              justifycontent: 'flex-start',
              flexdirection: 'row',
            }}
          >
            <Link
              href={{
                pathname: '/swap/artist/[id]',
                query: { id: props.id },
              }}
              passHref
            >
              <a>
                <P
                  styles={{
                    display: 'flex',
                    alignitems: 'center',
                    fontWeight: '600',
                    margin: '20px 1px',
                  }}
                >
                  {props.image_url_avatar && (
                    <Image
                      src={props.image_url_avatar}
                      width={30}
                      height={30}
                      alt={props.name}
                      styles={{
                        borderRadius: '50%',
                      }}
                    />
                  )}
                  {props.name}
                </P>
              </a>
            </Link>
            <AtomTracksDuration
              release={props.release_date}
              totalTracks={props.total_tracks}
              useTime={props.useTime}
            />
          </Div>
        </LikedSongsProps>
      </Div>
    </LikedSongsWrapper>
  )
}

export default OrganismBanner
