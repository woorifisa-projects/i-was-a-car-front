import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useContractStore = defineStore('contractStore', () => {
  const isDisable = ref(true);

  const setIsDisable = (flag) => {
    isDisable.value = flag;

  };
  

  return {
    isDisable,
    setIsDisable
  };
});
