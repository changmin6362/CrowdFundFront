import { PaymentHistoryInfo } from "@api/payment/types";

/** 결제 이력 조회 응답 */
export interface PaymentHistoryResponse {
  /** 결제 이력 목록 */
  paymentHistories?: PaymentHistoryInfo[];
}
