export const PROJECT_ENDPOINTS = {
  USER: {
    FETCH: '/api/projects',
    DETAIL: (projectId: number) => `/api/projects/${projectId}`,
  },
  CREATOR: {
    CREATE: '/api/creator/projects',
    UPDATE: (projectId: number) => `/api/creator/projects/${projectId}`,
    DELETE: (projectId: number) => `/api/creator/projects/${projectId}`,
    CANCEL: (projectId: number) => `/api/creator/projects/${projectId}/cancel`,
    FETCH_ME: '/api/creator/projects/me',
    SHIPPING_INFOS: (projectId: number) => `/api/creator/projects/${projectId}/shipping-infos`,
  },
} as const;
