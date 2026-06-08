/** 내 닉네임 조회 응답 */
export interface UserViewResponse {
  /** 유저 닉네임 */
  nickname: string;
}

/** 내 정보 조회 및 수정 응답 */
export interface UserFetchResponse {
  /** 유저 상세 정보 */
  user: UserDataInfo;
}

/** 유저 상세 정보 데이터 */
export interface UserDataInfo {
  /** 유저 이메일 */
  email: string;
  /** 유저 닉네임 */
  nickname: string;
  /** 유저 이름 */
  name: string;
  /** 유저 전화번호 */
  phone: string;
  /** 역할 (예: 'USER', 'ADMIN') */
  role: string;
}

/** 내 정보 수정 요청 */
export interface UserUpdateRequest {
  /** 수정할 닉네임 */
  nickname: string;
  /** 수정할 이름 */
  name: string;
  /** 수정할 전화번호 (형식: 010-1234-5678) */
  phone: string;
}