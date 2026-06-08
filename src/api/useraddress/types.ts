/** 내 배송지 등록 요청 */
export interface UserAddressCreateRequest {
  recipientName: string;
  phone: string;     // 형식: 010-1234-5678
  postalCode: string;
  addressMain: string;
  addressDetail: string;
}

/** 내 배송지 등록 응답 */
export interface UserAddressCreateResponse {
  createdAddressId: number;
}

/** 내 배송지 목록 조회 응답 */
export interface UserAddressesFetchResponse {
  addresses: UserAddressInfo[];
}

/** 내 배송지 수정 요청 */
export interface UserAddressUpdateRequest {
  recipientName: string;
  phone: string;     // 형식: 010-1234-5678
  postalCode: string;
  addressMain: string;
  addressDetail: string;
}

/** 내 배송지 수정 응답 */
export interface UserAddressUpdateResponse {
  updatedAddress: UserAddressInfo;
}

/** 기본 배송지 변경 응답 */
export interface UserAddressSetResponse {
  defaultAddressResult: DefaultAddressResult;
}

/** 배송지 기본 정보 */
export interface UserAddressInfo {
  addressId: number;
  recipientName: string;
  phone: string;
  postalCode: string;
  addressMain: string;
  addressDetail: string;
  isDefault: boolean;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

/** 기본 배송지 설정 결과 정보 */
export interface DefaultAddressResult {
  addressId: number;
  isDefault: boolean;
}