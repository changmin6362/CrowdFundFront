import { UserDataInfo } from "@api/user/types";

/** 내 정보 수정 응답 */
export interface UserMeUpdateResponse {
  /** 유저 정보 */
  user?: UserDataInfo;
}
