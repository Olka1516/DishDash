import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
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
      const { $receiptsRef } = useNuxtApp();
      const typeQuery = dataFilter.length
        ? query($receiptsRef, where("type", "array-contains-any", dataFilter))
        : $receiptsRef;

      const typeDocs = await getDocs(typeQuery);
      let receipts = typeDocs.docs.map((doc) => doc.data() as IReceipt);

      if (dataSearch) {
        const titleLower = dataSearch.toLowerCase();
        receipts = receipts.filter((receipt) =>
          receipt.title.toLowerCase().includes(titleLower)
        );
      }

      return receipts;
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
        await updateDoc(doc($db, query, id), data);
      } else {
        const docRef = await addDoc(dataRef, data);
        await updateDoc(docRef, { id: docRef.id });
      }
    },
  },
});
