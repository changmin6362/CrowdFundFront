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
  /** 후원별 배송 정보 고유 ID */
  pledgeAddressId: number;
  /** 후원 ID */
  pledgeId: number;
  /** 사용자 ID */
  userId: number;
  /** 받는 사람 이름 */
  recipientName: string;
  /** 받는 사람 전화번호 */
  phone: string;
  /** 우편번호 */
  postalCode: string;
  /** 기본 주소 */
  addressMain: string;
  /** 상세 주소 */
  addressDetail: string;
  /** 생성 일시 (ISO Date String) */
  createdAt: string;
  /** 수정 일시 (ISO Date String) */
  updatedAt: string;
}