import { controlsAtom } from '@Components/Navbar/player'
import { css } from '@emotion/react'
import { colorsAtom } from '@Hooks/UseColor'
import isBackDark from '@Utils/isBackDark'
import { useAtomValue } from 'jotai'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'

const Lyrics: NextPageFCProps = () => {
  const controls = useAtomValue(controlsAtom)
  const colorBackground = useAtomValue(colorsAtom)
  return (
    <AtomWrapper padding="45px" backgroundColor={colorBackground[0] as string}>
      <AtomText fontWeight="bold" fontSize="30px">
        Lyrics - {controls?.player?.currentTrack?.name}
      </AtomText>
      <AtomWrapper
        css={css`
          margin-top: 20px;
          font-family: 'Open Sans', sans-serif;
          font-size: 2rem;
          color: ${isBackDark(colorBackground[0] as string)};
        `}
        dangerouslySetInnerHTML={{
          __html: controls.player?.currentTrack?.lyrics?.replace(
            /(?:\r\n|\r|\n)/g,
            '<br>'
          ) as string,
        }}
      ></AtomWrapper>
    </AtomWrapper>
  )
}
Lyrics.Layout = 'swap'
export default Lyrics
