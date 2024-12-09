import { collection, getDocs, type DocumentData } from "firebase/firestore";
import { defineStore } from "pinia";
import type { IReceipt } from "~/types";

export const useReceiptsStore = defineStore("receipt", {
  state: () => ({
    receipts: [] as IReceipt[],
    requests: [] as IReceipt[],
  }),

  actions: {
    async getData(collectionName: string) {
      const { $db } = useNuxtApp();
      const receiptsData = await getDocs(collection($db, collectionName));
      const data: any[] = [];
      receiptsData.forEach((receipt: DocumentData) => {
        data.push(receipt.data());
      });
      return data;
    },
    async getReceipts(collectionName: string) {
      if (collectionName === "receipts") {
        this.receipts = await this.getData(collectionName);
      } else {
        this.requests = await this.getData(collectionName);
      }
    },
  },
});
