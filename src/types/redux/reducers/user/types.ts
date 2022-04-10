/* eslint-disable import/no-anonymous-default-export */
import { Loding } from '@Redux/reducers/loading'
import { State } from '@Redux/reducers/user'

export type SelectFor = {
  user: State
  loading: Loding
}

export type IQueryFilter<T extends keyof SelectFor> = Pick<SelectFor, T>
const selectors =
  (params: keyof SelectFor) => (state: IQueryFilter<typeof params>) =>
    state[params] as unknown as IQueryFilter<typeof params>

export default selectors
