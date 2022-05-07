import Card from '@Components/Cards/Card'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { useSelector } from 'react-redux'

const Step2: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  return (
    <AtomWrapper
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {user?.followedArtists?.artists?.items.map((artist) => (
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
    </AtomWrapper>
  )
}

export default Step2
