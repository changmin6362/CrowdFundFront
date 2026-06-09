/** 사용자의 역할 */
export type UserRole = "USER" | "ADMIN";

/** 내 닉네임 조회 응답 */
export interface UserViewResponse {
  /**
   * 유저 닉네임
   * @example "유저 닉네임 예시"
   */
  nickname?: string;
}

/** 내 정보 조회 및 수정 응답 */
export interface UserFetchResponse {
  /** 유저 정보 */
  user?: UserDataInfo;
}

/** 유저 상세 정보 데이터 */
export interface UserDataInfo {
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
  /**
   * 유저 이름
   * @example "유저 이름 예시"
   */
  name?: string;
  /**
   * 유저 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 역할
   * @example "USER"
   */
  role?: UserRole;
}

export interface UserUpdateRequest {
  /**
   * 닉네임
   * @example "닉네임 예시"
   */
  nickname: string;
  /**
   * 이름
   * @example "이름 예시"
   */
  name: string;
  /**
   * 전화번호
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "010-1234-5678"
   */
  phone: string;
}