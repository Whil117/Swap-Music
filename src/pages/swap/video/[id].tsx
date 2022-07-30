/* eslint-disable no-unused-vars */
import { controlsAtom } from '@Components/Navbar/player'
import { progressBarAtom } from '@Components/Navbar/player/progressbar'
import { css } from '@emotion/react'
import useSetRef from '@Hooks/useSetRef'
import { PLAYATOM } from '@Redux/reducers/player/controls'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'
import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'

export const videoRefAtom = atom(
  {} as MutableRefObject<HTMLVideoElement | undefined>
)

const TIMELAGGED = 0.8

const VideoById: NextPageFCProps = () => {
  const controls = useAtomValue(controlsAtom)
  const playSong = useAtomValue(PLAYATOM)
  const playerAudioTime = useAtomValue(progressBarAtom)
  const videoref = useRef<HTMLVideoElement>()
  const setVideoRef = useSetAtom(videoRefAtom)
  useSetRef<MutableRefObject<HTMLVideoElement | undefined>>(
    videoref as any,
    setVideoRef
  )
  useEffect(() => {
    if (videoref.current) {
      if (playSong) {
        videoref.current.play()
        if (videoref.current.currentTime !== playerAudioTime) {
          videoref.current.currentTime = playerAudioTime + TIMELAGGED
        }
      } else {
        videoref.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (videoref.current) {
      if (playSong) {
        videoref.current.play()
        if (videoref.current.currentTime !== playerAudioTime) {
          videoref.current.currentTime = playerAudioTime + TIMELAGGED
        }
      } else {
        if (videoref.current.currentTime !== playerAudioTime) {
          videoref.current.currentTime = playerAudioTime + TIMELAGGED
        }
        videoref.current.pause()
      }
    }
  }, [playSong])

  return (
    <AtomWrapper
      css={css`
        margin-top: 85px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      `}
    >
      <AtomWrapper
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 1rem;
        `}
      >
        <AtomText fontSize="26px" fontWeight="bold">
          {controls.player?.currentTrack.name} -{' '}
          {controls.player?.currentTrack.artists.map((artist, index) =>
            index === 0 ? `${artist.name}` : `, ${artist.name}`
          )}
        </AtomText>
        {/* <AtomWrapper id="video-player"></AtomWrapper> */}
        <video
          width="1075"
          height="600"
          ref={videoref as LegacyRef<HTMLVideoElement> | undefined}
          autoPlay
        >
          <source
            src={
              controls.player?.currentTrack.youtube_video ??
              'https://rr4---sn-upbvbu-b05y.googlevideo.com/videoplayback?expire=1659095222&ei=VnTjYrviKsSU4QSRr77oCQ&ip=181.174.106.181&id=o-ANvL2CvY8iROhbGbFKflCdzkemawfTWA4RjN4Vechvqi&itag=313&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313%2C394%2C395%2C396%2C397%2C398%2C399%2C400%2C401&source=youtube&requiressl=yes&mh=b-&mm=31%2C29&mn=sn-upbvbu-b05y%2Csn-hp57yne7&ms=au%2Crdu&mv=m&mvi=4&pl=24&initcwndbps=972500&spc=lT-KhuJis3XLi9YOR8GjGeBOrv8vd1k&vprv=1&mime=video%2Fwebm&ns=Hop2_S5gNdbi7zKeUUSQb8cH&gir=yes&clen=383310106&dur=189.021&lmt=1652279494610048&mt=1659073258&fvip=3&keepalive=yes&fexp=24001373%2C24007246&c=WEB&rbqsm=fr&txp=4532434&n=Q_yZNyAAdl-E9A&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgeKZ07AfcQGrPl246jHF7flNEd01uNrmsEZEx9T7I9dUCIQCSWv2ItjJtZLpkt6tiNDtR-yEpZ21Wt3TM6QYEwcfkfA%3D%3D&sig=AOq0QJ8wRAIgJP2SW6D8ImN_jIM_IEjVeYvHSKnT4y18WQk-04KFUaoCIANdeIiw83-vTxysfUC9htwX123vxxBHg7ZVhiAMMo6y'
            }
          />
        </video>
      </AtomWrapper>
    </AtomWrapper>
  )
}
VideoById.Layout = 'swap'

export default VideoById
