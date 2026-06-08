/**
 * 결제 수단
 */
export type PaymentMethod = 'CARD' | 'TRANSFER' | 'KAKAOPAY' | 'UNKNOWN';

/**
 * 결제 상태
 */
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED' | 'REFUNDED';

/**
 * 결제 상세 정보
 */
export interface PaymentDetail {
  /** 결제 ID */
  paymentId: number;
  /** 후원 ID */
  pledgeId: number;
  /** 결제 방법 */
  paymentMethod: PaymentMethod;
  /** 결제 금액 */
  amount: number;
  /** 결제 상태 */
  status: PaymentStatus;
  /** 결제 일시 (ISO String) */
  paidAt: string | null;
  /** 생성 일시 (ISO String) */
  createdAt: string;
}

/**
 * 결제 요청 (POST /api/payments)
 */
export interface PaymentCreateRequest {
  /** 후원 ID */
  pledgeId: number;
  /** 결제 수단 */
  paymentMethod: PaymentMethod;
  /** 결제 금액 */
  amount: number;
}

/**
 * 결제 요청 응답
 */
export interface PaymentCreateResponse {
  /** 결제 ID */
  paymentId: number;
}

/**
 * 결제 상세 조회 응답 (GET /api/payments/pledge/{pledgeId})
 */
export interface PaymentDetailResponse {
  paymentDetail: PaymentDetail;
}

/**
 * 결제 이력 조회 응답
 */
export interface PaymentHistoryResponse {
  /** 결제 이력 목록 */
  paymentHistories: PaymentHistoryInfo[];
}

/**
 * 결제 이력 정보
 */
export interface PaymentHistoryInfo {
  /** 결제 이력 ID */
  historyId: number;
  /** 변경된 결제 상태 */
  status: PaymentStatus;
  /** 상태 변경 시각 (ISO String) */
  changedAt: string;
  /** 상태 변경 사유 */
  reason: string;
  /** PG 트랜잭션 ID */
  pgTransactionId: string | null;
}
