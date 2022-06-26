type Tracks = {
  duration_ms: number
}

export type UseTimeProps = { tracks?: Tracks[]; ms?: number }

const convertMsToTime = (ms: number) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor(ms / 60000) - hours * 60
  const seconds = Math.round((ms % 60000) / 1000)
  return [hours, minutes, seconds]
}
const useTime = ({ tracks, ms }: UseTimeProps) => {
  const tracksMs = tracks?.reduce(
    (acc: number, curr: Tracks) => acc + curr.duration_ms,
    0
  )
  const returnMs = convertMsToTime(tracksMs || (ms as number))
  return returnMs
}
export default useTime
