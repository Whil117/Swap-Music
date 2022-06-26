/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import { PrimitiveAtom } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import AtomButton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import { useRouter } from 'next/router'
import { RecentListened, recentListened, reducerRecent } from 'pages/swap'
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
  const [_, setRecent] = useReducerAtom(
    recentListened as PrimitiveAtom<RecentListened[]>,
    reducerRecent
  )
  return (
    <AtomButton
      onClick={() => {
        setRecent({
          type: 'set',
          payload: {
            id: props.id,
            name: props.name,
            type: props.type,
            image: props.image,
            url: `/swap/${props.type}/${props.id}`,
          },
        })
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
        /* margin: 10px; */
        border-radius: 5px;
        width: 200px;
        height: 264px;
        &:hover {
          /* transform: scale(1.05); */
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
          background: ${colors.black_quaternary};
        }
        @media (max-width: 520px) {
          width: 190px;
          height: 240px;
          margin: 5px;
          /* height: 180px; */
        }
        @media (max-width: 465px) {
          width: 180px;
          /* height: 180px; */
        }
        @media (max-width: 445px) {
          width: 170px;
          /* height: 180px; */
        }
        @media (max-width: 425px) {
          width: 150px;
          height: 220px;
          /* height: 180px; */
        }
        @media (max-width: 375px) {
          width: 130px;
          height: 220px;
          /* height: 180px; */
        }
      `}
    >
      <AtomImage
        src={
          props.image ??
          'https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2FFrame%2094.svg?alt=media&token=e9c9283e-808b-40ac-ba7b-3ce37452a9a2'
        }
        alt={props.name}
        width="100%"
        height="180px"
        borderRadius={ImageTypes.includes(props.type) ? '5px' : '50%'}
        css={css`
          @media (max-width: 520px) {
            width: 170px;
            height: 170px;
          }

          @media (max-width: 445px) {
            width: 160px;
            height: 160px;
            /* height: 180px; */
          }
          @media (max-width: 425px) {
            width: 130px;
            height: 130px;
            /* height: 180px; */
          }
        `}
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
    </AtomButton>
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
