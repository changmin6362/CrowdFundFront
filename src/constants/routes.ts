export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  HOME: "/",
  MY_PAGE: "/my-page",
  MY_PAGE_ADDRESS: "/my-page/address",
  ADMIN: {
    CATEGORY: "/category",
  },
  PROJECT: {
    LIST: "/project",
    DETAIL: (id: number) => `/project/${id}`,
  },
  CREATOR: {
    MY_PROJECTS: "/creator/projects",
    CREATE_PROJECT: "/creator/projects/create",
    EDIT_PROJECT: (id: number) => `/creator/projects/${id}/edit`,
    REWARDS: (id: number) => `/creator/projects/${id}/rewards`,
  },
} as const;
