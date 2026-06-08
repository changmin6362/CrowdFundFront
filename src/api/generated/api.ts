/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserUpdateRequest {
  /**
   * 닉네임
   * @example "닉네임 예시"
   */
  nickname: string;
  /**
   * 이름
   * @example "이름 예시"
   */
  name: string;
  /**
   * 전화번호
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "010-1234-5678"
   */
  phone: string;
}

export interface ApiResultUserFetchResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserFetchResponse;
}

export interface UserDataInfo {
  /**
   * 유저 이메일
   * @example "example@text.com"
   */
  email?: string;
  /**
   * 유저 닉네임
   * @example "유저 닉네임 예시"
   */
  nickname?: string;
  /**
   * 유저 이름
   * @example "유저 이름 예시"
   */
  name?: string;
  /**
   * 유저 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 역할
   * @example "USER"
   */
  role?: string;
}

export interface UserFetchResponse {
  /** 유저 정보 */
  user?: UserDataInfo;
}

export interface PledgeAddressReplaceRequest {
  /**
   * 참여한 후원의 배송 정보 ID
   * @format int64
   * @example 1
   */
  addressId: number;
}

export interface ApiResultPledgeAddressReplaceResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: PledgeAddressReplaceResponse;
}

export interface PledgeAddressInfo {
  /**
   * 참여한 후원의 배송 정보 ID
   * @format int64
   * @example 1
   */
  pledgeAddressId?: number;
  /**
   * 참여한 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 참여한 후원의 배송 정보를 등록한 사용자 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 받는 사람 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 받는 사람 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 받는 사람 우편번호
   * @example 12345
   */
  postalCode?: string;
  /**
   * 받는 사람 주소(주소지)
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 받는 사람 주소(상세주소)
   * @example "서울시 중구 서소문로 22"
   */
  addressDetail?: string;
  /**
   * 참여한 후원의 배송 정보 등록 일시
   * @format date-time
   * @example "2023-09-15T12:00:00"
   */
  createdAt?: string;
  /**
   * 참여한 후원의 배송 정보 수정 일시
   * @format date-time
   * @example "2023-09-15T12:00:00"
   */
  updatedAt?: string;
}

export interface PledgeAddressReplaceResponse {
  /** 교체된 후원의 배송 정보 */
  replacedPledgeAddress?: PledgeAddressInfo;
}

export interface UserAddressCreateRequest {
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName: string;
  /**
   * 전화번호
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "010-1234-5678"
   */
  phone: string;
  /**
   * 우편번호
   * @example 12345
   */
  postalCode: string;
  /**
   * 기본 주소
   * @example "서울시 중구"
   */
  addressMain: string;
  /**
   * 상세 주소
   * @example "관철동 123-45"
   */
  addressDetail: string;
}

export interface ApiResultUserAddressCreateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserAddressCreateResponse;
}

export interface UserAddressCreateResponse {
  /**
   * 유저 배송지 ID
   * @format int64
   * @example 11
   */
  createdAddressId?: number;
}

export interface ProjectCommentCreateRequest {
  /**
   * 댓글 내용
   * @example "댓글 내용 예시"
   */
  content: string;
}

export interface ApiResultProjectCommentCreateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: ProjectCommentCreateResponse;
}

export interface CommentInfo {
  /**
   * 댓글 ID
   * @format int64
   * @example 1
   */
  commentId?: number;
  /**
   * 작성자 이름
   * @example "작성자 이름 예시"
   */
  writerName?: string;
  /**
   * 댓글 내용
   * @example "댓글 내용 예시"
   */
  content?: string;
  /**
   * 댓글 생성일시
   * @format date-time
   * @example "2023-09-01T12:00:00"
   */
  createdAt?: string;
  /**
   * 댓글 수정 가능 여부
   * @example true
   */
  isEditable?: boolean;
}

export interface ProjectCommentCreateResponse {
  /** 생성된 댓글 정보 */
  createdComment?: CommentInfo;
}

export interface MyPledgeCreateRequest {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 2
   */
  projectId: number;
  /**
   * 리워드 ID
   * @format int64
   * @example 1
   */
  rewardId: number;
}

export interface ApiResultMyPledgeCreateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: MyPledgeCreateResponse;
}

export interface MyPledgeCreateResponse {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
}

export interface PaymentCreateRequest {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId: number;
  /**
   * 결제 수단
   * @example "CARD"
   */
  paymentMethod: "CARD" | "TRANSFER" | "KAKAOPAY" | "UNKNOWN";
  /**
   * 결제 금액
   * @example 35000
   */
  amount: number;
}

export interface ApiResultPaymentCreateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: PaymentCreateResponse;
}

export interface PaymentCreateResponse {
  /**
   * 결제 ID
   * @format int64
   * @example 1
   */
  paymentId?: number;
}

export interface CreatorProjectCreateRequest {
  /**
   * 프로젝트 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title: string;
  /**
   * 프로젝트 본문 콘텐츠 블록 데이터 (JSON)
   * @example {"time":1717200000000,"blocks":[{"id":"b1","type":"header","data":{"text":"프로젝트 소개","level":2}},{"id":"b2","type":"paragraph","data":{"text":"친환경 소재로 만든 방수 미니멀 백팩입니다. 일상과 여행 모두에 완벽하게 어울립니다."}},{"id":"b3","type":"image","data":{"url":"https://crowdfund.com","caption":"백팩 착용 정면 사진"}}],"version":"2.28.2"}
   */
  contentBlocks: object;
  /**
   * 목표 금액
   * @example 1000000
   */
  goalAmount: number;
  /**
   * 프로젝트 종료일
   * @format date-time
   * @example "2024-01-01T00:00:00"
   */
  endAt: string;
}

export interface ApiResultCreatorProjectCreateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: CreatorProjectCreateResponse;
}

