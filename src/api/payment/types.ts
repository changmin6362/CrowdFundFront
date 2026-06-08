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
  paymentId: number;
  pledgeId: number;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  /** 결제 일시 (ISO String) */
  paidAt: string | null;
  /** 생성 일시 (ISO String) */
  createdAt: string;
}

/**
 * 결제 이력 정보
 */
export interface PaymentHistoryInfo {
  historyId: number;
  status: PaymentStatus;
  /** 상태 변경 시각 (ISO String) */
  changedAt: string;
  /** 상태 변경 사유 */
  reason: string;
  /** PG 트랜잭션 ID */
  pgTransactionId: string | null;
}

/**
 * 결제 요청 (POST /api/payments)
 */
export interface PaymentCreateRequest {
  pledgeId: number;
  paymentMethod: PaymentMethod;
  amount: number;
}

/**
 * 결제 요청 응답
 */
export interface PaymentCreateResponse {
  paymentId: number;
}

/**
 * 결제 상세 조회 응답 (GET /api/payments/pledge/{pledgeId})
 */
export interface PaymentDetailResponse {
  paymentDetail: PaymentDetail;
}

/**
 * 결제 이력 조회 응답 (GET /api/payments/{paymentId}/history)
 */
export interface PaymentHistoryResponse {
  paymentHistories: PaymentHistoryInfo[];
}