import { NextResponse } from 'next/server'

export async function middleware() {
  if (process.env.KEYDASHBOARD) {
    return NextResponse.next()
  }
  return NextResponse.rewrite('/swap')
}
