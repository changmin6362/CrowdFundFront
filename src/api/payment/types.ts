/** 결제 수단 */
export type PaymentMethod = 'CARD' | 'TRANSFER' | 'KAKAOPAY' | 'UNKNOWN';

/** 결제 상태 */
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED' | 'REFUNDED';

/** 결제 상세 정보 */
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
   * 결제 수단
   * @example "CARD"
   */
  paymentMethod?: PaymentMethod;
  /**
   * 결제 금액
   * @example 35000
   */
  amount?: number;
  /** 결제 상태 */
  status?: PaymentStatus;
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

/** 결제 이력 정보 */
export interface PaymentHistoryInfo {
  /**
   * 결제 이력 ID
   * @format int64
   * @example 1
   */
  historyId?: number;
  /** 변경된 결제 상태 */
  status?: PaymentStatus;
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
