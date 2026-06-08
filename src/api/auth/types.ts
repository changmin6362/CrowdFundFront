/**
 * 회원가입 요청 정보
 */
export interface SignUpRequest {
  /** 이메일 (최대 50자) */
  email: string;
  /** 비밀번호 (8자 이상, 영문, 숫자, 특수문자 포함) */
  password: string;
  /** 닉네임 (최대 12자) */
  nickname: string;
  /** 이름 (최대 6자) */
  name: string;
  /** 전화번호 (예: 010-1234-5678) */
  phone: string;
}

/**
 * 로그인 요청 정보
 */
export interface LoginRequest {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
}

/**
 * 유저 프로필 정보
 */
export interface UserProfileInfo {
  /** 유저 이메일 */
  email: string;
  /** 유저 닉네임 */
  nickname: string;
}

/**
 * 로그인 응답 정보
 */
export interface LoginResponse {
  /** Access Token */
  accessToken: string;
  /** 토큰 타입 (기본값: Bearer) */
  tokenType: string;
  /** 유저 상세 정보 */
  userInfo: UserProfileInfo;
}