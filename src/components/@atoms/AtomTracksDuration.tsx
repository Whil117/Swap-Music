import useTime, { UseTimeProps } from '@Hooks/useTime'
import P from '@Whil/components/P'
import { FC } from 'react'

type Props = {
  release: string
  totalTracks: number
  useTime: UseTimeProps
  type?: string
}

const AtomTracksDuration: FC<Props> = (props) => {
  const [hours, minutes, seconds] = useTime(props.useTime)
  return (
    <P
      styles={{
        opacity: 0.5,
        margin: '0 5px',
        width: 'auto',
        fontSize: '15px',
      }}
    >
      • {props.release && `${props.release.slice(0, 4)} •  `}{' '}
      {props.totalTracks}
      <P
        styles={{
          margin: '0 5px',
          width: 'auto',
          fontSize: '15px',
        }}
      >
        {props.type || 'Songs'}
      </P>
      , {hours ? `${hours} hr ${minutes} min` : ''}{' '}
      {!hours
        ? `${minutes} Min ${
            seconds?.toFixed(0).length === 1
              ? `0${seconds.toFixed()} Min`
              : `${seconds?.toFixed()} Sec`
          }`
        : ''}
    </P>
  )
}

export default AtomTracksDuration
