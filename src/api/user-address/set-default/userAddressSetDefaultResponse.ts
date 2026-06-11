import { DefaultAddressResult } from "@api/user-address/types";

/** 기본 배송지 변경 응답 */
export interface UserAddressSetDefaultResponse {
  /** 기본 배송지 정보 */
  defaultAddressResult?: DefaultAddressResult;
}
