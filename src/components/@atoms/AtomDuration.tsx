import { css } from '@emotion/react'
import useTime, { UseTimeProps } from '@Hooks/useTime'
import AtomText from 'lib/AtomText'
import { FC } from 'react'

type Props = {
  release: string
  totalTracks: number
  useTime: UseTimeProps
  type?: string
}

const AtomDuration: FC<Props> = (props) => {
  const [hours, minutes, seconds] = useTime(props.useTime)
  return (
    <AtomText
      as="p"
      css={css`
        margin: 0 10px;
        font-weight: 400;
        display: flex;
        align-items: center;
      `}
    >
      {props.release && `${props.release.slice(0, 4)} •  `}
      {props.totalTracks}
      {props.type || ' Songs'}, {hours ? `${hours} hr ${minutes} min` : ''}{' '}
      {!hours
        ? `${minutes} Min ${
            seconds?.toFixed(0).length === 1
              ? `0${seconds.toFixed()} Min`
              : `${seconds?.toFixed()} Sec`
          }`
        : ''}
    </AtomText>
  )
}

export default AtomDuration
