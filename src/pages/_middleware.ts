import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
export default async function middleware(req: any) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET as string,
  })
  const { pathname } = req.nextUrl

  // if (pathname === '/' && °token) {
  //   return NextResponse.redirect('/swap')
  // }
  // if (pathname.includes('/api/auth') || token) return NextResponse.next()
  const url = req.nextUrl.clone()
  url.pathname = '/'
  if (pathname.includes('/swap') && !token) {
    return NextResponse.redirect(url.toString())
  }
}
