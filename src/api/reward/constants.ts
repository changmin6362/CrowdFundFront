export const REWARD_ENDPOINTS = {
  USER: {
    FETCH: (projectId: number) => `/api/user/projects/${projectId}/rewards`,
  },
  CREATOR: {
    CREATE: (projectId: number) => `/api/creator/projects/${projectId}/rewards`,
    UPDATE: (rewardId: number) => `/api/creator/rewards/${rewardId}`,
    DELETE: (rewardId: number) => `/api/creator/rewards/${rewardId}`,
    UPDATE_STOCK: (rewardId: number) => `/api/creator/rewards/${rewardId}/stock`,
  },
} as const;