export interface CreatorProjectCreateResponse {
  /**
   * 생성된 프로젝트 ID
   * @format int64
   * @example 1
   */
  createdProjectId?: number;
}

export interface CreatorRewardCreateRequest {
  /**
   * 리워드 제목
   * @example "1단계 후원 보상"
   */
  title: string;
  /**
   * 보상 설명
   * @example "프로젝트의 1단계 후원 보상입니다."
   */
  description: string;
  /**
   * 리워드 가격
   * @min 1
   * @example 10000
   */
  price: number;
  /**
   * 재고 수량
   * @format int32
   * @min 1
   * @example 10
   */
  stock: number;
}

export interface ApiResultCreatorRewardCreateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: CreatorRewardCreateResponse;
}

export interface CreatorRewardCreateResponse {
  /** 생성된 리워드 정보 */
  createdReward?: RewardInfo;
}

export interface RewardInfo {
  /**
   * 리워드 ID
   * @format int64
   * @example 1
   */
  rewardId?: number;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 리워드 제목
   * @example "리워드 제목 예시"
   */
  title?: string;
  /**
   * 리워드 설명
   * @example "리워드 설명 예시"
   */
  description?: string;
  /**
   * 리워드 가격
   * @example 10000
   */
  price?: number;
  /**
   * 리워드 재고
   * @format int32
   * @example 10
   */
  stock?: number;
  /**
   * 리워드 생성일시
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
}

export interface SignUpRequest {
  /**
   * 이메일
   * @minLength 0
   * @maxLength 50
   * @example "sample@test.com"
   */
  email: string;
  /**
   * 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
   * @example "aw123456!"
   */
  password: string;
  /**
   * 닉네임
   * @minLength 0
   * @maxLength 12
   * @example "차분한 사용자123"
   */
  nickname: string;
  /**
   * 이름
   * @minLength 0
   * @maxLength 6
   * @example "김공자"
   */
  name: string;
  /**
   * 전화번호
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "010-1234-5678"
   */
  phone: string;
}

export interface ApiResultVoid {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: object;
}

export interface LoginRequest {
  /**
   * 이메일
   * @example "admin@test.com"
   */
  email: string;
  /**
   * 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
   * @example "aw123456!"
   */
  password: string;
}

export interface ApiResultLoginResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: LoginResponse;
}

export interface LoginResponse {
  accessToken?: string;
  tokenType?: string;
  userInfo?: UserProfileInfo;
}

export interface UserProfileInfo {
  /**
   * 유저 이메일
   * @example "example@text.com"
   */
  email?: string;
  /**
   * 유저 닉네임
   * @example "유저 닉네임 예시"
   */
  nickname?: string;
}

/** 카테고리 생성 요청 */
export interface AdminCategoryCreateRequest {
  /**
   * 부모 카테고리 ID (최상위 카테고리인 경우 null)
   * @format int32
   * @example null
   */
  parentId?: number;
  /**
   * 카테고리 이름
   * @minLength 2
   * @maxLength 20
   * @example "전자제품"
   */
  name: string;
}

/** 카테고리 생성 응답 */
export interface AdminCategoryCreateResponse {
  /** 카테고리 트리 */
  categoryTree?: CategoryTreeNode[];
}

export interface ApiResultAdminCategoryCreateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  /** 카테고리 생성 응답 */
  data?: AdminCategoryCreateResponse;
}

export interface CategoryTreeNode {
  /**
   * 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId?: number;
  /**
   * 카테고리 이름
   * @example "게임"
   */
  name?: string;
  /**
   * 카테고리 깊이
   * @format int32
   * @example 0
   */
  depth?: number;
  /**
   * 카테고리 순서
   * @format int32
   * @example 10
   */
  sortOrder?: number;
  /**
   * 하위 카테고리 목록
   * @example "[하위 카테고리 객체 배열 (CategoryTreeNode 구조 반복)]"
   */
  children?: string;
}

export interface ProjectCommentUpdateRequest {
  /**
   * 수정할 댓글 내용
   * @example "수정할 댓글 내용을 입력해주세요."
   */
  content: string;
}

export interface ApiResultProjectCommentUpdateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: ProjectCommentUpdateResponse;
}

export interface ProjectCommentUpdateResponse {
  /** 수정된 댓글 정보 */
  patchedComment?: CommentInfo;
}

export interface UserAddressUpdateRequest {
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName: string;
  /**
   * 전화번호
   * @pattern ^\d{2,3}-\d{3,4}-\d{4}$
   * @example "010-1234-5678"
   */
  phone: string;
  /**
   * 우편번호
   * @example 12345
   */
  postalCode: string;
  /**
   * 기본 주소
   * @example "서울시 중구"
   */
  addressMain: string;
  /**
   * 상세 주소
   * @example "관철동 123-45"
   */
  addressDetail: string;
}

export interface ApiResultUserAddressUpdateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserAddressUpdateResponse;
}

export interface UserAddressInfo {
  /**
   * 배송지 ID
   * @format int64
   * @example 1
   */
  addressId?: number;
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 우편번호
   * @example 12345
   */
  postalCode?: string;
  /**
   * 기본 주소
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 상세 주소
   * @example "관철동 123-45"
   */
  addressDetail?: string;
  /**
   * 기본 배송지 여부
   * @example true
   */
  isDefault?: boolean;
  /**
   * 생성 일시
   * @format date-time
   * @example "2023-09-01T12:34:56"
   */
  createdAt?: string;
  /**
   * 수정 일시
   * @format date-time
   * @example "2023-09-01T12:34:56"
   */
  updatedAt?: string;
}

export interface UserAddressUpdateResponse {
  /** 수정된 배송지 정보 */
  updatedAddress?: UserAddressInfo;
}

export interface ApiResultUserAddressSetResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserAddressSetResponse;
}

