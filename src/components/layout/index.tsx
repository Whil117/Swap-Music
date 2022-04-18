import { NextRouter } from 'next/router'
import { createContext, FC, ReactNode, RefObject } from 'react'
import LayoutDashboard from './admin'
import SwapPublic from './public'

const Layouts = {
  swap: SwapPublic,
  dashboard: LayoutDashboard,
}

export type PropsLayout = {
  router?: NextRouter
  children?: ReactNode
  hidratation?: boolean
  accessToken?: string
  Layout: keyof typeof Layouts
}

type ContextScroll = {
  view: RefObject<HTMLDivElement>
}

export const ContextScroll = createContext<ContextScroll>({} as ContextScroll)

const Layout: FC<PropsLayout> = (props) => {
  const { Layout, children } = props
  const GetLayout = Layouts[Layout || 'default']
  return <GetLayout {...props}>{children}</GetLayout>
}

export default Layout
