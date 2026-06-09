import { UserDataInfo } from "@api/user/types";

/** 내 정보 조회 및 수정 응답 */
export interface UserMeFetchResponse {
  /** 유저 정보 */
  user?: UserDataInfo;
}
