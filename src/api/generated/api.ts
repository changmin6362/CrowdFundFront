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
