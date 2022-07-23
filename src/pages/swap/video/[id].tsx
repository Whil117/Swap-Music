/* eslint-disable no-unused-vars */
import { controlsAtom } from '@Components/Navbar/player'
import { volumenAtom } from '@Components/Navbar/player/volumen.bar'
import { PLAYATOM } from '@Redux/reducers/player/controls'
import { useAtom, useAtomValue } from 'jotai'
import { NextPageFCProps } from 'next'
import { useEffect } from 'react'
import YTPlayer from 'yt-player'
const VideoById: NextPageFCProps = () => {
  const controls = useAtomValue(controlsAtom)
  const volumen = useAtomValue(volumenAtom)
  const [playSong, setPlaySong] = useAtom(PLAYATOM)

  useEffect(() => {
    const player = new YTPlayer('#player')

    player.load(controls.player?.currentTrack.youtube_id as string)
    player.play()
    player.setVolume(volumen)
    if (playSong) {
      player.stop()
    } else {
      player.play()
    }
  }, [controls, volumen])

  return (
    <div>
      <h1>VideoById</h1>
      <div id="player"></div>
    </div>
  )
}
VideoById.Layout = 'swap'

export default VideoById
