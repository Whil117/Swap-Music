import { colorBanner, titleBanner } from '@Components/@organisms/OrganismBanner'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import { atom, useAtom } from 'jotai'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

const scrollAtom = atom<number>(0)

export const stepsId = atom('Playlists')

const validPathsSongs = ['album', 'artist', 'playlist', 'likedsongs', 'profile']

const AtomBarScroll: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const [colors] = useAtom(colorBanner)
  const [scrollPosition, setScrollPosition] = useAtom(scrollAtom)
  const [steps, setSteps] = useAtom(stepsId)
  const [title] = useAtom(titleBanner)
  const router = useRouter()

  useEffect(() => {
    if (validPathsSongs.includes(router.pathname.split('/')[2])) {
      document?.getElementById('view')?.addEventListener(
        'scroll',
        () => {
          setScrollPosition(
            document?.getElementById('view')?.scrollTop as number
          )
        },
        { passive: true }
      )
    }

    return () => {
      if (validPathsSongs.includes(router.pathname.split('/')[2])) {
        document?.getElementById('view')?.removeEventListener('scroll', () => {
          setScrollPosition(
            document?.getElementById('view')?.scrollTop as number
          )
        })
      }
    }
  }, [router.pathname])

  return (
    <AtomWrapper
      css={css`
        ${validPathsSongs.includes(router.pathname.split('/')[2]) &&
        scrollPosition >= 280 &&
        css`
          background: ${colors[0]};
        `}
        padding: 10px 20px;
        display: flex;
        justify-content: ${router.asPath.includes('swap/library')
          ? 'space-between'
          : validPathsSongs.includes(router.pathname.split('/')[2]) &&
            scrollPosition >= 280
          ? 'space-between'
          : 'flex-end'};
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 2;
      `}
    >
      {router.asPath.includes('swap/library') && (
        <AtomWrapper
          css={css`
            display: flex;
          `}
        >
          {['Playlists', 'Podcasts', 'Artists', 'Albums'].map((step, index) => (
            <Atombutton
              key={step + index}
              onClick={() => {
                setSteps(step)
              }}
              css={css`
                border-radius: 5px;
                color: white;
                font-weight: bold;
                padding: 10px;
                background-color: ${steps === step
                  ? 'rgba(255,255,255,0.25)'
                  : 'transparent'};
              `}
            >
              {step}
            </Atombutton>
          ))}
        </AtomWrapper>
      )}
      {validPathsSongs.includes(router.pathname.split('/')[2]) &&
        scrollPosition >= 280 && (
          <AtomText
            as="p"
            fontSize="24px"
            css={css`
              @media (max-width: 768px) {
                font-size: 18px;
              }
              @media (max-width: 480px) {
                font-size: 14px;
              }
            `}
          >
            {title}
          </AtomText>
        )}
      <Link
        href={{
          pathname: '/swap/profile',
        }}
        passHref
      >
        <AtomWrapper as="a">
          <AtomImage
            src={
              (user?.me?.images[0]?.url as string) ||
              'https://via.placeholder.com/150/92c952'
            }
            alt={user?.me?.display_name as string}
            width={50}
            height={50}
            borderRadius="50%"
          />
        </AtomWrapper>
      </Link>
    </AtomWrapper>
  )
}

export default AtomBarScroll
