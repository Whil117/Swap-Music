/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import { useSetAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useRouter } from 'next/router'
import { countReducerAtom } from 'pages/swap'
import { FC } from 'react'

type Card = {
  id: string
  type: string
  image: string
  name: string
  customUrl?: {
    pathname: string
    query?: {
      [key: string]: string
    }
  }
}

const ImageTypes = ['album', 'track', 'playlist']
const AtomCard: FC<Card> = (props) => {
  const router = useRouter()
  const setRecent = useSetAtom(countReducerAtom)
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
          .push(
            props?.customUrl ?? {
              pathname: `/swap/${props.type}/[id]`,
              query: {
                id: props.id,
              },
            }
          )
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
        justify-content: flex-start;
        color: ${colors.white};
        padding: 10px;
        background-color: ${colors.black_quinary};
        border-radius: 5px;
        width: 197px;
        height: 264px;
        &:hover {
          box-shadow: 0px 0px 10px #0000007f;
          background: ${colors.black_quaternary};
        }
        @media (max-width: 520px) {
          width: 190px;
          height: 240px;
          margin: 0px;
          /* height: 180px; */
        }
        @media (max-width: 465px) {
          width: 180px;
          /* height: 180px; */
        }
        @media (max-width: 445px) {
          width: 150px;
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
            width: -webkit-fill-available;
            height: 170px;
          }

          @media (max-width: 445px) {
            width: -webkit-fill-available;
            height: 130px;
            /* height: 180px; */
          }
          @media (max-width: 425px) {
            width: -webkit-fill-available;
            height: 130px;
            /* height: 180px; */
          }
        `}
      />
      <AtomWrapper padding="10px 0px">
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
      </AtomWrapper>
    </AtomButton>
  )
}

export default AtomCard