export interface DefaultAddressResult {
  /**
   * 배송지 ID
   * @format int64
   * @example 1
   */
  addressId?: number;
  /**
   * 기본 배송지 여부
   * @example true
   */
  isDefault?: boolean;
}

export interface UserAddressSetResponse {
  /** 기본 배송지 정보 */
  defaultAddressResult?: DefaultAddressResult;
}

export interface CreatorRewardUpdateRequest {
  /**
   * 리워드 제목
   * @example "리워드 제목 예시"
   */
  title: string;
  /**
   * 리워드 내용
   * @example "리워드 내용 예시"
   */
  description: string;
  /**
   * 리워드 가격
   * @min 0
   * @example 10000
   */
  price: number;
}

export interface ApiResultCreatorRewardUpdateResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: CreatorRewardUpdateResponse;
}

export interface CreatorRewardUpdateResponse {
  /** 수정된 리워드 정보 */
  updatedReward?: RewardInfo;
}

export interface CreatorRewardUpdateStockRequest {
  /**
   * 리워드 재고
   * @format int32
   * @min 1
   * @example 10
   */
  stock: number;
}

export interface CreatorProjectUpdateRequest {
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title: string;
  /**
   * 프로젝트 콘텐트 블럭 데이터
   * @example {"time":1717200000000,"blocks":[{"id":"b1","type":"header","data":{"text":"프로젝트 소개","level":2}},{"id":"b2","type":"paragraph","data":{"text":"친환경 소재로 만든 방수 미니멀 백팩입니다. 일상과 여행 모두에 완벽하게 어울립니다."}},{"id":"b3","type":"image","data":{"url":"https://crowdfund.com","caption":"백팩 착용 정면 사진"}}],"version":"2.28.2"}
   */
  contentBlocks: object;
}

export interface CreatorPledgeFulfillRequest {
  /**
   * 보상 이행 상태
   * @example "FULFILLED"
   */
  fulfillmentStatus: "READY" | "FULFILLED";
}

export interface ApiResultCreatorPledgeFulfillResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: CreatorPledgeFulfillResponse;
}

export interface CreatorPledgeFulfillResponse {
  /** 변경된 보상 이행 상태 정보 */
  fulfillment?: FulfillmentInfo;
}

export interface FulfillmentInfo {
  /**
   * 보상 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /** 보상 이행 상태 */
  fulfillmentStatus?: "READY" | "FULFILLED";
  /**
   * 보상 이행 일시
   * @format date-time
   * @example "2023-09-20T12:34:56"
   */
  fulfilledAt?: string;
}

export interface AdminCategoryActiveRequest {
  /**
   * 카테고리 활성 상태
   * @example true
   */
  isActive: boolean;
}

export interface ApiResultUserFetchCategoryResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  /** 카테고리 트리 조회 응답 */
  data?: UserFetchCategoryResponse;
}

/** 카테고리 트리 조회 응답 */
export interface UserFetchCategoryResponse {
  /** 카테고리 트리 */
  categoryTree?: CategoryTreeNode[];
}

/** 카테고리 이름 변경 요청 */
export interface AdminCategoryRenameRequest {
  /**
   * 변경할 카테고리 이름
   * @example "게임기"
   */
  name: string;
}

/** 카테고리 이동(부모 변경) 요청 */
export interface AdminCategoryMoveRequest {
  /**
   * 부모 카테고리 ID (최상위로 이동 시 null)
   * @format int32
   * @example 1
   */
  parentId?: number;
}

/** 카테고리 정렬 순서 변경 요청 */
export interface AdminCategoryReorderRequest {
  /** 변경할 카테고리 목록 */
  categories: CategorySortItem[];
}

/** 카테고리 정렬 정보 */
export interface CategorySortItem {
  /**
   * 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId: number;
  /**
   * 변경할 정렬 순서
   * @format int32
   * @example 25
   */
  sortOrder: number;
}

export interface ApiResultUserViewResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserViewResponse;
}

export interface UserViewResponse {
  /**
   * 유저 닉네임
   * @example "유저 닉네임 예시"
   */
  nickname?: string;
}

export interface ApiResultMyCommentsResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: MyCommentsResponse;
}

export interface CursorRequest {
  /**
   * 커서의 날짜 키
   * @format date-time
   */
  createdAt?: string;
  /**
   * 커서의 ID 키
   * @format int64
   */
  id?: number;
}

export interface MyCommentInfo {
  /**
   * 댓글 ID
   * @format int64
   * @example 1
   */
  commentId?: number;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  projectTitle?: string;
  /**
   * 댓글 내용
   * @example "프로젝트의 댓글 예시"
   */
  content?: string;
  /**
   * 댓글 생성일시
   * @format date-time
   * @example "2023-09-15T12:00:00"
   */
  createdAt?: string;
}

export interface MyCommentsResponse {
  /** 내 댓글 목록 */
  myComments?: MyCommentInfo[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

export interface ApiResultUserAddressesFetchResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserAddressesFetchResponse;
}

export interface UserAddressesFetchResponse {
  /** 배송지 정보 목록 */
  addresses?: UserAddressInfo[];
}

export interface ApiResultUserRewardsFetchResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserRewardsFetchResponse;
}

export interface RewardFetchInfo {
  /**
   * 리워드 ID
   * @format int64
   * @example 1
   */
  rewardId?: number;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 리워드 제목
   * @example "리워드 제목 예시"
   */
  title?: string;
  /**
   * 리워드 설명
   * @example "리워드 설명 예시"
   */
  description?: string;
  /**
   * 리워드 가격
   * @example 10000
   */
  price?: number;
  /**
   * 리워드 재고
   * @format int32
   * @example 10
   */
  stock?: number;
  /**
   * 리워드 생성일시
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
}

export interface UserRewardsFetchResponse {
  /** 리워드 목록 */
  rewards?: RewardFetchInfo[];
}

export interface ApiResultUserProjectFetchResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserProjectFetchResponse;
}

export interface ProjectElement {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 프로젝트 생성자 ID
   * @format int64
   * @example 1
   */
  creatorId?: number;
  /**
   * 프로젝트 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title?: string;
  /**
   * 프로젝트 목표 금액
   * @example 1000000
   */
  goalAmount?: number;
  /**
   * 프로젝트 현재 금액
   * @example 500000
   */
  currentAmount?: number;
  /**
   * 프로젝트 종료 시간
   * @format date-time
   * @example "2023-12-31T23:59:59"
   */
  endAt?: string;
  /** 프로젝트 상태 */
  status?: "ONGOING" | "COMPLETED" | "CANCELED";
  /**
   * 프로젝트 생성 시간
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
}

export interface UserProjectFetchResponse {
  /** 유저가 참여한 프로젝트 목록 */
  projects?: ProjectElement[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

export interface ApiResultUserProjectDetailResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: UserProjectDetailResponse;
}

export interface ProjectDetail {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 카테고리 이름
   * @example "디자인"
   */
  categoryName?: string;
  /**
   * 프로젝트 생성자 닉네임
   * @example "김공자"
   */
  creatorNickname?: string;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title?: string;
  /**
   * 프로젝트 내용
   * @example "프로젝트 내용 예시"
   */
  contentBlocks?: string;
  /**
   * 목표 금액
   * @example 1000000
   */
  goalAmount?: number;
  /**
   * 현재 금액
   * @example 500000
   */
  currentAmount?: number;
  /**
   * 마감 일시
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  endAt?: string;
  /** 프로젝트 상태 */
  status?: string;
  /** 리워드 정보 목록 */
  rewards?: RewardInfo[];
}

export interface UserProjectDetailResponse {
  /** 프로젝트 상세 정보 */
  projectDetail?: ProjectDetail;
}

export interface ApiResultProjectCommentsFetchResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: ProjectCommentsFetchResponse;
}

export interface ProjectCommentsFetchResponse {
  /** 프로젝트 댓글 목록 */
  comments?: CommentInfo[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

export interface ApiResultMyPledgesFetchResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: MyPledgesFetchResponse;
}

export interface MyPledgeInfo {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 2
   */
  projectId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  projectTitle?: string;
  /**
   * 보상 ID
   * @format int64
   * @example 1
   */
  rewardId?: number;
  /**
   * 보상명
   * @example "리워드 제목 예시"
   */
  rewardTitle?: string;
  /**
   * 후원 금액
   * @example 35000
   */
  amount?: number;
  /** 후원 상태 */
  status?: "PENDING" | "PAID" | "REFUNDED";
  /** 보상 이행 상태 */
  fulfillmentStatus?: "READY" | "FULFILLED";
  /**
   * 후원 일시
   * @format date-time
   * @example "2023-08-01T12:00:00"
   */
  pledgedAt?: string;
}

export interface MyPledgesFetchResponse {
  /** 내가 후원한 프로젝트 목록 */
  pledges?: MyPledgeInfo[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

export interface ApiResultMyPledgeDetailResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: MyPledgeDetailResponse;
}

export interface MyPledgeDetail {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 생성 일시
   * @example "2023-09-15T12:00:00"
   */
  createdAt?: string;
  /** 후원 상태 */
  status?: "PENDING" | "PAID" | "REFUNDED";
  /** 보상 이행 상태 */
  fulfillmentStatus?: "READY" | "FULFILLED";
  /**
   * 프로젝트 제목
   * @example "새로운 프로젝트"
   */
  projectTitle?: string;
  /**
   * 후원 금액
   * @example 10000
   */
  amount?: number;
  /** 결제 수단 */
  paymentMethod?: string;
  /**
   * 리워드 이름
   * @example "1등급 후원자 상품"
   */
  rewardName?: string;
  /** 후원의 배송 주소 정보 */
  shippingAddress?: ShippingAddress;
}

export interface MyPledgeDetailResponse {
  /** 후원 상세 정보 */
  myPledgeDetail?: MyPledgeDetail;
}

export interface ShippingAddress {
  /**
   * 후원의 배송 주소 ID
   * @format int64
   * @example 1
   */
  pledgeAddressId?: number;
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 수령인 전화번호
   * @example "010-1234-5678"
   */
  recipientPhone?: string;
  /**
   * 기본 주소
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 상세 주소
   * @example "신당동 123-45"
   */
  addressDetail?: string;
  /**
   * 우편 번호
   * @example "06060"
   */
  postalCode?: string;
  /**
   * 생성 일시
   * @example "2023-09-15T12:00:00"
   */
  createdAt?: string;
  /**
   * 수정 일시
   * @example "2023-09-15T12:00:00"
   */
  updatedAt?: string;
}

export interface ApiResultPaymentHistoryResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: PaymentHistoryResponse;
}

export interface PaymentHistoryInfo {
  /**
   * 결제 이력 ID
   * @format int64
   * @example 1
   */
  historyId?: number;
  /** 변경된 결제 상태 */
  status?: "PENDING" | "PAID" | "FAILED" | "CANCELED" | "REFUNDED";
  /**
   * 상태 변경 시각
   * @format date-time
   * @example "2023-09-01T12:00:00"
   */
  changedAt?: string;
  /**
   * 상태 변경 사유
   * @example "최초 결제 완료"
   */
  reason?: string;
  /**
   * PG 트랜잭션 ID
   * @example "PG-TX-12345"
   */
  pgTransactionId?: string;
}

export interface PaymentHistoryResponse {
  /** 결제 이력 목록 */
  paymentHistories?: PaymentHistoryInfo[];
}

export interface ApiResultPaymentDetailResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: PaymentDetailResponse;
}

