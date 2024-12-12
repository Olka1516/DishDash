import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
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
      const data = await getDocs(collection($db, collectionName));
      return data.docs.map((doc) => doc.data());
    },

    async getReceipts(collectionName: string) {
      const data = await this.getData(collectionName);

      const formattedData: IReceipt[] = data.map((item) => ({
        title: item.title || "",
        description: item.description || "",
        id: item.id || "",
        image: item.image || "",
        page: item.page || "",
        ingredients: item.ingredients || [],
      }));

      if (collectionName === "receipts") {
        this.receipts = formattedData;
      } else {
        this.requests = formattedData;
      }
    },

    async getReceiptById(collectionName: string, id: string) {
      const { $db } = useNuxtApp();
      const docSnap = await getDoc(doc($db, collectionName, id));
      return docSnap.data();
    },

    async getReceiptsByFilters(dataSearch: string, dataFilter: string[]) {
      if (!dataFilter.length && !dataSearch) return this.receipts;

      let filteredReceipts = this.receipts;
      if (dataFilter.length) {
        filteredReceipts = this.receipts.filter((receipt) =>
          receipt.ingredients.some((ingredient) =>
            dataFilter.includes(ingredient.name)
          )
        );
      }

      if (dataSearch) {
        const titleLower = dataSearch.toLowerCase();
        filteredReceipts = filteredReceipts.filter((receipt) =>
          receipt.title.toLowerCase().includes(titleLower)
        );
      }

      return filteredReceipts;
    },

    parseHtmlData(htmlData: string) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlData, "text/html");

      const findTextInParagraph = (label: string) => {
        const paragraph = Array.from(doc.querySelectorAll("p")).find((p) =>
          p.textContent?.startsWith(label)
        );
        return paragraph?.textContent?.replace(label, "").trim() || null;
      };

      const ingredients = Array.from(doc.querySelectorAll("ol li")).map(
        (li) => {
          const text = li.textContent?.trim();
          if (!text) return;
          const [name, count] = text.split(" - ").map((part) => part.trim());
          return { name, count };
        }
      );

      return {
        title: findTextInParagraph("Title:"),
        description: findTextInParagraph("Details:"),
        image: doc.querySelector("img")?.getAttribute("src"),
        ingredients,
        page: htmlData,
      };
    },

    async addOrUpdateReceipts(htmlData: string, query: string, id?: string) {
      const { $receiptsRef, $requestsRef, $db } = useNuxtApp();
      const data = this.parseHtmlData(htmlData);
      const dataRef = query === "receipts" ? $receiptsRef : $requestsRef;

      if (id) {
        if (query === "receipts") {
          await updateDoc(doc($db, query, id), data);
        } else {
          const docRef = await addDoc($receiptsRef, data);
          await updateDoc(docRef, { id: docRef.id });
        }
      } else {
        const docRef = await addDoc(dataRef, data);
        await updateDoc(docRef, { id: docRef.id });
      }
    },
  },
});
