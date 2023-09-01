<template>
  <v-card-actions
    class="d-flex justify-space-around"
    style="
      position: absolute;
      bottom: 3em;
      left: 50%;
      transform: translate(-50%);
      width: 350px;
    "
  >
    <v-btn class="text-none ma-0" :elevation="2" width="120" height="40">
      이전</v-btn
    >
    <v-btn
      class="text-none bg-black ma-0"
      :elevation="2"
      width="120"
      height="40"
      >{{ next }}</v-btn
    >
  </v-card-actions>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['next']);
const next = ref(props.next);
</script>

<style lang="scss" scoped></style>
