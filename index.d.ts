declare module "#app" {
  interface NuxtApp {
    $receiptsRef: CollectionReference<DocumentData, DocumentData>;
    $firebaseApp: any;
    $db: any;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $receiptsRef: CollectionReference<DocumentData, DocumentData>;
    $firebaseApp: any;
    $db: any;
  }
}

export {};
