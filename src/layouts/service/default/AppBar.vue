<template>
  <v-app-bar flat density="comfortable" elevation="1">
    <v-app-bar-nav-icon
      class="d-sm-none"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>

    <v-container class="d-flex justify-space-between align-center">
      <v-app-bar-title> I was a car </v-app-bar-title>

      <template v-if="isLogin">
        <div class="d-none d-sm-block">
          <RouterLink class="nav-item" to="/email">마이페이지</RouterLink>
          <span class="logout-btn" @click="logout">로그아웃</span>
        </div>
      </template>

      <template v-else>
        <div class="d-none d-sm-block">
          <RouterLink class="nav-item" to="/email">가입하기</RouterLink>
          <RouterLink class="nav-item" to="/login">로그인하기</RouterLink>
        </div>
      </template>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="top" temporary>
    <v-list nav>
      <v-list-item v-for="item in navItems" key="item.value" :to="item.to">{{
        item.title
      }}</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { ref } from 'vue';

const auth = useAuthStore();
const { isLogin } = storeToRefs(auth);
const { logout } = auth;

const drawer = ref(false);
const toggleDrawer = () => (drawer.value = !drawer.value);

const navItems = computed(() => {
  return isLogin ? loginNavItems.value : notLoginNavItems.value;
});

const notLoginNavItems = ref([
  {
    title: '가입하기',
    value: 'signup',
    to: '/signup',
  },
  {
    title: '로그인하기',
    value: 'login',
    to: '/login',
  },
]);

const loginNavItems = ref([
  {
    title: '마이페이지',
    value: 'mypage',
    to: '/mypage',
  },
  {
    title: '로그아웃',
    value: 'login',
    to: '/login',
  },
]);
</script>

<style scoped>
.nav-item {
  color: black;
  text-decoration: none;
  margin-right: 15px;
}

.logout-btn {
  margin-right: 15px;
  cursor: pointer;
}
</style>
