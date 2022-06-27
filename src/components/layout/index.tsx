import { FC, ReactNode } from 'react'
import LayoutDashboard from './admin'
import Public from './public'
import SwapUser from './swap'

const Layouts = {
  swap: SwapUser,
  dashboard: LayoutDashboard,
  public: Public,
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}

export type PropsLayout = {
  children?: ReactNode
  Layout: keyof typeof Layouts
  SEO?: {
    title?: string
    image?: string
    keywords?: string[]
    description?: string
  }
}

const Layout: FC<PropsLayout> = (props) => {
  const { Layout, children } = props
  const GetLayout = Layouts[Layout || 'default']
  return <GetLayout {...props}>{children}</GetLayout>
}

export default Layout
