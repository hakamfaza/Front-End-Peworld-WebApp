import { NextResponse } from 'next/server'

export default function middleware(req) {
  const {token} = req.cookies;
  console.log(token)
  const { pathname, origin } = req.nextUrl
  if (!token && pathname !== '/login' && pathname !== '/register/worker' && pathname !== '/register/recruiter' && pathname !== '/') {
    return NextResponse.redirect(`${origin}/login`)
  }
}
