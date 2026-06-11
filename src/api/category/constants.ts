export const CATEGORY_ENDPOINTS = {
  USER: {
    FETCH: '/api/categories',
  },
  ADMIN: {
    CREATE: '/api/admin/categories',
    RENAME: (id: number) => `/api/admin/categories/${id}/rename`,
    MOVE: (id: number) => `/api/admin/categories/${id}/parent`,
    REORDER: '/api/admin/categories/sort-order',
    ACTIVE: (id: number) => `/api/admin/categories/${id}/toggle`,
    DELETE: (id: number) => `/api/admin/categories/${id}`,
  }
} as const;
