<script>
import { onMounted, ref } from "vue";
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
    onMounted(() => {
      for (let i = 0; i < caret.length; i++) {
        caret[i].addEventListener("click", () => {
          this.parentElement.querySelector(".nested").classList.toggle("active");
          this.classList.toggle("caret-down");
        });
      }
    });
    const isOpen = ref(false);
    const data = usePayload({ getPayload });
    return { controllers: JSON.parse(data), isOpen };
  },
};
</script>

<template>
  <h1>Hello World</h1>
  <ul class="p-0 m-0 list-none">
    <li v-for="(controller, index) in controllers" :key="index">
      <span class="caret" @click="isOpen = !isOpen">{{ controller.name }}</span>
      <ul class="p-0 m-0 list-none nested">
        <li v-for="(module, idx) in controller.modules" :key="idx">{{ module }}</li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
}
.caret {
  cursor: pointer;
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  -ms-transform: rotate(90deg); /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari */
  transform: rotate(90deg);
}

.nested {
  display: none;
}

.active {
  display: block;
}
</style>
