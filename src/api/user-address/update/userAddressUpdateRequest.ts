/** 내 배송지 수정 요청 */
export interface UserAddressUpdateRequest {
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName: string;
  /**
   * 전화번호
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "010-1234-5678"
   */
  phone: string;
  /**
   * 우편번호
   * @example 12345
   */
  postalCode: string;
  /**
   * 기본 주소
   * @example "서울시 중구"
   */
  addressMain: string;
  /**
   * 상세 주소
   * @example "관철동 123-45"
   */
  addressDetail: string;
}
