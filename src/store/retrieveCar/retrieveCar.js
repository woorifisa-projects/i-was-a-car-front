import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRetrieveCarStore = defineStore('retrieveCar', () => {
  const name = ref('');
  const carNumber = ref('');
  const setNameAndCarNumber = (n, c) => {
    name.value = n;
    carNumber.value = c;
  };

  const getCarInfo = () => {
    return { name, carNumber };
  };

  return { name, carNumber, setNameAndCarNumber, getCarInfo };
});
