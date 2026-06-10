export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  HOME: "/",
  MY_PAGE: "/my-page",
  MY_PAGE_ADDRESS: "/my-page/address",
  MY_PAGE_PLEDGES: "/my-page/pledges",
  MY_PAGE_PLEDGE_DETAIL: (id: number) => `/my-page/pledges/${id}`,
  ADMIN: {
    CATEGORY: "/admin/category",
    PLEDGES: "/admin/pledges",
    PLEDGE_DETAIL: (id: number) => `/admin/pledges/${id}`,
  },
  PROJECT: {
    LIST: "/project",
    DETAIL: (id: number) => `/project/${id}`,
    PLEDGE: (id: number) => `/project/${id}/pledge`,
  },
  CREATOR: {
    MY_PROJECTS: "/creator/projects",
    CREATE_PROJECT: "/creator/projects/create",
    EDIT_PROJECT: (id: number) => `/creator/projects/${id}/edit`,
    REWARDS: (id: number) => `/creator/projects/${id}/rewards`,
  },
} as const;
