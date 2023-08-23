<template>
  <v-footer class="bg-black">
    <v-container class="text-center d-flex flex-column">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :prepend-icon="icon.icon"
          stacked
          rounded="xl"
          variant="text"
          :to="icon.to"
          >{{ icon.name }}</v-btn
        >
      </div>
      <div class="pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
      </div>

      <v-divider></v-divider>

      <div>
        <strong>{{ new Date().getFullYear() }} — I was a car</strong>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';

const icons = ref([
  {
    icon: 'mdi-github',
    to: 'https://github.com/woorifisa-projects/i-was-a-car-front',
    name: 'FE',
  },
  {
    icon: 'mdi-github',
    to: 'https://github.com/woorifisa-projects/i-was-a-car-back',
    name: 'BE',
  },
]);
</script>

<style scoped></style>
