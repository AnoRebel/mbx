<script>
import { onMounted } from "vue";

export const path = "/api";
export default {
  name: "Index",
  async setup() {
    onMounted(() => {
      console.log("data");
    });
    return {};
  },
};
</script>

<template>
  <h1>Hello World {{ $global }}</h1>
</template>
