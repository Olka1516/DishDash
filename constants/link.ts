export const LINK_TEMPLATES = {
  HOME: "/",
  CATEGORY: "/category",
  SIGN_IN: "/sign-in",
  ADMIN: "/admin",
  ADD_RECEIPT: "/add-receipt",
  EDIT: (id: string) => `/edit/${id}`,
  DETAILED: (id: string, query: string) => `/detailed/${id}?data=${query}`,
};
