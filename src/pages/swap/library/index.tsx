import { FC } from 'react'
import Selector from '@Types/redux/reducers/user/types'
import { useSelector } from 'react-redux'
import Div from '@Whil/components/Div'
import Button from '@Whil/components/Button'
import P from '@Whil/components/P'
import Card from '@Components/Cards/Card'
type Props = {}

const Library: FC<Props> = () => {
  const user = useSelector(Selector)

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
                  textAlign: 'initial',
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

export default Library
