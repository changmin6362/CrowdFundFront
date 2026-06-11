/** 후원자들의 배송지 목록 조회 응답 */
export interface ProjectShippingFetchResponse {
  /** 배송 정보 목록 */
  shippingInfos?: ShippingInfo[];
}

/** 후원자 배송지 정보 */
export interface ShippingInfo {
  /**
   * 배송지 ID
   * @format int64
   * @example 1
   */
  addressId?: number;
  /**
   * 유저 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 수령인 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 우편번호
   * @example 12345
   */
  postalCode?: string;
  /**
   * 주소(본번)
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 주소(상세)
   * @example "서울시 중구 서소문로 123"
   */
  addressDetail?: string;
}
