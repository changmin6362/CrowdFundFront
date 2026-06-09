export const PLEDGE_ENDPOINTS = {
  MY: {
    FETCH: '/api/pledges/me',
    CREATE: '/api/pledges/me',
    DETAIL: (pledgeId: number) => `/api/pledges/me/${pledgeId}`,
    CANCEL: (pledgeId: number) => `/api/pledges/me/${pledgeId}`,
  },
  CREATOR: {
    FULFILL: (pledgeId: number) => `/api/creator/pledges/${pledgeId}/fulfill`,
  },
  ADMIN: {
    FETCH: '/api/admin/pledges',
    DETAIL: (pledgeId: number) => `/api/admin/pledges/${pledgeId}`,
  },
} as const;
