import { FC, ReactNode } from 'react'
import LayoutDashboard from './admin'
import SwapPublic from './public'

const Layouts = {
  swap: SwapPublic,
  dashboard: LayoutDashboard,
  public: ({ children }: { children: ReactNode }) => <>{children}</>,
}

export type PropsLayout = {
  children?: ReactNode
  Layout: keyof typeof Layouts
  SEO?: {
    title?: string
    image?: string
    keywords?: string[]
  }
}

const Layout: FC<PropsLayout> = (props) => {
  const { Layout, children } = props
  const GetLayout = Layouts[Layout || 'default']
  return <GetLayout {...props}>{children}</GetLayout>
}

export default Layout
