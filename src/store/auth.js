// Utilities
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authInfo: {},
    isLogin: JSON.parse(localStorage.getItem('isLogin')) === true || false,
  }),

  getters: {
    isAdmin: ({ authInfo }) => authInfo.roles.includes('ADMIN'),
  },

  actions: {
    setAuthInfo(value) {
      console.log('setAuthInfo: ', { ...value });
      this.authInfo = { ...value };
    },

    login() {
      this.isLogin = true;
      localStorage.setItem('isLogin', true);
    },

    logout() {
      this.isLogin = false;
      localStorage.removeItem('isLogin');
    },
  },
});
