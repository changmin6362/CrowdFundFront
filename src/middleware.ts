import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './constants/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // 관리자 페이지 접근 제어
  if (pathname.startsWith(ROUTES.ADMIN.CATEGORY)) {
    if (!accessToken) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }
    
    // TODO: JWT 디코딩을 통해 role이 ADMIN인지 확인하는 로직 추가 가능
    // 현재는 토큰 유무만 체크 (서버 API에서 403으로 한 번 더 걸러짐)
  }

  // 인증이 필요한 일반 사용자 페이지 접근 제어
  const authRequiredPaths = [ROUTES.MY_PAGE, ROUTES.MY_PAGE_ADDRESS];
  if (authRequiredPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }
  }

  // 이미 로그인된 사용자가 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  const authPaths = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.SIGNUP];
  if (authPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    if (accessToken) {
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    '/category/:path*',
    '/my-page/:path*',
    '/login',
    '/signup',
  ],
};
