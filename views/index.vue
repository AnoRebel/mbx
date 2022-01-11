<script>
import { useRoute, usePayload, fetchPayload } from "fastify-vite-vue/app";

export const path = "/api";

export function getPayload({ fastify }) {
  return JSON.stringify(fastify.controllers);
}

export default {
  name: "Index",
  setup() {
    if (import.meta.hot) {
      const route = useRoute();
      import.meta.hot.on("store-update", async () => {
        console.log(await fetchPayload(route));
      });
    }
    const data = usePayload({ getPayload });
    return { controllers: JSON.parse(data) };
  },
};
</script>

<template>
  <h1>Hello World</h1>
  <ul clas="list-disc">
    <li v-for="(controller, index) in controllers" :key="index">{{ controller }}</li>
  </ul>
</template>
