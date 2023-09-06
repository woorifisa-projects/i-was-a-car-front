import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authInfo = ref({});

  const emailAuthInfo = ref({
    code: '',
    email: '',
  });

  const isLogin = ref('default');

  const initAuthInfo = () => {
    authInfo.value = {};

    isLogin.value = 'NO';
  };

  const verifiedAuth = (value) => {
    authInfo.value = { ...value };

    isLogin.value = 'YES';
  };

  const setEmailAuthInfo = (code, email) => {
    emailAuthInfo.value.code = code;
    emailAuthInfo.value.email = email;
  };

  const setLogout = () => {
    isLogin.value = 'NO';
  };

  return {
    authInfo,
    emailAuthInfo,
    isLogin,
    setLogout,
    verifiedAuth,
    initAuthInfo,
    setEmailAuthInfo,
  };
});
