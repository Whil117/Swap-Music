import List from '@Components/List'
import CardArtist from '@Components/Cards/Artist'
import { Cards } from '@Styles/components/Cards'
import Selector from '@Types/redux/reducers/user/types'
import Greetings from '@Utils/greetings'
import { useSelector } from 'react-redux'
import Button from '@Whil/components/Button'
import Svg from '@Whil/components/Svg'
import Div from '@Whil/components/Div'
import CardAlbum from '@Components/Cards/Album'
import { Dispatch, SetStateAction } from 'react'

const SwapPage = () => {
  const user = useSelector(Selector)

  const data = [
    {
      id: '1',
      title: 'New Releases',
      assets: user.NewReleases.albums.items,
    },
    {
      id: '2',
      title: 'Top Artists',
      assets: user.TopArtists.items,
    },
    {
      id: '3',
      title: 'Your favorite artists',
      assets: user.followedArtists.artists.items,
    },
  ]

  return (
    <Div
      styles={{
        margin: '60px 0 0 60px',
        alignitems: 'flex-start',
      }}
    >
      <div>
        <h1>
          {Greetings()} - {user.me?.name}!
        </h1>
      </div>
      {data.map((item) => (
        <div key={item.id}>
          <List
            Elements={({
              show,
              setShow,
            }: {
              show: boolean
              setShow: Dispatch<SetStateAction<boolean>>
            }) => (
              <Div
                styles={{
                  width: '100%',
                  flexdirection: 'row',
                  justifycontent: 'space-between',
                }}
              >
                <h2>{item.title}</h2>
                <Button
                  props={{ type: 'submit', style: { padding: '5px ' } }}
                  click={() => setShow(!show)}
                >
                  <Svg src="/icons/list" />
                </Button>
              </Div>
            )}
          >
            {({ show }: { show: boolean }) => (
              <>
                <Cards {...{ show }}>
                  {item.assets?.map((artist) => (
                    <CardArtist key={artist.id} {...artist} />
                  ))}
                </Cards>
              </>
            )}
          </List>
        </div>
      ))}
      <div>
        <List
          Elements={({
            show,
            setShow,
          }: {
            show: boolean
            setShow: Dispatch<SetStateAction<boolean>>
          }) => (
            <Div
              styles={{
                width: '100%',
                flexdirection: 'row',
                justifycontent: 'space-between',
              }}
            >
              <h2>Today's suggestions</h2>
              <Button
                props={{ type: 'submit', style: { padding: '5px ' } }}
                click={() => setShow(!show)}
              >
                <Svg src="/icons/list" />
              </Button>
            </Div>
          )}
        >
          {({ show }: { show: boolean }) => (
            <>
              <Cards {...{ show }}>
                {user.SavedAlbums.items?.map((artist) => (
                  <CardAlbum key={artist.album.id} {...artist} />
                ))}
              </Cards>
            </>
          )}
        </List>
      </div>
    </Div>
  )
}

export default SwapPage
