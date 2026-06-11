export const PLEDGE_ADDRESS_ENDPOINTS = {
  REPLACE: (pledgeId: number) => `/api/pledges/${pledgeId}/address`,
} as const;
