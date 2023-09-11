<template>
  <v-card-title
    class="text-center text-h5 font-weight-black mb-15"
    style="
      position: absolute;
      top: 1.5em;
      left: 50%;
      transform: translate(-50%);
    "
  >
    {{ cardTitle }}
  </v-card-title>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['cardTitle']);
const cardTitle = ref(props.cardTitle);
</script>

<style lang="scss" scoped></style>
