import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import { useRouter } from 'next/router'
import { FC } from 'react'

type Card = {
  id: string
  type: string
  image: string
  name: string
}

const Card: FC<Card> = (props) => {
  const ImageTypes = ['album', 'track', 'playlist']
  const router = useRouter()
  return (
    <Atombutton
      onClick={() => {
        router
          .push({
            pathname: `/swap/${props.type}/[id]`,
            query: {
              id: props.id,
            },
          })
          .then(() => {
            document?.getElementById('view')?.scroll({
              top: 0,
            })
          })
      }}
      css={css`
        display: flex;
        cursor: pointer;
        transition: all 0.3s ease;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: ${colors.white};
        padding: 10px;
        background-color: ${colors.black_quinary};
        margin: 10px;
        border-radius: 5px;
        width: 200px;
        height: 264px;
        &:hover {
          transform: scale(1.05);
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
          background: ${colors.black_quaternary};
        }
      `}
    >
      <AtomImage
        src={props.image || 'https://via.placeholder.com/150'}
        alt={props.name}
        width="200px"
        height="200px"
        borderRadius={ImageTypes.includes(props.type) ? '5px' : '50%'}
      />
      {props.name.length > 35 ? (
        <AtomText
          as="h4"
          css={css`
            width: 100%;
            line-height: 1.2;
            text-align: center;
            font-size: 1rem;
          `}
        >
          {props.name.slice(0, 35)}...
        </AtomText>
      ) : (
        <AtomText
          as="h4"
          css={css`
            width: 100%;
            line-height: 1.2;
            text-align: center;
            font-size: 1rem;
          `}
        >
          {props.name}
        </AtomText>
      )}
    </Atombutton>
  )
}

// <Link
//   href={{
//     pathname: `/swap/${props.type}/[id]`,
//     query: {
//       id: props.id,
//     },
//   }}
//   passHref
// ></Link>

export default Card
