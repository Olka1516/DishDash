export const LINK_TEMPLATES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  ADD_RECEIPT: "/add-receipt",
  CATEGORY: "/category",
  EDIT: (id: string) => `/edit/${id}`,
  PROFILE: (id: string) => `/profile/${id}`,
  DETAILED: (id: string) => `/detailed/${id}`,
};
