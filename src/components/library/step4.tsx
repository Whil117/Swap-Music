import Card from '@Components/Cards/Card'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { useSelector } from 'react-redux'

const Step4: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  return (
    <AtomWrapper
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 65px;
        gap: 10px;
      `}
    >
      {user?.SavedAlbums?.items?.map((artist) => (
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
    </AtomWrapper>
  )
}

export default Step4
