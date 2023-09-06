import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authInfo = ref({});

  const emailAuthInfo = ref({
    code: '',
    email: '',
  });

  const isLogin = ref(false);

  const verifiedAuth = (value) => {
    authInfo.value = { ...value };

    isLogin.value = true;
  };

  const setEmailAuthInfo = (code, email) => {
    emailAuthInfo.value.code = code;
    emailAuthInfo.value.email = email;
  };

  const setLogout = () => {
    isLogin.value = false;
  };

  return {
    authInfo,
    emailAuthInfo,
    isLogin,
    setLogout,
    verifiedAuth,
    setEmailAuthInfo,
  };
});
