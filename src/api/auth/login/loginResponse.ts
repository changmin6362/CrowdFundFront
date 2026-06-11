/** 유저 프로필 정보 */
export interface UserProfileInfo {
  /**
   * 유저 이메일
   * @example "example@text.com"
   */
  email?: string;
  /**
   * 유저 닉네임
   * @example "유저 닉네임 예시"
   */
  nickname?: string;
}

/** 로그인 응답 */
export interface LoginResponse {
  /** Access Token */
  accessToken?: string;
  /** 토큰 타입 (기본값: Bearer) */
  tokenType?: string;
  /** 유저 상세 정보 */
  userInfo?: UserProfileInfo;
}
