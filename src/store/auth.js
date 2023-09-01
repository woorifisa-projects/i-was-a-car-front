// Utilities
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authInfo: {},
    isLogin: JSON.parse(localStorage.getItem('isLogin')) === true || false,
    email: '',
    // signupForm: {
    //   email: '',
    //   password: '',
    //   name: '',
    //   birth: '', // 1997-09-03
    //   tel: '010-3598-1748',
    //   gender: '남자',
    //   hasLicense: true,
    // },
  }),

  getters: {},

  actions: {
    setAuthInfo(value) {
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

    // checkIsLogin(){}

    setEmail(value) {
      this.email = value;
    },
  },
});
