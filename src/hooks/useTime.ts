import { useEffect, useState } from 'react'

type Tracks = {
  duration_ms: number
}

export type UseTimeProps = { tracks?: Tracks[]; ms?: number }

const useTime = ({ tracks, ms }: UseTimeProps) => {
  const [[hours, minutes, seconds], setTime] = useState<number[]>([])

  useEffect(() => {
    if (tracks) {
      const ms = tracks.reduce(
        (acc: number, curr: Tracks) => acc + curr.duration_ms,
        0
      )
      const hours = Math.floor(ms / 3600000)
      const minutes = Math.floor(ms / 60000) - hours * 60
      const seconds = Math.round((ms % 60000) / 1000)
      setTime([hours, minutes, seconds])
    }
    if (ms) {
      const hours = Math.floor(ms / 3600000)
      const minutes = Math.floor(ms / 60000) - hours * 60
      const seconds = Math.round((ms % 60000) / 1000)
      setTime([hours, minutes, seconds])
    }
  }, [tracks, ms])
  return [hours, minutes, seconds]
}
export default useTime
