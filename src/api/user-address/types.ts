/** 내 배송지 등록 요청 */
export interface UserAddressCreateRequest {
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

/** 내 배송지 등록 응답 */
export interface UserAddressCreateResponse {
  /**
   * 유저 배송지 ID
   * @format int64
   * @example 11
   */
  createdAddressId?: number;
}

/** 내 배송지 목록 조회 응답 */
export interface UserAddressesFetchResponse {
  /** 배송지 정보 목록 */
  addresses?: UserAddressInfo[];
}

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

/** 내 배송지 수정 응답 */
export interface UserAddressUpdateResponse {
  /** 수정된 배송지 정보 */
  updatedAddress?: UserAddressInfo;
}

/** 기본 배송지 변경 응답 */
export interface UserAddressSetResponse {
  /** 기본 배송지 정보 */
  defaultAddressResult?: DefaultAddressResult;
}

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