<template>
  <v-container class="mt-10">
    <div class="d-flex flex-column flex-sm-row">
      <v-autocomplete
        :class="xs ? 'w-100' : 'cw-10'"
        label="선택"
        :items="category"
        item-title="title"
        item-value="id"
        color="black"
        theme="light"
        variant="outlined"
        single-line
        v-model="selectedCategory"
        :density="xs ? 'compact' : 'comfortable'"
      ></v-autocomplete>

      <v-text-field
        :class="xs ? 'w-100' : 'cw-70'"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        color="black"
        theme="light"
        variant="outlined"
        label="원하는 차종 또는 제조사를 입력해주세요."
        clearable
        :density="xs ? 'compact' : 'comfortable'"
        single-line
        @click:append-inner="onClick"
        @keydown.enter.prevent="onClick"
        v-model="keyword"
      ></v-text-field>
    </div>
  </v-container>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { category } from '@/components/data/searchCategory.js';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

const emit = defineEmits(['search']);

const loading = ref(false);
const selectedCategory = ref();
const keyword = ref();

const onClick = () => {
  loading.value = true;
  emit('search', { category: selectedCategory.value, keyword: keyword.value });

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped>
.cw-10 {
  width: 10%;
  margin-right: 10px;
}

.cw-70 {
  width: 70%;
}
</style>
