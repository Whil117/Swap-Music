import { useState } from 'react'
import { useSelector } from 'react-redux'
import Selector from '@Types/redux/reducers/user/types'
import { Cards } from '@Styles/components/Cards'
import CardArtist from '@Components/Cards/Artist'

const SwapPage = () => {
  const [show, setShow] = useState<boolean>(false)
  const user = useSelector(Selector)

  return (
    <div>
      <h2>Top Artists</h2>
      <button onClick={() => setShow(!show)}>Click</button>
      <Cards {...{ show }}>
        {user.followedArtists.items?.map((artist) => (
          <CardArtist key={artist.id} {...artist} />
        ))}
      </Cards>
    </div>
  )
}

export default SwapPage
