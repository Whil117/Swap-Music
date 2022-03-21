import Card from '@Components/Cards/Card'
import List from '@Components/List'
import { Cards } from '@Styles/components/Cards'
import { WrapperPages } from '@Styles/pages/swap'
import Selector from '@Types/redux/reducers/user/types'
import Greetings from '@Utils/greetings'
import Button from '@Whil/components/Button'
import Div from '@Whil/components/Div'
import Svg from '@Whil/components/Svg'
import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'

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
    <WrapperPages>
      <div>
        <h1>
          {Greetings()} - {user.me?.display_name}!
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
                    <Card
                      key={artist.id}
                      {...{
                        id: artist.id,
                        type: artist.type,
                        image: artist.images[0].url,
                        name: artist.name,
                      }}
                    />
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
                  <Card
                    key={artist.album.id}
                    {...{
                      id: artist.album.id,
                      type: artist.album.type,
                      image: artist.album.images[0].url,
                      name: artist.album.name,
                    }}
                  />
                ))}
              </Cards>
            </>
          )}
        </List>
      </div>
    </WrapperPages>
  )
}

export default SwapPage
