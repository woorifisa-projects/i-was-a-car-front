import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRouteStore = defineStore('route', () => {
  const previousRoute = ref(localStorage.getItem('previousRoute') || null);

  const setPreviousRoute = (value) => {
    previousRoute.value = value;
    localStorage.setItem('previousRoute', value);
  };

  return { previousRoute, setPreviousRoute };
});
