import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const db = getFirestore();
  const auth = getAuth();
  const receiptsRef = collection(db, "receipts");
  const requestsRef = collection(db, "requests");

  return {
    provide: {
      db,
      receiptsRef,
      requestsRef,
      auth,
    },
  };
});
