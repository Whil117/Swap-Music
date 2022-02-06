/* eslint-disable import/no-anonymous-default-export */
import { State } from '@Redux/reducers/user'

type Selector = {
  user: State
}
export default (state: Selector) => state.user
