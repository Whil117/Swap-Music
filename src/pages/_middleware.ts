import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
export default async function middleware(req: any) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET as string,
  })
  // const { pathname } = req.nextUrl

  // if (token) {
  //   return NextResponse.next()
  // } else if (pathname.includes('/swap') && !token) {
  //   const url = req.nextUrl.clone()
  //   url.pathname = '/'
  //   return NextResponse.redirect(url.toString())
  // }
  // if (pathname.includes('/api/auth') || token) return NextResponse.next()
}
