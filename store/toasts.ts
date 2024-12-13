import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";

export const useToastsStore = defineStore("toasts", {
  state: () => ({
    toast: useToast(),
  }),

  actions: {
    showSuccess(message: string) {
      this.toast.add({
        severity: "success",
        summary: "Success Message",
        detail: message,
        life: 3000,
      });
    },
    showError(error: string) {
      this.toast.add({
        severity: "error",
        summary: "Error Message",
        detail: error,
        life: 3000,
      });
    },
  },
});
