import { PaymentDetail } from "@api/payment/types";

/** 결제 상세 조회 응답 */
export interface PaymentDetailResponse {
  /** 결제 상세 정보 */
  paymentDetail?: PaymentDetail;
}
