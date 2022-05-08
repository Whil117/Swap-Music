import Card from '@Components/Cards/Card'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Div from '@Whil/components/Div'
import P from '@Whil/components/P'
import Atombutton from 'lib/Atombutton'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'

const Step1: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const router = useRouter()
  return (
    <AtomWrapper>
      <AtomText as="h2">Playlists</AtomText>
      <AtomWrapper
        css={css`
            display: flex;
            flex-wrap: wrap;
            /* align-items: center; */

            aign-items: flex-start;
            @media (max-width: 712px) {
              justify-content: center;8
            }
          `}
      >
        <Atombutton
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
        </Atombutton>
        {user.Playlists.items.map((item) => (
          <Card
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
