import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false);

  const setLoading = (value) => {
    isLoading.value = value;
  };

  return { isLoading, setLoading };
});
