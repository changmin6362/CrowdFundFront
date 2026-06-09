export const PAYMENT_ENDPOINTS = {
  CREATE: '/api/payments',
  HISTORY: (paymentId: number) => `/api/payments/${paymentId}/history`,
  DETAIL_BY_PLEDGE: (pledgeId: number) => `/api/payments/pledge/${pledgeId}`,
  REFUND: (paymentId: number) => `/api/payments/${paymentId}`,
} as const;
