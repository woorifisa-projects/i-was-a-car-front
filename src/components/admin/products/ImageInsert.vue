<template>
  <v-file-input
    label="File input"
    v-model="file"
    :prepend-icon="null"
    placeholder="Select an image file"
    accept="image/*"
  >
    <template v-slot:selection="{ text }">
      <v-chip small>{{ text }}</v-chip>
      <v-btn icon size="small" @click.stop.prevent="clearFile">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-file-input>
</template>

<script setup>
import { ref, watch } from 'vue';

const file = ref(null);
const imageUrl = ref(null);

watch(file, (newFile) => {
  if (newFile) {
    imageUrl.value = URL.createObjectURL(newFile);
  } else {
    imageUrl.value = null;
    URL.revokeObjectURL(imageUrl.value);
  }
});

const clearFile = () => {
  file.value = null;
};
</script>

<style scoped></style>
