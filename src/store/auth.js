import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authInfo = ref({});

  const emailAuthInfo = ref({
    code: '',
    email: '',
  });

  const isLogin = ref(false);

  const isAdmin = ref(false);

  const initAuthInfo = () => {
    authInfo.value = {};

    isLogin.value = false;
  };

  const verifiedAuth = (value) => {
    authInfo.value = { ...value };

    isLogin.value = true;

    authInfo.value.roles.forEach((r) => {
      if (r === 'ADMIN') {
        isAdmin.value = true;
      }
    });
  };

  const setEmailAuthInfo = (code, email) => {
    emailAuthInfo.value.code = code;
    emailAuthInfo.value.email = email;
  };

  const setLogout = () => {
    isLogin.value = false;
  };

  const setRrnb = (value) => {
    authInfo.value.rrnb = value;
  };

  return {
    authInfo,
    emailAuthInfo,
    isLogin,
    isAdmin,
    setLogout,
    verifiedAuth,
    initAuthInfo,
    setEmailAuthInfo,
    setRrnb,
  };
});
