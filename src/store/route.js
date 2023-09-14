import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRouteStore = defineStore('route', () => {
  const previousRoute = ref('');

  const setPreviousRoute = (value) => {
    previousRoute.value = value;
  };

  return { previousRoute, setPreviousRoute };
});
