import { useMutation, useQuery } from '@apollo/client'
import { CREATEARTIST } from '@Apollo/client/mutations/Artist'
import { ARTISTBYID } from '@Apollo/client/querys/artist'
import AtomLoader from '@Components/@atoms/AtomLoader'
import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomButton from 'lib/Atombutton'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
type Props = {
  color: string
  Artist: SpotifyApi.SingleArtistResponse
}

const SwapArtist: FC<Props> = (props) => {
  const user = useSelector((state: SelectFor) => state.user.me.id)
  const verifyAdmin = process.env.NEXT_PUBLIC_ADMIN === user
  const {
    data: dataArtist,
    refetch,
    loading: LoadingArtist,
  } = useQuery(ARTISTBYID, {
    skip: !props?.Artist?.id,
    variables: { id: props?.Artist?.id },
  })
  const [EXECUTECREATEARTIST, { loading }] = useMutation(CREATEARTIST, {
    onCompleted: () => {
      toast.success('Artist created successfully')
      refetch()
    },
  })
  return (
    <>
      {verifyAdmin && (
        <>
          {LoadingArtist || loading ? (
            <AtomLoader
              type="small"
              colorPrimary={props?.color}
              colorSecondary="white"
              css={css`
                width: 120px;
              `}
            />
          ) : (
            <AtomButton
              width="120px"
              padding="5px"
              color="white"
              fontWeight="bolder"
              backgroundColor={
                dataArtist?.artistById?.id ? colors.green_light : props?.color
              }
              onClick={() => {
                if (!dataArtist?.artistById?.id) {
                  EXECUTECREATEARTIST({
                    variables: {
                      input: {
                        id: props?.Artist?.id,
                        name: props?.Artist?.name,
                        images: props?.Artist?.images,
                        href: props?.Artist?.external_urls.spotify,
                        type: props?.Artist?.type,
                        uri: props?.Artist?.uri,
                        followers: props?.Artist?.followers.total,
                        popularity: props?.Artist?.popularity,
                        genres: props?.Artist?.genres,
                      },
                    },
                  })
                }
              }}
            >
              {dataArtist?.artistById?.id ? 'Update' : 'Add'}
            </AtomButton>
          )}
        </>
      )}
    </>
  )
}

export default SwapArtist
