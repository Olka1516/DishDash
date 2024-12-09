<template>
  <div class="container">
    <Editor v-model="value" editorStyle="height: 460px" />
    <button @click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { addDoc, updateDoc } from "firebase/firestore";

/* 
TODO: 
*/
const value = ref(
  '<p>Title:</p><p>Details:</p><p>Ingredients:</p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><br></li></ol>'
);
const { $receiptsRef, $requestsRef } = useNuxtApp();
const query = useRoute().query;

const submit = async () => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value.value, "text/html");

    const findTextInParagraph = (label: string) => {
      const paragraphs = doc.querySelectorAll("p");
      for (const p of paragraphs) {
        if (p.textContent && p.textContent.startsWith(label)) {
          return p.textContent.replace(label, "").trim();
        }
      }
      return null;
    };

    const title = findTextInParagraph("Title:");
    const description = findTextInParagraph("Details:");
    const ingredientElements = doc.querySelectorAll("ol li");
    const ingredients = Array.from(ingredientElements).map((li) =>
      li.textContent?.trim()
    );

    const image = doc.querySelector("img")?.getAttribute("src");
    const dataRef = query.data === "receipts" ? $receiptsRef : $requestsRef;
    const docRef = await addDoc(dataRef, {
      title,
      description,
      image,
      ingredients,
      page: value.value,
    });
    await updateDoc(docRef, {
      id: docRef.id,
    });
    console.log("Документ додано з ID:", docRef.id);
  } catch (error) {
    console.error("Помилка додавання документа:", error);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.add-receipt;
</style>
