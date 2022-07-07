import AtomCard from '@Components/@atoms/AtomCard'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { useSelector } from 'react-redux'

const Step1: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  // const router = useRouter()
  return (
    <AtomWrapper>
      <AtomWrapper
        css={css`
          margin-top: 65px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 10px;
          @media (max-width: 712px) {
            justify-content: center;
          }
        `}
      >
        {/* <AtomButton
          css={css`
            width: 420px;
            height: 264px;
            background: url('https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2Faaaaaaaaaaaasdfdsf.png?alt=media&token=f9280477-cdcc-461b-b963-1a787e127fd8');
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            margin: 10px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: end;
          `}
          onClick={() => router.push('/swap/likedsongs')}
        >
          <Div
            styles={{
              boxshadow: 'a',
              flexdirection: 'column',
              justifycontent: 'end',
              alignitems: 'baseline',
            }}
          >
            <P
              styles={{
                fontSize: '32px',
                fontWeight: 'bold',
                margin: '10px 0',
              }}
            >
              Liked Songs
            </P>
            <P
              styles={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '400',
                textalign: 'initial',
              }}
            >
              {user.SavedTracks.total} Liked Songs
            </P>
          </Div>
        </AtomButton> */}
        {user.Playlists.items.map((item) => (
          <AtomCard
            key={item.id}
            {...{
              id: item.id,
              type: item.type,
              image: item?.images[0]?.url,
              name: item.name,
            }}
          />
        ))}
      </AtomWrapper>
    </AtomWrapper>
  )
}

export default Step1
