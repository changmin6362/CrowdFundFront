/** 사용자의 역할 */
export const UserRole = {
  USER: "ROLE_USER",
  ADMIN: "ROLE_ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

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
