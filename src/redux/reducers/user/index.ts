export type State = {
  followedArtists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>
}

const TypesReducers = {
  HIDRATATION: (state: State, payload: State) => ({
    ...state,
    followedArtists: payload.followedArtists,
  }),
}

type Action = {
  type: keyof typeof TypesReducers
  payload: any
}

const reducer = (state = {}, action: Action) => {
  const { type, payload } = action
  const handler = TypesReducers[type]
  const newState = handler ? handler(state as State, payload) : state
  return newState
}
export default reducer
