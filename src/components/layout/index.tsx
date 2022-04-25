import { NextRouter } from 'next/router'
import { createContext, FC, ReactNode, RefObject } from 'react'
import { ToastContainer } from 'react-toastify'
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
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        // hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
      <GetLayout {...props}>{children}</GetLayout>
    </>
  )
}

export default Layout
