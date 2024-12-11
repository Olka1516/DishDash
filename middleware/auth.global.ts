import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());

  const token = useCookie("token");
  if (token.value) {
    authenticated.value = true;
  }

  if (!token.value && (to?.name === "admin" || to?.name === "add-receipt")) {
    return navigateTo("/sign-in");
  }
});
