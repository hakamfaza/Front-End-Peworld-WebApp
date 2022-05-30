import { NextResponse } from 'next/server';

export default function middleware(req) {
  const { token } = req.cookies;
  const { isRecruiter } = req.cookies;

  const { pathname, origin } = req.nextUrl;
  if (
    !token &&
    pathname !== '/login' &&
    pathname !== '/register' &&
    pathname !== '/register/worker' &&
    pathname !== '/register/recruiter' &&
    pathname !== '/'
  ) {
    return NextResponse.redirect(`${origin}/login`);
  } else if (isRecruiter === 'true' && pathname === '/profile') {
    return NextResponse.redirect(`${origin}/profile/recruiter`);
  } else if (isRecruiter !== 'true' && pathname === '/profile/recruiter') {
    return NextResponse.redirect(`${origin}/profile`);
  } else if (isRecruiter !== 'true' && pathname === '/home/recruiter') {
    return NextResponse.redirect(`${origin}/home`);
  } else if (isRecruiter === 'true' && pathname === '/home') {
    return NextResponse.redirect(`${origin}/home/recruiter`);
  } else if (isRecruiter === 'true' && pathname === '/profile/edit') {
    return NextResponse.redirect(`${origin}/profile/editrecruiter`);
  } else if (isRecruiter !== 'true' && pathname === '/profile/editrecruiter') {
    return NextResponse.redirect(`${origin}/profile/edit`);
  }
}
