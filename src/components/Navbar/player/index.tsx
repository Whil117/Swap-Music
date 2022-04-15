import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomInput from 'lib/AtomInput'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const NavbarPlayer: FC<Props> = () => {
  const [volumen, setVolumen] = useState(50)
  const user = useSelector((state: SelectFor) => state.user)
  return (
    <AtomWrapper
      css={css`
        /* height: 80px; */
        padding: 20px;
        grid-column: 1 / -1;
        grid-row: 2;
        background-color: #191922;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        gap: 10px;
      `}
    >
      <AtomWrapper
        css={css`
          grid-column: 1 / 2;
          display: grid;
          /* gap: 10px; */
          grid-template-rows: 40px 40px;
          grid-template-columns: auto 1fr;
          grid-column-gap: 10px;
        `}
      >
        <AtomWrapper
          css={css`
            width: 80px;
            grid-row: 1 /-1;
          `}
        >
          <AtomImage
            src={user.me.images[0].url}
            alt={user.me.display_name}
            borderRadius="10px"
            width="100%"
            height="100%"
            css={css`
              grid-row: 1 / -1;
            `}
          />
        </AtomWrapper>
        <AtomText
          as="p"
          css={css`
            grid-column: 2;
            grid-row: 1;
          `}
        >
          {user.me.display_name}
        </AtomText>
        <AtomText
          as="p"
          css={css`
            grid-column: 2;
            grid-row: 2;
            opacity: 0.5;
          `}
        >
          {user.me.display_name}
        </AtomText>
      </AtomWrapper>
      <AtomWrapper
        css={css`
          grid-column: 2/3;
          display: grid;
          grid-template-rows: repeat(2, auto);
        `}
      >
        <AtomWrapper
          css={css`
            grid-row: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          `}
        >
          {playerButtons.map((button) => (
            <>
              {typeof button.icon === 'object' ? (
                <Atombutton>
                  <Svg src={`/icons/${button.icon.pause}`} />
                </Atombutton>
              ) : (
                <Atombutton>
                  <Svg src={`/icons/${button.icon}`} />
                </Atombutton>
              )}
            </>
          ))}
        </AtomWrapper>
        <AtomInput
          id="player-reproductor"
          type="range"
          placeholder="Search"
          value={volumen}
          onChange={(e) => setVolumen(e.target.value)}
          css={css`
            width: 100%;
            grid-row: 2;
          `}
        />
      </AtomWrapper>
      <AtomWrapper
        css={css`
          grid-column: 3 / 4;
          display: flex;
          align-self: center;
          justify-self: flex-end;
          gap: 15px;
        `}
      >
        {buttonsActions.map((item) => (
          <Atombutton key={item.key}>
            <Svg src={`/icons/${item.icon}`} />
          </Atombutton>
        ))}
        <AtomInput
          id="volumen"
          type="range"
          placeholder="Search"
          value={volumen}
          onChange={(e) => setVolumen(e.target.value)}
          css={css`
            width: 150px;
          `}
        />
      </AtomWrapper>
    </AtomWrapper>
  )
}
const buttonsActions = [
  {
    key: 1,
    id: 'repeat',
    icon: 'repeat',
  },
  {
    key: 2,
    id: 'aleatory',
    icon: 'aleatory',
  },
  {
    key: 3,
    id: 'queue',
    icon: 'queue',
  },
  {
    key: 4,
    id: 'sound',
    icon: 'sound',
  },
]
const playerButtons = [
  {
    key: 1,
    id: 'back',
    icon: 'back',
  },
  {
    key: 2,
    id: 'play',
    icon: {
      play: 'play',
      pause: 'pause',
    },
  },
  {
    key: 3,
    id: 'next',
    icon: 'next',
  },
]

export default NavbarPlayer
