export const LINK_TEMPLATES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  ADMIN: "/admin",
  ADD_RECEIPT: `/add-receipt`,
  FORM: `/form`,
  EDIT: (id: string, query: string) => `/edit/${id}?data=${query}`,
  CATEGORY: (query?: string) => `/category?data=${query}`,
  DETAILED: (id: string, query: string) => `/detailed/${id}?data=${query}`,
};
