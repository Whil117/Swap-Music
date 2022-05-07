import Card from '@Components/Cards/Card'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Button from '@Whil/components/Button'
import Div from '@Whil/components/Div'
import P from '@Whil/components/P'
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
        <Button
          click={() => router.push('/swap/likedsongs')}
          props={{
            type: 'submit',
            style: {
              justifycontent: 'flex-start',
              alignitems: 'flex-end',
              width: '420px',
              height: '284px',
            },
          }}
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
        </Button>
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