export interface PaymentDetail {
  /**
   * 결제 ID
   * @format int64
   * @example 1
   */
  paymentId?: number;
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 결제 방법
   * @example "CARD"
   */
  paymentMethod?: "CARD" | "TRANSFER" | "KAKAOPAY" | "UNKNOWN";
  /**
   * 결제 금액
   * @example 35000
   */
  amount?: number;
  /** 결제 상태 */
  status?: "PENDING" | "PAID" | "FAILED" | "CANCELED" | "REFUNDED";
  /**
   * 결제 일시
   * @format date-time
   * @example "2023-09-01T12:00:00"
   */
  paidAt?: string;
  /**
   * 생성 일시
   * @format date-time
   * @example "2023-09-01T12:00:00"
   */
  createdAt?: string;
}

export interface PaymentDetailResponse {
  /** 결제 상세 정보 */
  paymentDetail?: PaymentDetail;
}

export interface ApiResultCreatorShippingInfosExtractResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: CreatorShippingInfosExtractResponse;
}

export interface CreatorShippingInfosExtractResponse {
  /** 배송 정보 목록 */
  shippingInfos?: ShippingInfo[];
}

export interface ShippingInfo {
  /**
   * 배송지 ID
   * @format int64
   * @example 1
   */
  addressId?: number;
  /**
   * 유저 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 수령인 이름
   * @example "김공자"
   */
  recipientName?: string;
  /**
   * 수령인 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
  /**
   * 우편번호
   * @example 12345
   */
  postalCode?: string;
  /**
   * 주소(본번)
   * @example "서울시 중구"
   */
  addressMain?: string;
  /**
   * 주소(상세)
   * @example "서울시 중구 서소문로 123"
   */
  addressDetail?: string;
}

export interface ApiResultCreatorProjectsFetchResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: CreatorProjectsFetchResponse;
}

export interface CreatorProjectsFetchResponse {
  /** 프로젝트 목록 */
  projects?: ProjectInfo[];
}

export interface ProjectInfo {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title?: string;
  /**
   * 목표 금액
   * @example 1000000
   */
  goalAmount?: number;
  /**
   * 현재 금액
   * @example 500000
   */
  currentAmount?: number;
  /**
   * 마감일
   * @format date-time
   * @example "2023-12-31T23:59:59"
   */
  endAt?: string;
  /** 프로젝트 상태 */
  status?: "ONGOING" | "COMPLETED" | "CANCELED";
}

export interface AdminPledgesFetchResponse {
  /** 후원 목록 */
  pledges?: PledgeSummary[];
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
  /** 다음 페이지 커서 정보 */
  nextCursor?: CursorRequest;
}

export interface ApiResultAdminPledgesFetchResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: AdminPledgesFetchResponse;
}

export interface PledgeSummary {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 후원한 사용자 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 후원한 사용자 명
   * @example "김공자"
   */
  userName?: string;
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  projectTitle?: string;
  /**
   * 보상 ID
   * @format int64
   * @example 1
   */
  rewardId?: number;
  /**
   * 후원 금액
   * @example 35000
   */
  amount?: number;
  /** 후원 상태 */
  status?: "PENDING" | "PAID" | "REFUNDED";
  /** 보상 이행 상태 */
  fulfillmentStatus?: "READY" | "FULFILLED";
  /**
   * 생성 일시
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
}

export interface AdminPaymentDetail {
  /**
   * 후원 금액
   * @example 10000
   */
  amount?: number;
  /**
   * 결제 방법
   * @example "카드"
   */
  paymentMethod?: string;
}

export interface AdminPledgeDetail {
  /**
   * 후원 ID
   * @format int64
   * @example 1
   */
  pledgeId?: number;
  /**
   * 생성 일시
   * @example "2023-08-01T12:00:00"
   */
  createdAt?: string;
  /** 후원 상태 */
  status?: "PENDING" | "PAID" | "REFUNDED";
  /** 보상 이행 상태 */
  fulfillmentStatus?: "READY" | "FULFILLED";
  /** 사용자 상세 정보 */
  user?: AdminUserDetail;
  /** 결제 상세 정보 */
  payment?: AdminPaymentDetail;
  /** 프로젝트 상세 정보 */
  project?: AdminProjectDetail;
}

export interface AdminPledgeDetailResponse {
  /** 관리자용 후원 상세 정보 */
  adminPledgeDetail?: AdminPledgeDetail;
}

export interface AdminProjectDetail {
  /**
   * 프로젝트 ID
   * @format int64
   * @example 1
   */
  projectId?: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  projectTitle?: string;
}

export interface AdminUserDetail {
  /**
   * 유저 ID
   * @format int64
   * @example 1
   */
  userId?: number;
  /**
   * 유저 이름
   * @example "김공자"
   */
  name?: string;
  /**
   * 유저 닉네임
   * @example "닉네임 예시"
   */
  nickname?: string;
  /**
   * 유저 이메일
   * @example "example@example.com"
   */
  email?: string;
  /**
   * 유저 전화번호
   * @example "010-1234-5678"
   */
  phone?: string;
}

export interface ApiResultAdminPledgeDetailResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: AdminPledgeDetailResponse;
}

export interface ApiResultProjectCommentDeleteResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: ProjectCommentDeleteResponse;
}

export interface ProjectCommentDeleteResponse {
  /**
   * 삭제된 댓글 ID
   * @format int64
   * @example 1
   */
  deletedCommentId?: number;
}

export interface ApiResultMyPledgesDeleteResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: MyPledgesDeleteResponse;
}

export interface MyPledgesDeleteResponse {
  /**
   * 삭제된 후원 ID
   * @format int64
   * @example 1
   */
  deletedPledgeId?: number;
}

