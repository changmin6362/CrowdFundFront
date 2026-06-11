export const COMMENT_ENDPOINTS = {
  PROJECT: {
    FETCH: (projectId: number) => `/api/projects/${projectId}/comments`,
    CREATE: (projectId: number) => `/api/projects/${projectId}/comments`,
  },
  MY: {
    FETCH: '/api/users/me/comments',
    UPDATE: (commentId: number) => `/api/users/me/comments/${commentId}`,
    DELETE: (commentId: number) => `/api/users/me/comments/${commentId}`,
  },
} as const;
