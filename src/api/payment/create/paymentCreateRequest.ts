import { PaymentMethod } from "@api/payment/types";

/** 결제 요청 */
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
  paymentMethod: PaymentMethod;
  /**
   * 결제 금액
   * @example 35000
   */
  amount: number;
}
