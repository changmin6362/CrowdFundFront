import { UserAddressInfo } from "@api/user-address/types";

/** 내 배송지 목록 조회 응답 */
export interface UserAddressFetchResponse {
  /** 배송지 정보 목록 */
  addresses?: UserAddressInfo[];
}
