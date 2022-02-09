import { Session } from 'next-auth'

export type State = {
  followedArtists: {
    artists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>
  }
  me: Session['user']
  Playlists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.PlaylistObjectSimplified>
  TopArtists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>
  SavedAlbums: SpotifyApi.CursorBasedPagingObject<SpotifyApi.SavedAlbumObject>
  NewReleases: SpotifyApi.ListOfNewReleasesResponse
  SavedTracks: SpotifyApi.CursorBasedPagingObject<SpotifyApi.SavedTrackObject>
}

const TypesReducers = {
  HIDRATATION: (state: State, payload: State) => ({
    ...payload,
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
