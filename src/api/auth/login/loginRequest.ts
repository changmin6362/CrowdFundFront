/** 로그인 요청 */
export interface LoginRequest {
  /**
   * 이메일
   * @example "admin@test.com"
   */
  email: string;
  /**
   * 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
   * @example "aw123456!"
   */
  password: string;
}
