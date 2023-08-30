import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRetrieveCarStore = defineStore('retrieveCar', () => {
  const name = ref('');
  const carNumber = ref('');
  const setName = (name) => (name.value = name);
  const setCarNumber = (carNumber) => (carNumber.value = carNumber);

  return { name, carNumber, setName, setCarNumber };
});
