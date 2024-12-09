import {
  collection,
  getDocs,
  Query,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
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

    async getReceiptsByFilters(dataSearch: string, dataFilter: string[]) {
      const { $receiptsRef } = useNuxtApp();
      let typeQuery: Query<DocumentData> = $receiptsRef;
      if (dataFilter.length) {
        typeQuery = query(
          $receiptsRef,
          where("type", "array-contains-any", dataFilter)
        );
      }

      const typeDocs = await getDocs(typeQuery);

      let receipts: IReceipt[] = [];
      typeDocs.forEach((data) => {
        receipts.push(data.data() as IReceipt);
      });

      if (dataSearch) {
        const titleLower = dataSearch.toLowerCase();
        receipts = receipts.filter((receipt: IReceipt) =>
          receipt.title.toLowerCase().includes(titleLower)
        );
      }

      return receipts;
    },
  },
});
