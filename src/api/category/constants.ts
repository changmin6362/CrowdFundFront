export const CATEGORY_ENDPOINTS = {
  USER: {
    FETCH: '/api/category',
  },
  ADMIN: {
    CREATE: '/api/category/admin',
    RENAME: (id: number) => `/api/category/admin/${id}/name`,
    MOVE: (id: number) => `/api/category/admin/${id}/parent`,
    REORDER: '/api/category/admin/reorder',
    ACTIVE: (id: number) => `/api/category/admin/${id}/active`,
    DELETE: (id: number) => `/api/category/admin/${id}`,
  }
} as const;
