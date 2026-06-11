/** 참여한 후원의 배송 정보 교체 요청 */
export interface PledgeAddressReplaceRequest {
  /** 교체할 배송지 ID (배송지 관리 목록에 등록된 ID) */
  addressId: number;
}
