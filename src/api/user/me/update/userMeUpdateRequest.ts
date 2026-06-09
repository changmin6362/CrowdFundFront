export interface UserMeUpdateRequest {
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
