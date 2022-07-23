import { controlsAtom } from '@Components/Navbar/player'
import { useAtomValue } from 'jotai'
import { NextPageFCProps } from 'next'
import { useEffect } from 'react'
import YTPlayer from 'yt-player'

const VideoById: NextPageFCProps = () => {
  const controls = useAtomValue(controlsAtom)

  useEffect(() => {
    const player = new YTPlayer('#player')
    player.load('GKSRyLdjsPA')
    player.setVolume(100)

    player.on('playing', () => {
      console.log(player.getDuration()) // => 351.521
    })
  }, [])

  return (
    <div>
      <h1>VideoById</h1>
      <div id="player"></div>
    </div>
  )
}
VideoById.Layout = 'swap'

export default VideoById
