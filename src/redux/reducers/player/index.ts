/* eslint-disable no-unused-vars */
export type Track = {
  id: string
  name: string
  image: string
  track: string
  artist: {
    name: string
    id: string
  }[]
}
export type PropsPlayerTracks = {
  currentTrackId?: string
  tracks?: SpotifyApi.TrackObjectSimplified[] | SpotifyApi.PlaylistTrackObject[]
  play?: boolean
  position?: number
}

type typesReducers = {
  [key: string]: (
    state: PropsPlayerTracks | {},
    payload: PropsPlayerTracks
  ) => PropsPlayerTracks
}
const typesReducers: typesReducers = {
  SETPLAYERTRACKS: (state, payload) => ({
    ...state,
    currentTrackId: payload.currentTrackId,
    tracks: payload.tracks,
    position: payload.position,
    play: payload.play,
  }),
  SETPLAY: (state, payload) => ({
    ...state,
    play: payload.play,
  }),
}

export type ActionPlayerTracks = {
  type: keyof typeof typesReducers
  payload: PropsPlayerTracks
}

const reducer = (
  state = {
    currentTrackId: '',
    tracks: [],
    position: 0,
    play: false,
  },
  action: ActionPlayerTracks
) => {
  const { type, payload } = action
  const handler = typesReducers[type]
  const newState = handler ? handler(state, payload) : state
  return newState
}

export default reducer
