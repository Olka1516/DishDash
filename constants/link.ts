export const LINK_TEMPLATES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  ADMIN: "/admin",
  CATEGORY: (query?: string) => `/category?data=${query}`,
  ADD_RECEIPT: (query: string) => `/add-receipt?data=${query}`,
  DETAILED: (id: string, query: string) => `/detailed/${id}?data=${query}`,
  EDIT: (id: string) => `/edit/${id}`,
};
