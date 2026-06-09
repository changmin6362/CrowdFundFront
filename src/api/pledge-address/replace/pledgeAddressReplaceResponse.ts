import { PledgeAddressInfo } from "@api/pledge-address/types";

/** 참여한 후원의 배송 정보 교체 응답 */
export interface PledgeAddressReplaceResponse {
  /** 교체된 후원의 배송 정보 */
  replacedPledgeAddress: PledgeAddressInfo;
}
