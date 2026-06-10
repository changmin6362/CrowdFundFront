import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './constants/routes';
import { decodeJwt } from 'jose';
import { UserRole } from "@api/user/types";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // 관리자 페이지 접근 제어
  if (pathname.startsWith(ROUTES.ADMIN.CATEGORY)) {
    if (!accessToken) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }
    
    try {
      // JWT 디코딩을 통해 role이 ADMIN인지 확인
      const payload = decodeJwt(accessToken);

      const role = payload.auth as string;
      
      if (role !== UserRole.ADMIN) {
        // 관리자가 아니면 홈으로 리다이렉트
        return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
      }
    } catch (error) {
      // 토큰이 유효하지 않으면 쿠키 삭제 후 로그인 페이지로 리다이렉트
      console.error('올바른 JWT 토큰이 아닙니다 : ', error);
      const response = NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
      response.cookies.set('accessToken', '', { path: '/', maxAge: 0 });
      return response;
    }
  }

  // 인증이 필요한 일반 사용자 페이지 접근 제어
  const authRequiredPaths = [ROUTES.MY_PAGE, ROUTES.CREATOR.MY_PROJECTS];
  if (authRequiredPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }

    try {
      decodeJwt(accessToken);
    } catch (error) {
      console.error('만료되었거나 올바르지 않은 토큰입니다:', error);
      const response = NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
      response.cookies.set('accessToken', '', { path: '/', maxAge: 0 });
      return response;
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
    '/creator/:path*',
    '/login',
    '/signup',
  ],
};
