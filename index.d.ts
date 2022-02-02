/* eslint-disable no-unused-vars */
declare module 'redux-persist/es/persistStore' {
  import { Store, Action, AnyAction } from 'redux'
  import { PersistorOptions, Persistor } from 'redux-persist/es/types'

  export default function persistStore(
    store: Store,
    persistorOptions?: PersistorOptions | null,
    callback?: () => any
  ): Persistor
  export default function persistStore<
    S = any,
    A extends Action<any> = AnyAction
  >(
    store: Store<S, A>,
    persistorOptions?: PersistorOptions | null,
    callback?: () => any
  ): Persistor
}
