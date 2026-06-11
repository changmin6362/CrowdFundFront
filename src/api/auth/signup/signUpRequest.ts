/** 회원가입 요청 */
export interface SignUpRequest {
  /**
   * 이메일
   * @minLength 0
   * @maxLength 50
   * @example "sample@test.com"
   */
  email: string;
  /**
   * 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
   * @example "aw123456!"
   */
  password: string;
  /**
   * 닉네임
   * @minLength 0
   * @maxLength 12
   * @example "차분한 사용자123"
   */
  nickname: string;
  /**
   * 이름
   * @minLength 0
   * @maxLength 6
   * @example "김공자"
   */
  name: string;
  /**
   * 전화번호
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "010-1234-5678"
   */
  phone: string;
}
