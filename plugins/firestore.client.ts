import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const db = getFirestore(nuxtApp.$firebaseApp);
  const auth = getAuth();
  const receiptsRef = collection(db, "receipts");

  return {
    provide: {
      db,
      receiptsRef,
      auth,
    },
  };
});
