export const USER_ADDRESS_ENDPOINTS = {
  LIST: '/api/users/me/addresses',
  CREATE: '/api/users/me/address',
  UPDATE: (id: number) => `/api/users/me/address/${id}`,
  DELETE: (id: number) => `/api/users/me/address/${id}`,
  SET_DEFAULT: (id: number) => `/api/users/me/address/${id}/default`,
} as const;
