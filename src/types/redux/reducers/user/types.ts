/* eslint-disable import/no-anonymous-default-export */
import { Loding } from '@Redux/reducers/loading'
import { PropsPlayerTracks } from '@Redux/reducers/player'
import { State } from '@Redux/reducers/user'

export type SelectFor = {
  user: State
  loading: Loding
  playerTracks: PropsPlayerTracks
}
