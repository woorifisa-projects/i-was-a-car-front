<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { authAPI } from './apis/service/auth/authApi';
import { useAuthStore } from './store/auth';

const auth = useAuthStore();
const { verifiedAuth } = auth;

onBeforeMount(async () => {
  try {
    const { data } = await authAPI();

    if (data != null) {
      verifiedAuth(data);
    }
  } catch (e) {
    console.error('authHandler: ', e);
  }
});
</script>
