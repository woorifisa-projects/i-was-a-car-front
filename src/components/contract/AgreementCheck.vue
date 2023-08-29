<template>
  <v-virtual-scroll :height="300" :items="contract">
    <template v-slot:default="{ item }">
      <v-card-title class="text-h5">
        {{ item.title }}
      </v-card-title>
      <v-card-text>{{ item.contentText }} </v-card-text>
    </template>
  </v-virtual-scroll>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['contract']);
const contract = ref(props.contract);
</script>

<style lang="scss" scoped></style>
