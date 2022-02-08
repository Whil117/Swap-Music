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

const SwapPage = () => {
  const user = useSelector(Selector)

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
      <div>
        <List
          Elements={({ show, setShow }) => (
            <Div
              styles={{
                width: '100%',
                flexdirection: 'row',
                justifycontent: 'space-between',
              }}
            >
              <h2>Top Artists</h2>
              <Button
                props={{ type: 'submit', style: { padding: '5px' } }}
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
                {user.TopArtists.items?.map((artist) => (
                  <CardArtist key={artist.id} {...artist} />
                ))}
              </Cards>
            </>
          )}
        </List>
      </div>
      <div>
        <List
          Elements={({ show, setShow }) => (
            <Div
              styles={{
                width: '100%',
                flexdirection: 'row',
                justifycontent: 'space-between',
              }}
            >
              <h2>Your favorite artists</h2>
              <Button
                props={{ type: 'submit', style: { padding: '5px' } }}
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
                {user.followedArtists.artists.items?.map((artist) => (
                  <CardArtist key={artist.id} {...artist} />
                ))}
              </Cards>
            </>
          )}
        </List>
      </div>
      <div>
        <List
          Elements={({ show, setShow }) => (
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
