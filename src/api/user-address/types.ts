/** 배송지 기본 정보 */
export interface UserAddressInfo {
  /**
   * 배송지 ID
   * @format int64
   * @example 1
   */
  addressId?: number;
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 우편번호
   * @example 12345
   */
  postalCode?: string;
  /**
   * 기본 주소
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 상세 주소
   * @example "관철동 123-45"
   */
  addressDetail?: string;
  /**
   * 기본 배송지 여부
   * @example true
   */
  isDefault?: boolean;
  /**
   * 생성 일시
   * @format date-time
   * @example "2023-09-01T12:34:56"
   */
  createdAt?: string;
  /**
   * 수정 일시
   * @format date-time
   * @example "2023-09-01T12:34:56"
   */
  updatedAt?: string;
}

/** 기본 배송지 설정 결과 정보 */
export interface DefaultAddressResult {
  /**
   * 배송지 ID
   * @format int64
   * @example 1
   */
  addressId?: number;
  /**
   * 기본 배송지 여부
   * @example true
   */
  isDefault?: boolean;
}
