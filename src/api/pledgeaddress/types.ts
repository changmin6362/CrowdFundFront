/** 참여한 후원의 배송 정보 교체 요청 */
export interface PledgeAddressReplaceRequest {
  /** 교체할 배송지 ID (배송지 관리 목록에 등록된 ID) */
  addressId: number;
}

/** 참여한 후원의 배송 정보 교체 응답 */
export interface PledgeAddressReplaceResponse {
  /** 교체된 후원의 배송 정보 */
  replacedPledgeAddress: PledgeAddressInfo;
}

/** 후원 배송 정보 상세 */
export interface PledgeAddressInfo {
  /**
   * 참여한 후원의 배송 정보 ID
   * @format int64
   * @example 1
   */
  pledgeAddressId?: number;
  /**
   * 참여한 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 참여한 후원의 배송 정보를 등록한 사용자 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 받는 사람 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 받는 사람 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 받는 사람 우편번호
   * @example 12345
   */
  postalCode?: string;
  /**
   * 받는 사람 주소(주소지)
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 받는 사람 주소(상세주소)
   * @example "서울시 중구 서소문로 22"
   */
  addressDetail?: string;
  /**
   * 참여한 후원의 배송 정보 등록 일시
   * @format date-time
   * @example "2023-09-15T12:00:00"
   */
  createdAt?: string;
  /**
   * 참여한 후원의 배송 정보 수정 일시
   * @format date-time
   * @example "2023-09-15T12:00:00"
   */
  updatedAt?: string;
}