import Card from '@Components/Cards/Card'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Button from '@Whil/components/Button'
import Div from '@Whil/components/Div'
import P from '@Whil/components/P'
import { NextPageFCProps } from 'next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const Library: NextPageFCProps = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const router = useRouter()

  return (
    <Div
      styles={{
        margin: '60px 0 0 60px',
        alignitems: 'flex-start',
      }}
    >
      <h1>Library</h1>
      <div>
        <h2>Playlists</h2>
        <Div
          styles={{
            justifycontent: 'flex-start',
            flexdirection: 'row',
            flexwrap: 'wrap',
          }}
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
        </Div>
      </div>
    </Div>
  )
}
Library.Layout = 'swap'

export default Library
