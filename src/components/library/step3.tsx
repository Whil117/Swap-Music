import Card from '@Components/Cards/Card'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { useSelector } from 'react-redux'

const Step3: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  return (
    <AtomWrapper
      width="100%"
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <AtomWrapper
        maxWidth="1440px"
        css={css`
          margin-top: 65px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 10px;
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
    </AtomWrapper>
  )
}

export default Step3
