import { PropsLayout } from '@Components/layout'

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

declare module 'next' {
  import { ReactNode } from 'react'
  import { NextPage } from 'next'
  export declare type Layout = (page: ReactNode) => ReactNode
  export declare type NextPageFC<p> = NextPage<p> & PropsLayout
  export declare type NextPageFCProps = NextPage & PropsLayout
}

declare module 'react-color-extractor' {
  import { FC } from 'react'
  export const ColorExtractor: FC<{
    src: string
    getColors: (colors: string[]) => void
  }>
  export default ColorExtractor
}

declare module 'next/app' {
  export declare type AppPropsWithLayout<P = any> = AppInitialProps & {
    Component: NextComponentType<NextPageContext, any, P> & PropsLayout
    router: Router
    __N_SSG?: boolean | undefined
    __N_SSP?: boolean | undefined
  }
}
