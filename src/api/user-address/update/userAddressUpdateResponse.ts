import { UserAddressInfo } from "@api/user-address/types";

/** 내 배송지 수정 응답 */
export interface UserAddressUpdateResponse {
  /** 수정된 배송지 정보 */
  updatedAddress?: UserAddressInfo;
}