export interface ApiResultCreatorRewardDeleteResponse {
  /**
   * 응답 메시지
   * @example "이건 응답 메시지 샘플입니다."
   */
  message?: string;
  data?: CreatorRewardDeleteResponse;
}

export interface CreatorRewardDeleteResponse {
  /**
   * 삭제된 리워드 ID
   * @format int64
   * @example 1
   */
  deletedRewardId?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://3.34.181.49";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title CrowdFund API Documentation
 * @version v0.0.1
 * @baseUrl http://3.34.181.49
 *
 * CrowdFund 프로젝트의 API 문서입니다.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags 02. User
     * @name Update
     * @summary 내 정보 수정
     * @request PUT:/api/users/me
     * @secure
     */
    update: (data: UserUpdateRequest, params: RequestParams = {}) =>
      this.request<ApiResultUserFetchResponse, any>({
        path: `/api/users/me`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 02. User
     * @name Delete
     * @summary 회원 탈퇴
     * @request DELETE:/api/users/me
     * @secure
     */
    delete: (params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/api/users/me`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 08. PledgeAddress
     * @name Replace
     * @summary 참여한 후원의 배송 정보 교체
     * @request PUT:/api/pledges/{pledgeId}/address
     * @secure
     */
    replace: (
      pledgeId: number,
      data: PledgeAddressReplaceRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultPledgeAddressReplaceResponse, any>({
        path: `/api/pledges/${pledgeId}/address`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 03. UserAddress
     * @name Create
     * @summary 내 배송지 등록
     * @request POST:/api/users/me/address
     * @secure
     */
    create: (data: UserAddressCreateRequest, params: RequestParams = {}) =>
      this.request<ApiResultUserAddressCreateResponse, any>({
        path: `/api/users/me/address`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 10. Comment - Project
     * @name Fetch
     * @summary 프로젝트의 댓글 목록 조회
     * @request GET:/api/projects/{projectId}/comments
     * @secure
     */
    fetch: (
      projectId: number,
      query?: {
        /** @format int64 */
        currentUserId?: number;
        /**
         * 커서의 날짜 키
         * @format date-time
         */
        createdAt?: string;
        /**
         * 커서의 ID 키
         * @format int64
         */
        id?: number;
        /**
         * @format int32
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResultProjectCommentsFetchResponse, any>({
        path: `/api/projects/${projectId}/comments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 10. Comment - Project
     * @name Create1
     * @summary 프로젝트에 댓글 작성
     * @request POST:/api/projects/{projectId}/comments
     * @secure
     */
    create1: (
      projectId: number,
      data: ProjectCommentCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultProjectCommentCreateResponse, any>({
        path: `/api/projects/${projectId}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 07. Pledge - MY
     * @name Fetch1
     * @summary 내가 후원한 프로젝트 목록 조회
     * @request GET:/api/pledges/me
     * @secure
     */
    fetch1: (
      query?: {
        fulfillmentStatus?: "READY" | "FULFILLED";
        pledgeStatus?: "PENDING" | "PAID" | "REFUNDED";
        /**
         * 커서의 날짜 키
         * @format date-time
         */
        createdAt?: string;
        /**
         * 커서의 ID 키
         * @format int64
         */
        id?: number;
        /**
         * @format int32
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResultMyPledgesFetchResponse, any>({
        path: `/api/pledges/me`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 07. Pledge - MY
     * @name Create2
     * @summary 프로젝트 후원하기
     * @request POST:/api/pledges/me
     * @secure
     */
    create2: (data: MyPledgeCreateRequest, params: RequestParams = {}) =>
      this.request<ApiResultMyPledgeCreateResponse, any>({
        path: `/api/pledges/me`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 09. Payment
     * @name Create3
     * @summary 결제 요청
     * @request POST:/api/payments
     * @secure
     */
    create3: (data: PaymentCreateRequest, params: RequestParams = {}) =>
      this.request<ApiResultPaymentCreateResponse, any>({
        path: `/api/payments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 05. Project - Creator
     * @name Create4
     * @summary 프로젝트 생성
     * @request POST:/api/creator/projects
     * @secure
     */
    create4: (data: CreatorProjectCreateRequest, params: RequestParams = {}) =>
      this.request<ApiResultCreatorProjectCreateResponse, any>({
        path: `/api/creator/projects`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 06. Reward - Creator
     * @name Create5
     * @summary 프로젝트에 리워드 등록
     * @request POST:/api/creator/projects/{projectId}/rewards
     * @secure
     */
    create5: (
      projectId: number,
      data: CreatorRewardCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultCreatorRewardCreateResponse, any>({
        path: `/api/creator/projects/${projectId}/rewards`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 01. Auth
     * @name SignUp
     * @summary 회원가입
     * @request POST:/api/auth/signup
     * @secure
     */
    signUp: (data: SignUpRequest, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/api/auth/signup`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 01. Auth
     * @name Login
     * @summary 로그인
     * @request POST:/api/auth/login
     * @secure
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<ApiResultLoginResponse, any>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 생성된 카테고리 정보와 전체 트리를 반환합니다.
     *
     * @tags 04. Category - Admin
     * @name Create6
     * @summary 카테고리 생성
     * @request POST:/api/admin/categories
     * @secure
     */
    create6: (data: AdminCategoryCreateRequest, params: RequestParams = {}) =>
      this.request<ApiResultAdminCategoryCreateResponse, any>({
        path: `/api/admin/categories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 10. Comment - My
     * @name Delete1
     * @summary 내 댓글 삭제
     * @request DELETE:/api/users/me/comments/{commentId}
     * @secure
     */
    delete1: (commentId: number, params: RequestParams = {}) =>
      this.request<ApiResultProjectCommentDeleteResponse, any>({
        path: `/api/users/me/comments/${commentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 10. Comment - My
     * @name Update1
     * @summary 내 댓글 수정
     * @request PATCH:/api/users/me/comments/{commentId}
     * @secure
     */
    update1: (
      commentId: number,
      data: ProjectCommentUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultProjectCommentUpdateResponse, any>({
        path: `/api/users/me/comments/${commentId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 03. UserAddress
     * @name Delete2
     * @summary 내 배송지 삭제
     * @request DELETE:/api/users/me/address/{addressId}
     * @secure
     */
    delete2: (addressId: number, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/api/users/me/address/${addressId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 03. UserAddress
     * @name Update2
     * @summary 내 배송지 수정
     * @request PATCH:/api/users/me/address/{addressId}
     * @secure
     */
    update2: (
      addressId: number,
      data: UserAddressUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultUserAddressUpdateResponse, any>({
        path: `/api/users/me/address/${addressId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 03. UserAddress
     * @name Set
     * @summary 기본 배송지 변경
     * @request PATCH:/api/users/me/address/{addressId}/default
     * @secure
     */
    set: (addressId: number, params: RequestParams = {}) =>
      this.request<ApiResultUserAddressSetResponse, any>({
        path: `/api/users/me/address/${addressId}/default`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 06. Reward - Creator
     * @name Delete3
     * @summary 리워드 삭제
     * @request DELETE:/api/creator/rewards/{rewardId}
     * @secure
     */
    delete3: (rewardId: number, params: RequestParams = {}) =>
      this.request<ApiResultCreatorRewardDeleteResponse, any>({
        path: `/api/creator/rewards/${rewardId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 06. Reward - Creator
     * @name Update3
     * @summary 리워드 정보 수정
     * @request PATCH:/api/creator/rewards/{rewardId}
     * @secure
     */
    update3: (
      rewardId: number,
      data: CreatorRewardUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultCreatorRewardUpdateResponse, any>({
        path: `/api/creator/rewards/${rewardId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 06. Reward - Creator
     * @name UpdateStock
     * @summary 리워드 재고 수정
     * @request PATCH:/api/creator/rewards/{rewardId}/stock
     * @secure
     */
    updateStock: (
      rewardId: number,
      data: CreatorRewardUpdateStockRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultCreatorRewardUpdateResponse, any>({
        path: `/api/creator/rewards/${rewardId}/stock`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 05. Project - Creator
     * @name Delete4
     * @summary 프로젝트 삭제
     * @request DELETE:/api/creator/projects/{projectId}
     * @secure
     */
    delete4: (projectId: number, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/api/creator/projects/${projectId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 05. Project - Creator
     * @name Update4
     * @summary 프로젝트 제목과 본문 수정
     * @request PATCH:/api/creator/projects/{projectId}
     * @secure
     */
    update4: (
      projectId: number,
      data: CreatorProjectUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultVoid, any>({
        path: `/api/creator/projects/${projectId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 05. Project - Creator
     * @name Cancel
     * @summary 프로젝트 취소
     * @request PATCH:/api/creator/projects/{projectId}/cancel
     * @secure
     */
    cancel: (projectId: number, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/api/creator/projects/${projectId}/cancel`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 07. Pledge - Creator
     * @name Fulfill
     * @summary 보상 이행 상태 변경
     * @request PATCH:/api/creator/pledges/{pledgeId}/fulfill
     * @secure
     */
    fulfill: (
      pledgeId: number,
      data: CreatorPledgeFulfillRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultCreatorPledgeFulfillResponse, any>({
        path: `/api/creator/pledges/${pledgeId}/fulfill`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 04. Category - Admin
     * @name Toggle
     * @summary 카테고리 활성 여부 변경
     * @request PATCH:/api/admin/categories/{categoryId}/toggle
     * @secure
     */
    toggle: (
      categoryId: number,
      data: AdminCategoryActiveRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultUserFetchCategoryResponse, any>({
        path: `/api/admin/categories/${categoryId}/toggle`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 04. Category - Admin
     * @name Rename
     * @summary 카테고리 이름 변경
     * @request PATCH:/api/admin/categories/{categoryId}/rename
     * @secure
     */
    rename: (
      categoryId: number,
      data: AdminCategoryRenameRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultUserFetchCategoryResponse, any>({
        path: `/api/admin/categories/${categoryId}/rename`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 04. Category - Admin
     * @name Move
     * @summary 카테고리 부모 변경
     * @request PATCH:/api/admin/categories/{categoryId}/parent
     * @secure
     */
    move: (
      categoryId: number,
      data: AdminCategoryMoveRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResultUserFetchCategoryResponse, any>({
        path: `/api/admin/categories/${categoryId}/parent`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 04. Category - Admin
     * @name Reorder
     * @summary 카테고리 정렬 순서 변경
     * @request PATCH:/api/admin/categories/sort-order
     * @secure
     */
    reorder: (data: AdminCategoryReorderRequest, params: RequestParams = {}) =>
      this.request<ApiResultUserFetchCategoryResponse, any>({
        path: `/api/admin/categories/sort-order`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 02. User
     * @name View
     * @summary 내 닉네임 조회
     * @request GET:/api/users/me/nickname
     * @secure
     */
    view: (params: RequestParams = {}) =>
      this.request<ApiResultUserViewResponse, any>({
        path: `/api/users/me/nickname`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 02. User
     * @name Fetch2
     * @summary 내 정보 조회
     * @request GET:/api/users/me/data
     * @secure
     */
    fetch2: (params: RequestParams = {}) =>
      this.request<ApiResultUserFetchResponse, any>({
        path: `/api/users/me/data`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 10. Comment - My
     * @name Fetch3
     * @summary 내 댓글 목록 조회
     * @request GET:/api/users/me/comments
     * @secure
     */
    fetch3: (
      query?: {
        /**
         * 커서의 날짜 키
         * @format date-time
         */
        createdAt?: string;
        /**
         * 커서의 ID 키
         * @format int64
         */
        id?: number;
        /**
         * @format int32
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResultMyCommentsResponse, any>({
        path: `/api/users/me/comments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 03. UserAddress
     * @name Fetch4
     * @summary 내 배송지 목록 조회
     * @request GET:/api/users/me/addresses
     * @secure
     */
    fetch4: (params: RequestParams = {}) =>
      this.request<ApiResultUserAddressesFetchResponse, any>({
        path: `/api/users/me/addresses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 06. Reward - User
     * @name Fetch5
     * @summary 프로젝트의 리워드 목록 조회
     * @request GET:/api/user/projects/{projectId}/rewards
     * @secure
     */
    fetch5: (projectId: number, params: RequestParams = {}) =>
      this.request<ApiResultUserRewardsFetchResponse, any>({
        path: `/api/user/projects/${projectId}/rewards`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 05. Project - User
     * @name Fetch6
     * @summary 프로젝트 목록 조회
     * @request GET:/api/projects
     * @secure
     */
    fetch6: (
      query?: {
        statuses?: ("ONGOING" | "COMPLETED" | "CANCELED")[];
        /** @format int32 */
        categoryId?: number;
        /**
         * 커서의 날짜 키
         * @format date-time
         */
        createdAt?: string;
        /**
         * 커서의 ID 키
         * @format int64
         */
        id?: number;
        /**
         * @format int32
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResultUserProjectFetchResponse, any>({
        path: `/api/projects`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 05. Project - User
     * @name Detail
     * @summary 프로젝트 상세 조회
     * @request GET:/api/projects/{projectId}
     * @secure
     */
    detail: (projectId: number, params: RequestParams = {}) =>
      this.request<ApiResultUserProjectDetailResponse, any>({
        path: `/api/projects/${projectId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 07. Pledge - MY
     * @name Detail1
     * @summary 후원 상세 조회
     * @request GET:/api/pledges/me/{pledgeId}
     * @secure
     */
    detail1: (pledgeId: number, params: RequestParams = {}) =>
      this.request<ApiResultMyPledgeDetailResponse, any>({
        path: `/api/pledges/me/${pledgeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 07. Pledge - MY
     * @name Cancel1
     * @summary 후원 취소
     * @request DELETE:/api/pledges/me/{pledgeId}
     * @secure
     */
    cancel1: (pledgeId: number, params: RequestParams = {}) =>
      this.request<ApiResultMyPledgesDeleteResponse, any>({
        path: `/api/pledges/me/${pledgeId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 09. Payment
     * @name History
     * @summary 결제 이력 조회
     * @request GET:/api/payments/{paymentId}/history
     * @secure
     */
    history: (paymentId: number, params: RequestParams = {}) =>
      this.request<ApiResultPaymentHistoryResponse, any>({
        path: `/api/payments/${paymentId}/history`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 09. Payment
     * @name Detail2
     * @summary 후원별 결제 상세 조회
     * @request GET:/api/payments/pledge/{pledgeId}
     * @secure
     */
    detail2: (pledgeId: number, params: RequestParams = {}) =>
      this.request<ApiResultPaymentDetailResponse, any>({
        path: `/api/payments/pledge/${pledgeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 05. Project - Creator
     * @name Extract
     * @summary 후원자들의 배송지 목록 조회
     * @request GET:/api/creator/projects/{projectId}/shipping-infos
     * @secure
     */
    extract: (projectId: number, params: RequestParams = {}) =>
      this.request<ApiResultCreatorShippingInfosExtractResponse, any>({
        path: `/api/creator/projects/${projectId}/shipping-infos`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 05. Project - Creator
     * @name Fetch7
     * @summary 내 프로젝트 조회
     * @request GET:/api/creator/projects/me
     * @secure
     */
    fetch7: (params: RequestParams = {}) =>
      this.request<ApiResultCreatorProjectsFetchResponse, any>({
        path: `/api/creator/projects/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 04. Category - User
     * @name Fetch8
     * @summary 카테고리 트리 조회
     * @request GET:/api/categories
     * @secure
     */
    fetch8: (params: RequestParams = {}) =>
      this.request<ApiResultUserFetchCategoryResponse, any>({
        path: `/api/categories`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 07. Pledge - Admin
     * @name Fetch9
     * @summary 관리자용 전체 후원 목록 조회
     * @request GET:/api/admin/pledges
     * @secure
     */
    fetch9: (
      query?: {
        fulfillmentStatus?: "READY" | "FULFILLED";
        pledgeStatus?: "PENDING" | "PAID" | "REFUNDED";
        /**
         * 커서의 날짜 키
         * @format date-time
         */
        createdAt?: string;
        /**
         * 커서의 ID 키
         * @format int64
         */
        id?: number;
        /**
         * @format int32
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResultAdminPledgesFetchResponse, any>({
        path: `/api/admin/pledges`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 07. Pledge - Admin
     * @name Detail3
     * @summary 관리자용 후원 상세 조회
     * @request GET:/api/admin/pledges/{pledgeId}
     * @secure
     */
    detail3: (pledgeId: number, params: RequestParams = {}) =>
      this.request<ApiResultAdminPledgeDetailResponse, any>({
        path: `/api/admin/pledges/${pledgeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 09. Payment
     * @name Refund
     * @summary 결제 환불
     * @request DELETE:/api/payments/{paymentId}
     * @secure
     */
    refund: (paymentId: number, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/api/payments/${paymentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags 04. Category - Admin
     * @name Delete5
     * @summary 카테고리 삭제
     * @request DELETE:/api/admin/categories/{categoryId}
     * @secure
     */
    delete5: (categoryId: number, params: RequestParams = {}) =>
      this.request<ApiResultUserFetchCategoryResponse, any>({
        path: `/api/admin/categories/${categoryId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
